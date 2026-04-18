const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const dialog = document.querySelector("[data-product-dialog]");
const dialogImage = document.querySelector("[data-dialog-image]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogDescription = document.querySelector("[data-dialog-description]");
const dialogClose = document.querySelector("[data-dialog-close]");
const dialogQuote = document.querySelector("[data-dialog-quote]");
const quoteForm = document.querySelector("[data-quote-form]");
const languageToggle = document.querySelector("[data-language-toggle]");
const languageLabel = document.querySelector("[data-language-label]");

const translations = {
  en: {
    metaTitle: "Win-Win Stone | OEM/ODM Natural Stone",
    metaDescription: "Factory-direct OEM and ODM natural stone sinks, vanities, bathtubs, tables, and custom architectural pieces from Yunfu, Guangdong, China.",
    switchLabel: "中文",
    switchAria: "Switch to Chinese",
    text: [
      [".skip-link", "Skip to content"],
      [".site-header .brand span", "Win-Win Stone"],
      [".site-footer .brand span", "Win-Win Stone"],
      [".nav-toggle .sr-only", "Open navigation"],
      [".nav-links a:nth-child(1)", "Products"],
      [".nav-links a:nth-child(2)", "OEM/ODM"],
      [".nav-links a:nth-child(3)", "Why Us"],
      [".nav-links a:nth-child(4)", "Contact"],
      [".hero .eyebrow", "Win-Win Stone"],
      ["#hero-title", "OEM/ODM natural stone, custom-made from factory to space."],
      [".hero-copy", "From Yunfu, Guangdong, the heart of the stone industry, we transform marble, travertine, quartzite, and onyx into functional works of art for homes, hospitality, and product lines."],
      [".hero-actions .primary", "Get a Free Quote"],
      [".hero-actions .ghost", "View Products"],
      [".hero-bottom span:nth-child(1)", "100% natural stone"],
      [".hero-bottom span:nth-child(2)", "Custom size and design"],
      [".hero-bottom span:nth-child(3)", "Global delivery"],
      [".intro .eyebrow", "Welcome"],
      ["#intro-title", "A bridge between raw natural material and functional art."],
      [".intro-grid > p", "Located in Yunfu, Guangdong, China, Win-Win Stone works from the source of the global stone industry. Clients can select from classic Calacatta, Carrara, quartzite, travertine, onyx, and other natural stones, then shape each piece around exact space, material, and production needs."],
      [".products .eyebrow", "Latest Products"],
      ["#products-title", "Custom stone pieces ready for OEM/ODM projects."],
      [".products .section-heading > p:last-child", "Explore sinks, vanities, bathtubs, and dining tables. Every product can be adapted by material, size, finish, edge detail, and packing requirement."],
      [".filter-button[data-filter='all']", "All"],
      [".filter-button[data-filter='sinks']", "Sinks"],
      [".filter-button[data-filter='tables']", "Tables"],
      [".filter-button[data-filter='bathroom']", "Bathroom"],
      [".video-band .eyebrow", "Factory Process"],
      ["#factory-title", "From idea to finished product."],
      [".video-grid p:last-child", "Whether you are renovating a dream bathroom or expanding a product line, Win-Win Stone handles material selection, drawing confirmation, production, inspection, safety packing, and door-to-door delivery with precision and care."],
      [".service .eyebrow", "OEM/ODM Service"],
      ["#service-title", "A clear production path for homeowners, designers, and businesses."],
      [".why .eyebrow", "One Stone. One Space. One Of A Kind."],
      ["#why-title", "Every natural stone carries its own veins, texture, and story."],
      [".why-copy p:nth-of-type(2)", "Win-Win Stone honors that uniqueness through design and craftsmanship. No two spaces should feel the same because no two stones are ever identical."],
      [".why-copy p:nth-of-type(3)", "From custom-cut countertops to hand-finished vanities, every creation is designed and crafted to fit not only your measurements, but also your vision."],
      [".contact .eyebrow", "Contact"],
      ["#contact-title", "Share your drawings, sizes, material ideas, or project target."],
      [".contact-grid > div > p:nth-of-type(2)", "We will help confirm the material direction, estimate the production path, and prepare the next step for your OEM/ODM order."],
      [".quote-form label:nth-child(1)", "Your name"],
      [".quote-form label:nth-child(2)", "Your email"],
      [".quote-form label:nth-child(3)", "Product or project"],
      [".quote-form label:nth-child(4)", "Message"],
      [".quote-form .button", "Send Inquiry"],
      [".site-footer p", "Custom natural stone products, factory-backed OEM/ODM service, and global delivery."],
      [".footer-links a:nth-child(1)", "Products"],
      [".footer-links a:nth-child(2)", "OEM/ODM"],
      [".footer-links a:nth-child(3)", "Why Us"],
      [".footer-links a:nth-child(4)", "Contact"],
      [".dialog-content .eyebrow", "Product Detail"],
      ["[data-dialog-quote]", "Ask for This Product"]
    ],
    process: [
      "Customer requirement",
      "Design options",
      "Drawing confirmation",
      "Material sourcing",
      "Price and contract",
      "Production schedule",
      "Material purchase after deposit",
      "Qualified production updates",
      "Factory inspection",
      "Customer or video inspection",
      "Safety packing and delivery",
      "After-sale service"
    ],
    products: [
      ["Sinks", "Luxury green marble pedestal sink", "Custom size, material, and design."],
      ["Sinks", "Calacatta pedestal sink", "Custom-made in 100% natural stone."],
      ["Sinks", "Hand-crafted vessel sink", "Designed for residential and business orders."],
      ["Tables", "Minimalist travertine dining table", "Modern form with natural texture."],
      ["Tables", "Graceful travertine dining table", "OEM/ODM orders and global delivery."],
      ["Tables", "Simple travertine dining table", "Minimal design, made to measure."],
      ["Bathroom", "Natural marble bathtub", "Luxury stone bathing centerpiece."],
      ["Tables", "Red travertine dining table", "Warm natural veins, custom proportions."],
      ["Bathroom", "Luxury stone pedestal vanity", "Personalized service and craftsmanship."]
    ],
    proof: [
      ["Factory-direct", "Custom-made directly from Yunfu, Guangdong."],
      ["Material freedom", "Marble, travertine, quartzite, onyx, and more."],
      ["Skilled artisans", "Handcrafted details from sketch to final finish."],
      ["Worldwide shipment", "Inspection, safety packing, and delivery support."]
    ],
    placeholders: {
      subject: "Stone sink, vanity, table, bathtub...",
      message: "Size, stone type, quantity, finish, delivery country..."
    },
    mail: {
      defaultSubject: "OEM/ODM stone inquiry",
      quotePrefix: "Quote request"
    }
  },
  zh: {
    metaTitle: "稳胜石材 | 天然石材 OEM/ODM 定制",
    metaDescription: "来自中国广东云浮的天然石材源头工厂，提供石材台盆、浴室柜、浴缸、餐桌与建筑定制件 OEM/ODM 服务。",
    switchLabel: "EN",
    switchAria: "Switch to English",
    text: [
      [".skip-link", "跳到主要内容"],
      [".site-header .brand span", "稳胜石材"],
      [".site-footer .brand span", "稳胜石材"],
      [".nav-toggle .sr-only", "打开导航"],
      [".nav-links a:nth-child(1)", "产品"],
      [".nav-links a:nth-child(2)", "OEM/ODM"],
      [".nav-links a:nth-child(3)", "为什么选我们"],
      [".nav-links a:nth-child(4)", "联系"],
      [".hero .eyebrow", "稳胜石材"],
      ["#hero-title", "天然石材 OEM/ODM 定制，从源头工厂到项目空间。"],
      [".hero-copy", "我们位于广东云浮这一石材产业核心产区，将大理石、洞石、石英岩、缟玛瑙等天然石材打造为适用于住宅、酒店与品牌产品线的功能艺术品。"],
      [".hero-actions .primary", "获取免费报价"],
      [".hero-actions .ghost", "查看产品"],
      [".hero-bottom span:nth-child(1)", "100% 天然石材"],
      [".hero-bottom span:nth-child(2)", "尺寸与设计可定制"],
      [".hero-bottom span:nth-child(3)", "支持全球交付"],
      [".intro .eyebrow", "欢迎"],
      ["#intro-title", "连接天然原石与实用艺术的桥梁。"],
      [".intro-grid > p", "稳胜石材位于中国广东云浮，从全球石材产业源头服务客户。您可以选择经典卡拉卡塔、卡拉拉、石英岩、洞石、缟玛瑙及其他天然石材，并围绕空间、材料和生产需求定制每一件作品。"],
      [".products .eyebrow", "最新产品"],
      ["#products-title", "适用于 OEM/ODM 项目的定制石材产品。"],
      [".products .section-heading > p:last-child", "查看台盆、浴室柜、浴缸和餐桌。每件产品都可按材料、尺寸、表面、边型和包装要求定制。"],
      [".filter-button[data-filter='all']", "全部"],
      [".filter-button[data-filter='sinks']", "台盆"],
      [".filter-button[data-filter='tables']", "餐桌"],
      [".filter-button[data-filter='bathroom']", "浴室"],
      [".video-band .eyebrow", "工厂流程"],
      ["#factory-title", "从想法到成品。"],
      [".video-grid p:last-child", "无论您是在翻新理想浴室，还是扩展产品线，稳胜石材都能细致完成选材、图纸确认、生产、检验、安全包装和门到门交付。"],
      [".service .eyebrow", "OEM/ODM 服务"],
      ["#service-title", "面向业主、设计师和企业的清晰生产流程。"],
      [".why .eyebrow", "一块石材，一个空间，独一无二。"],
      ["#why-title", "每一块天然石材都有自己的纹理、质感和故事。"],
      [".why-copy p:nth-of-type(2)", "稳胜石材通过设计与工艺尊重这种独特性。没有两个空间应该完全相同，因为没有两块天然石材完全一样。"],
      [".why-copy p:nth-of-type(3)", "从定制台面到手工打磨的浴室柜，每件作品不仅贴合尺寸，也贴合您的愿景。"],
      [".contact .eyebrow", "联系"],
      ["#contact-title", "发送您的图纸、尺寸、材料想法或项目目标。"],
      [".contact-grid > div > p:nth-of-type(2)", "我们会协助确认材料方向、评估生产路径，并为您的 OEM/ODM 订单准备下一步。"],
      [".quote-form label:nth-child(1)", "您的姓名"],
      [".quote-form label:nth-child(2)", "您的邮箱"],
      [".quote-form label:nth-child(3)", "产品或项目"],
      [".quote-form label:nth-child(4)", "留言"],
      [".quote-form .button", "发送询盘"],
      [".site-footer p", "天然石材定制产品、源头工厂 OEM/ODM 服务与全球交付。"],
      [".footer-links a:nth-child(1)", "产品"],
      [".footer-links a:nth-child(2)", "OEM/ODM"],
      [".footer-links a:nth-child(3)", "为什么选我们"],
      [".footer-links a:nth-child(4)", "联系"],
      [".dialog-content .eyebrow", "产品详情"],
      ["[data-dialog-quote]", "咨询此产品"]
    ],
    process: [
      "客户需求",
      "设计方案",
      "图纸确认",
      "材料采购",
      "报价与合同",
      "生产排期",
      "定金后采购材料",
      "生产进度更新",
      "工厂检验",
      "客户或视频验货",
      "安全包装与交付",
      "售后服务"
    ],
    products: [
      ["台盆", "奢华绿色大理石立柱盆", "尺寸、材料与设计均可定制。"],
      ["台盆", "卡拉卡塔大理石立柱盆", "采用 100% 天然石材定制。"],
      ["台盆", "手工石材台上盆", "适用于住宅与商业订单。"],
      ["餐桌", "极简洞石餐桌", "现代造型，自然肌理。"],
      ["餐桌", "优雅洞石餐桌", "支持 OEM/ODM 订单与全球交付。"],
      ["餐桌", "简约洞石餐桌", "极简设计，按需定制。"],
      ["浴室", "天然大理石浴缸", "奢华浴室的石材核心单品。"],
      ["餐桌", "红洞石餐桌", "温暖天然纹理，比例可定制。"],
      ["浴室", "奢华石材立柱浴室柜", "个性化服务与精细工艺。"]
    ],
    proof: [
      ["源头工厂", "从广东云浮直接定制生产。"],
      ["材料自由", "大理石、洞石、石英岩、缟玛瑙等多种选择。"],
      ["熟练工匠", "从草图到最终表面处理均注重手工细节。"],
      ["全球运输", "提供验货、安全包装与交付支持。"]
    ],
    placeholders: {
      subject: "石材台盆、浴室柜、餐桌、浴缸...",
      message: "尺寸、石材类型、数量、表面工艺、交付国家..."
    },
    mail: {
      defaultSubject: "OEM/ODM 石材询盘",
      quotePrefix: "报价请求"
    }
  }
};

let currentLanguage = localStorage.getItem("siteLanguage") === "zh" ? "zh" : "en";

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  header.classList.toggle("nav-open", isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-open");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    productCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

productCards.forEach((card) => {
  const opener = card.querySelector(".product-open");
  const image = card.querySelector("img");

  opener.addEventListener("click", () => {
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    dialogTitle.textContent = currentLanguage === "zh" ? card.dataset.titleZh : card.dataset.title;
    dialogDescription.textContent = currentLanguage === "zh" ? card.dataset.descriptionZh : card.dataset.description;
    dialogQuote.dataset.product = dialogTitle.textContent;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
}

dialogClose.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    closeDialog();
  }
});

dialogQuote.addEventListener("click", closeDialog);

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const copy = translations[currentLanguage];
  const form = new FormData(quoteForm);
  const name = form.get("name") || "";
  const email = form.get("email") || "";
  const subject = form.get("subject") || copy.mail.defaultSubject;
  const message = form.get("message") || "";
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project: ${subject}`,
    "",
    message
  ].join("\n");

  const mailto = new URL("mailto:stone2lisa@outlook.com");
  mailto.searchParams.set("subject", `${copy.mail.quotePrefix}: ${subject}`);
  mailto.searchParams.set("body", body);
  window.location.href = mailto.toString();
});

function setText(selector, value) {
  const element = document.querySelector(selector);

  if (!element) return;

  if (element.matches("label")) {
    const field = element.querySelector("input, textarea");
    element.textContent = value;
    if (field) {
      element.append(field);
    }
    return;
  }

  const svg = element.querySelector(":scope > svg");
  element.textContent = "";

  if (svg) {
    element.append(svg);
    element.append(` ${value}`);
    return;
  }

  element.textContent = value;
}

function applyLanguage(language) {
  const copy = translations[language];

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = copy.metaTitle;
  document.querySelector("meta[name='description']").setAttribute("content", copy.metaDescription);
  document.querySelector("meta[property='og:title']").setAttribute("content", language === "zh" ? "稳胜石材 | 天然石材定制" : "Win-Win Stone");
  document.querySelector("meta[property='og:description']").setAttribute("content", copy.metaDescription);
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.setAttribute("aria-label", language === "zh" ? "稳胜石材" : "Win-Win Stone");
  });
  languageLabel.textContent = copy.switchLabel;
  languageToggle.setAttribute("aria-label", copy.switchAria);

  copy.text.forEach(([selector, value]) => setText(selector, value));

  document.querySelectorAll(".process-list li").forEach((item, index) => {
    const number = item.querySelector("span").textContent;
    item.textContent = "";
    const numberElement = document.createElement("span");
    numberElement.textContent = number;
    item.append(numberElement, copy.process[index]);
  });

  document.querySelectorAll(".product-card").forEach((card, index) => {
    const [type, title, description] = copy.products[index];
    card.querySelector(".product-type").textContent = type;
    card.querySelector("strong").textContent = title;
    card.querySelector(".product-body span:last-child").textContent = description;
  });

  document.querySelectorAll(".proof-item").forEach((item, index) => {
    const [title, description] = copy.proof[index];
    item.querySelector("strong").textContent = title;
    item.querySelector("span").textContent = description;
  });

  quoteForm.elements.subject.placeholder = copy.placeholders.subject;
  quoteForm.elements.message.placeholder = copy.placeholders.message;
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  localStorage.setItem("siteLanguage", currentLanguage);
  applyLanguage(currentLanguage);
});

applyLanguage(currentLanguage);
