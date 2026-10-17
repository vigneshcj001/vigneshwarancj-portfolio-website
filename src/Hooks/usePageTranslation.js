import { useEffect } from "react";
import { useLocation } from "react-router";
import { useLanguage } from "../Contexts/LanguageContext";
import { translateCore } from "../i18n/messages";
import { portfolioApi } from "../services/portfolioApi";

const ATTRIBUTES = ["aria-label", "placeholder", "title"];
const originalText = new WeakMap();
const appliedText = new WeakMap();
const originalAttributes = new WeakMap();
const appliedAttributes = new WeakMap();
const translatedNodes = new Set();
const translatedElements = new Set();
const memoryCache = new Map();
const SKIP_SELECTOR = "script,style,code,pre,[data-no-translate],[contenteditable='true']";

function cacheKey(language, text) {
  return `${language}\u0000${text}`;
}

function readCache(language) {
  try {
    const saved = JSON.parse(localStorage.getItem(`portfolio-translations-v1-${language}`) || "{}");
    Object.entries(saved).forEach(([source, value]) => memoryCache.set(cacheKey(language, source), value));
  } catch {}
}

function saveCache(language, entries) {
  try {
    const key = `portfolio-translations-v1-${language}`;
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    entries.forEach(([source, value]) => { saved[source] = value; });
    const compact = Object.fromEntries(Object.entries(saved).slice(-800));
    localStorage.setItem(key, JSON.stringify(compact));
  } catch {}
}

function isTranslatable(text) {
  return text.length <= 1_000 && /\p{L}/u.test(text);
}

function getTextSource(node) {
  const current = node.nodeValue;
  if (!originalText.has(node) || (appliedText.has(node) && current !== appliedText.get(node))) {
    originalText.set(node, current);
  }
  return originalText.get(node).trim();
}

function getAttributeSource(element, attribute) {
  const current = element.getAttribute(attribute);
  if (current == null) return null;
  if (!originalAttributes.has(element)) originalAttributes.set(element, {});
  if (!appliedAttributes.has(element)) appliedAttributes.set(element, {});
  const originals = originalAttributes.get(element);
  const applied = appliedAttributes.get(element);
  if (!(attribute in originals) || (attribute in applied && current !== applied[attribute])) originals[attribute] = current;
  return originals[attribute];
}

function collect(root) {
  const items = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (!node.parentElement?.closest(SKIP_SELECTOR)) {
      const source = getTextSource(node);
      if (isTranslatable(source)) items.push({ type: "text", node, source });
    }
    node = walker.nextNode();
  }

  root.querySelectorAll(ATTRIBUTES.map((attribute) => `[${attribute}]`).join(",")).forEach((element) => {
    if (element.closest(SKIP_SELECTOR)) return;
    ATTRIBUTES.forEach((attribute) => {
      const source = getAttributeSource(element, attribute);
      if (source && isTranslatable(source)) items.push({ type: "attribute", element, attribute, source });
    });
  });
  return items;
}

function apply(item, value) {
  if (item.type === "text") {
    const original = originalText.get(item.node);
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    const next = `${leading}${value}${trailing}`;
    if (item.node.nodeValue !== next) item.node.nodeValue = next;
    appliedText.set(item.node, next);
    translatedNodes.add(item.node);
    return;
  }
  if (item.element.getAttribute(item.attribute) !== value) item.element.setAttribute(item.attribute, value);
  appliedAttributes.get(item.element)[item.attribute] = value;
  translatedElements.add(item.element);
}

function restoreEnglish() {
  translatedNodes.forEach((node) => {
    if (node.isConnected && originalText.has(node)) node.nodeValue = originalText.get(node);
    appliedText.delete(node);
  });
  translatedElements.forEach((element) => {
    if (!element.isConnected) return;
    const originals = originalAttributes.get(element) || {};
    Object.entries(originals).forEach(([attribute, value]) => element.setAttribute(attribute, value));
    appliedAttributes.delete(element);
  });
  translatedNodes.clear();
  translatedElements.clear();
}

function chunks(values) {
  const result = [];
  let chunk = [];
  let length = 0;
  values.forEach((value) => {
    if (chunk.length >= 70 || length + value.length > 12_000) {
      result.push(chunk);
      chunk = [];
      length = 0;
    }
    chunk.push(value);
    length += value.length;
  });
  if (chunk.length) result.push(chunk);
  return result;
}

async function translatePage(root, language, cancelled) {
  const items = collect(root);
  const bySource = new Map();
  items.forEach((item) => {
    if (!bySource.has(item.source)) bySource.set(item.source, []);
    bySource.get(item.source).push(item);
  });

  const missing = [];
  bySource.forEach((targets, source) => {
    const translated = translateCore(source, language) || memoryCache.get(cacheKey(language, source));
    if (translated) targets.forEach((item) => apply(item, translated));
    else missing.push(source);
  });

  for (const batch of chunks(missing)) {
    if (cancelled()) return;
    try {
      const response = await portfolioApi.translate(language, batch);
      const entries = batch.map((source, index) => [source, response.translations[index] || source]);
      entries.forEach(([source, value]) => memoryCache.set(cacheKey(language, source), value));
      saveCache(language, entries);
      if (cancelled()) return;
      entries.forEach(([source, value]) => bySource.get(source)?.forEach((item) => apply(item, value)));
    } catch {
      return;
    }
  }
}

export default function usePageTranslation() {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return undefined;
    let stopped = false;
    let timer;
    let translating = false;
    let rerun = false;

    const run = async () => {
      if (stopped || language === "en") return;
      if (translating) {
        rerun = true;
        return;
      }
      translating = true;
      await translatePage(root, language, () => stopped);
      translating = false;
      if (rerun && !stopped) {
        rerun = false;
        timer = setTimeout(run, 0);
      }
    };

    if (language === "en") restoreEnglish();
    else {
      readCache(language);
      run();
    }

    const observer = new MutationObserver(() => {
      if (language === "en") return;
      clearTimeout(timer);
      timer = setTimeout(run, 100);
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRIBUTES });

    return () => {
      stopped = true;
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [language, location.pathname]);
}
