import { useState } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowRight, BookOpen, ShieldCheck, Database, Workflow } from "lucide-react";
import useMeta from "../Hooks/useMeta";
import { architectureMeta, architectureStages, architectureScenarios, architectureTools } from "../data/assistantArchitecture";

export default function AssistantArchitecture() {
  useMeta(architectureMeta.title, architectureMeta.description);
  const [scenarioId, setScenarioId] = useState("project");
  const [stageId, setStageId] = useState("request");
  const scenario = architectureScenarios.find((item) => item.id === scenarioId);
  const stages = scenario.steps.map((id) => ({ ...architectureStages.find((item) => item.id === id), ...scenario.overrides?.[id] }));
  const index = stages.findIndex((item) => item.id === stageId);
  const selected = stages[index];
  const chooseScenario = (id) => { setScenarioId(id); setStageId("request"); };
  const tryQuestion = () => window.dispatchEvent(new CustomEvent("portfolio-assistant:open", { detail: { question: scenario.question } }));

  return (
    <article className="portfolio-section ai-architecture-page">
      <header className="ai-architecture-hero">
        <Link className="text-link" to="/">← Portfolio</Link>
        <p className="eyebrow">Inside this portfolio's AI</p>
        <h1>A question. A traceable path.<br /><span>An answer you can inspect.</span></h1>
        <p className="lead">See where context comes from, how tools are chosen, and what happens before the assistant opens a page or prepares a draft.</p>
        <div className="ai-architecture-badges"><span><BookOpen size={15} /> Markdown evidence</span><span><Workflow size={15} /> Bounded tool plan</span><span><ShieldCheck size={15} /> Validated browser actions</span></div>
      </header>

      <section className="ai-flow-explorer" aria-labelledby="ai-flow-heading">
        <div className="section-heading"><div><p className="eyebrow">Explore the request flow</p><h2 id="ai-flow-heading">Follow a question through the system.</h2></div><span className="ai-example-label">Interactive explanation · no API calls</span></div>
        <div className="ai-scenario-picker" role="group" aria-label="Request scenario">{architectureScenarios.map((item) => <button key={item.id} type="button" aria-pressed={item.id === scenarioId} onClick={() => chooseScenario(item.id)}>{item.label}</button>)}</div>
        <div className="ai-example-question"><span>Example question</span><p>{scenario.question}</p></div>
        <p className="ai-scenario-detail">{scenario.detail}</p>

        <div className="ai-flow-layout">
          <ol className="ai-flow-stages" aria-label="Request flow stages">{stages.map((stage, position) => <li key={stage.id}>
            <button type="button" aria-current={stage.id === stageId ? "step" : undefined} aria-controls="ai-stage-detail" onClick={() => setStageId(stage.id)}><span className="ai-stage-number">{String(position + 1).padStart(2, "0")}</span><span><strong>{stage.name}</strong><small>{stage.system}</small></span><ArrowRight size={16} aria-hidden="true" /></button>
            {position < stages.length - 1 && <ArrowDown className="ai-stage-connector" size={15} aria-hidden="true" />}
          </li>)}</ol>
          <div id="ai-stage-detail" className="ai-stage-detail" aria-live="polite" aria-atomic="true">
            <p className="eyebrow">Step {index + 1} of {stages.length} · {selected.system}</p><h3>{selected.title}</h3><p>{selected.description}</p>
            <dl className="ai-stage-io"><div><dt>Receives</dt><dd>{selected.input}</dd></div><div><dt>Produces</dt><dd>{selected.output}</dd></div></dl>
            <div className="ai-stage-boundary"><ShieldCheck size={18} aria-hidden="true" /><p>{selected.boundary}</p></div>
            <details className="ai-source-reference"><summary>Implementation reference</summary><code>{selected.file}</code></details>
            <nav className="ai-stage-navigation" aria-label="Explore flow steps"><button className="secondary-action" type="button" disabled={index === 0} onClick={() => setStageId(stages[index - 1].id)}>Previous step</button><button className="primary-action" type="button" disabled={index === stages.length - 1} onClick={() => setStageId(stages[index + 1].id)}>Next step <ArrowRight size={15} /></button></nav>
          </div>
        </div>
        <div className="ai-scenario-result"><div><span>What the visitor gets</span><p>{scenario.result}</p></div><button type="button" className="secondary-action" onClick={tryQuestion}>Try this question <ArrowRight size={15} /></button></div>
        <p className="ai-flow-note">This diagram explains the implementation. It does not show live service health, hidden model reasoning, or a recorded execution. “Try this question” fills the chat composer; you choose when to send it.</p>
      </section>

      <section className="ai-system-boundaries" aria-labelledby="ai-system-heading">
        <div className="section-heading"><div><p className="eyebrow">Architecture boundaries</p><h2 id="ai-system-heading">Each layer has a specific job.</h2></div></div>
        <div className="ai-system-grid">
          <section><BookOpen size={22} /><h3>Knowledge is committed</h3><p>25 indexed Markdown documents supply profile, projects, skills, experience, education, and research. YAML frontmatter also builds the résumé data snapshot.</p><span>OKF · local token matching</span></section>
          <section><Workflow size={22} /><h3>Planning is bounded</h3><p>Laya selects scope and topic. LangGraph runs a fixed graph, and explicit rules choose tools. Groq generates the answer after those tools return evidence.</p><span>9 tools · maximum 4 calls</span></section>
          <section><Database size={22} /><h3>Memory has two homes</h3><p>The browser keeps saved conversations. The API stores completed exchanges in PostgreSQL when configured, with a bounded process-memory fallback.</p><span>Browser storage + server sessions</span></section>
          <section><ShieldCheck size={22} /><h3>Actions stay constrained</h3><p>Known targets permit navigation and highlights. Tours and contact drafts need visitor interaction. A contact draft never sends a message by itself.</p><span>No arbitrary browser execution</span></section>
        </div>
      </section>

      <section className="ai-tool-directory" aria-labelledby="ai-tools-heading"><p className="eyebrow">Approved capabilities</p><h2 id="ai-tools-heading">The complete tool surface.</h2><p>These tools read portfolio records or prepare known UI actions. They do not browse the web or operate employer systems.</p><dl>{architectureTools.map(([name, description]) => <div key={name}><dt><code>{name}</code></dt><dd>{description}</dd></div>)}</dl></section>
      <aside className="ai-architecture-caveat"><strong>Designed for transparency, with practical limits.</strong><p>Prompt guards, topic classification, lexical retrieval, and generation can make mistakes. Suggestions use curated templates. This assistant explains published work; its answers and simulations are not independent verification of project claims.</p></aside>
    </article>
  );
}
