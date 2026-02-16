// Smooth anchor scroll (keeps it calm)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", id);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// ====== EDIT YOUR WORKS HERE ======
// Put your images in: /assets/works/
// Example file path: assets/works/under-pressure.jpg
const WORKS = [
  {
    title: "Under Pressure",
    year: "2026",
    medium: "Digital / Mixed Media",
    image: "assets/works/under-pressure.jpg",
    statement: "A quiet collapse under invisible weight. The ocean as mind-pressure.",
    tags: ["liminal", "vast", "silhouette"],
    links: [
      { label: "Primary link", href: "#" }
    ]
  },
  {
    title: "Teeth in the Womb",
    year: "2025",
    medium: "Digital",
    image: "assets/works/teeth-in-the-womb.jpg",
    statement: "A title you already own — replace statement with your official one.",
    tags: ["ritual", "dreamscape"],
    links: []
  },
  {
    title: "Untitled (Rib Colonnade)",
    year: "2026",
    medium: "Digital",
    image: "assets/works/rib-colonnade.jpg",
    statement: "Anatomical cathedral. A lantern. The spiral as dust.",
    tags: ["bone", "fog", "glyph"],
    links: []
  },
];

// Render grid
const grid = document.getElementById("worksGrid");
grid.innerHTML = WORKS.map((w, i) => `
  <button class="work" type="button" data-i="${i}" aria-label="Open ${escapeHtml(w.title)}">
    <img class="work__img" src="${w.image}" alt="${escapeHtml(w.title)}" loading="lazy">
    <div class="work__cap">
      <div>${escapeHtml(w.title)}</div>
      <span>${escapeHtml(w.year || "")}</span>
    </div>
  </button>
`).join("");

// Modal logic
const modal = document.getElementById("workModal");
const closeBtn = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalText = document.getElementById("modalText");
const modalTags = document.getElementById("modalTags");
const modalLinks = document.getElementById("modalLinks");

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".work");
  if (!btn) return;
  const i = Number(btn.dataset.i);
  openWork(i);
});

closeBtn.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const inDialog =
    rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
  if (!inDialog) modal.close();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.open) modal.close();
});

function openWork(i){
  const w = WORKS[i];
  if (!w) return;

  modalImg.src = w.image;
  modalImg.alt = w.title;

  modalTitle.textContent = w.title;
  modalMeta.textContent = [w.year, w.medium].filter(Boolean).join(" • ");
  modalText.textContent = w.statement || "";

  modalTags.innerHTML = (w.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");

  modalLinks.innerHTML = (w.links || []).map(l => `
    <a class="mlink" href="${l.href}" target="_blank" rel="noreferrer">${escapeHtml(l.label)} →</a>
  `).join("");

  modal.showModal();
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[m]));
}
