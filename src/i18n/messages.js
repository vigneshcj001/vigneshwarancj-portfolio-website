export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr" },
  { code: "zh-CN", name: "Mandarin Chinese", nativeName: "中文", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
];

export const LANGUAGE_BY_CODE = Object.fromEntries(LANGUAGES.map((language) => [language.code, language]));

const CORE_MESSAGES = {
  ta: {
    Home: "முகப்பு", Projects: "திட்டங்கள்", Experience: "அனுபவம்", About: "என்னைப் பற்றி", Contact: "தொடர்பு", Résumé: "சுயவிவரம்",
    "Useful software.": "பயனுள்ள மென்பொருள்.", "Thoughtful AI.": "பொறுப்பான AI.", "Explore selected work": "தேர்ந்தெடுத்த பணிகளைப் பாருங்கள்", "View résumé": "சுயவிவரத்தைப் பாருங்கள்",
    "Selected work": "தேர்ந்தெடுத்த பணிகள்", "Three systems. Three different constraints.": "மூன்று அமைப்புகள். மூன்று வேறுபட்ட கட்டுப்பாடுகள்.", "Browse all projects ↗": "அனைத்து திட்டங்களையும் பாருங்கள் ↗",
    "Working now": "தற்போதைய பணி", "This portfolio’s AI": "இந்த போர்ட்ஃபோலியோவின் AI", "Recent path": "சமீபத்திய பயணம்", "Technical notes": "தொழில்நுட்ப குறிப்புகள்", "Start a conversation": "உரையாடலைத் தொடங்குங்கள்", "Ask CJ": "CJ-யிடம் கேளுங்கள்",
    Skills: "திறன்கள்", Publications: "வெளியீடுகள்", Writing: "எழுத்துகள்", Social: "சமூக வலைதளம்", Search: "தேடல்", Subscribe: "பதிவு செய்க",
  },
  fr: {
    Home: "Accueil", Projects: "Projets", Experience: "Expérience", About: "À propos", Contact: "Contact", Résumé: "CV",
    "Useful software.": "Des logiciels utiles.", "Thoughtful AI.": "Une IA réfléchie.", "Explore selected work": "Découvrir mes projets", "View résumé": "Voir le CV",
    "Selected work": "Projets sélectionnés", "Three systems. Three different constraints.": "Trois systèmes. Trois contraintes différentes.", "Browse all projects ↗": "Voir tous les projets ↗",
    "Working now": "Activité actuelle", "This portfolio’s AI": "L’IA de ce portfolio", "Recent path": "Parcours récent", "Technical notes": "Notes techniques", "Start a conversation": "Démarrer une conversation", "Ask CJ": "Demander à CJ",
    Skills: "Compétences", Publications: "Publications", Writing: "Articles", Social: "Réseaux", Search: "Rechercher", Subscribe: "S’abonner",
  },
  "zh-CN": {
    Home: "首页", Projects: "项目", Experience: "经历", About: "关于", Contact: "联系", Résumé: "简历",
    "Useful software.": "实用的软件。", "Thoughtful AI.": "深思熟虑的人工智能。", "Explore selected work": "查看精选作品", "View résumé": "查看简历",
    "Selected work": "精选作品", "Three systems. Three different constraints.": "三个系统，三种不同的约束。", "Browse all projects ↗": "浏览所有项目 ↗",
    "Working now": "当前工作", "This portfolio’s AI": "本作品集的 AI", "Recent path": "近期经历", "Technical notes": "技术笔记", "Start a conversation": "开始交流", "Ask CJ": "询问 CJ",
    Skills: "技能", Publications: "出版物", Writing: "文章", Social: "社交媒体", Search: "搜索", Subscribe: "订阅",
  },
  hi: {
    Home: "मुखपृष्ठ", Projects: "परियोजनाएँ", Experience: "अनुभव", About: "परिचय", Contact: "संपर्क", Résumé: "रिज़्यूमे",
    "Useful software.": "उपयोगी सॉफ़्टवेयर।", "Thoughtful AI.": "सोच-समझकर बनाई गई AI।", "Explore selected work": "चुने हुए काम देखें", "View résumé": "रिज़्यूमे देखें",
    "Selected work": "चुना हुआ काम", "Three systems. Three different constraints.": "तीन प्रणालियाँ। तीन अलग सीमाएँ।", "Browse all projects ↗": "सभी परियोजनाएँ देखें ↗",
    "Working now": "वर्तमान कार्य", "This portfolio’s AI": "इस पोर्टफोलियो की AI", "Recent path": "हाल की यात्रा", "Technical notes": "तकनीकी लेख", "Start a conversation": "बातचीत शुरू करें", "Ask CJ": "CJ से पूछें",
    Skills: "कौशल", Publications: "प्रकाशन", Writing: "लेख", Social: "सोशल", Search: "खोजें", Subscribe: "सदस्यता लें",
  },
  es: {
    Home: "Inicio", Projects: "Proyectos", Experience: "Experiencia", About: "Acerca de", Contact: "Contacto", Résumé: "Currículum",
    "Useful software.": "Software útil.", "Thoughtful AI.": "IA responsable.", "Explore selected work": "Ver trabajos destacados", "View résumé": "Ver currículum",
    "Selected work": "Trabajo destacado", "Three systems. Three different constraints.": "Tres sistemas. Tres restricciones diferentes.", "Browse all projects ↗": "Ver todos los proyectos ↗",
    "Working now": "Trabajo actual", "This portfolio’s AI": "La IA de este portafolio", "Recent path": "Trayectoria reciente", "Technical notes": "Notas técnicas", "Start a conversation": "Iniciar una conversación", "Ask CJ": "Preguntar a CJ",
    Skills: "Habilidades", Publications: "Publicaciones", Writing: "Artículos", Social: "Redes", Search: "Buscar", Subscribe: "Suscribirse",
  },
  ar: {
    Home: "الرئيسية", Projects: "المشاريع", Experience: "الخبرة", About: "نبذة عني", Contact: "تواصل", Résumé: "السيرة الذاتية",
    "Useful software.": "برمجيات مفيدة.", "Thoughtful AI.": "ذكاء اصطناعي مسؤول.", "Explore selected work": "استكشف أعمالاً مختارة", "View résumé": "عرض السيرة الذاتية",
    "Selected work": "أعمال مختارة", "Three systems. Three different constraints.": "ثلاثة أنظمة وثلاثة قيود مختلفة.", "Browse all projects ↗": "تصفح جميع المشاريع ↗",
    "Working now": "العمل الحالي", "This portfolio’s AI": "ذكاء هذا الموقع الاصطناعي", "Recent path": "المسار الأخير", "Technical notes": "ملاحظات تقنية", "Start a conversation": "ابدأ محادثة", "Ask CJ": "اسأل CJ",
    Skills: "المهارات", Publications: "المنشورات", Writing: "المقالات", Social: "التواصل الاجتماعي", Search: "بحث", Subscribe: "اشترك",
  },
};

export function translateCore(text, language) {
  return CORE_MESSAGES[language]?.[text];
}
