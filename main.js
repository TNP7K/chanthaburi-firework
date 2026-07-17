/* =========================================================================
   CHANTHABURI FIREWORKS — SHARED JS
   ========================================================================= */

const NAV_LINKS = [
  { href: "index.html", label: "หน้าแรก" },
  { href: "products.html", label: "สินค้า" },
  { href: "portfolio.html", label: "ผลงาน" },
  // { href: "blog.html", label: "บทความ" },
  { href: "about.html", label: "เกี่ยวกับเรา" },
  { href: "contact.html", label: "ติดต่อ" },
];

function currentPage() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function renderHeader() {
  const cur = currentPage();
  const linkHTML = (cls) => NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${cls==='mobile' ? '' : ''} ${l.href===cur ? 'active' : ''}">${l.label}</a>`
  ).join("");

  document.body.insertAdjacentHTML("afterbegin", `
  <div class="status-strip">
    <div class="container">
      <div><span class="dot"></span>SYSTEM ONLINE · พร้อมให้บริการ</div>
      <div class="right"><span>VOLTAGE STABLE · STOCK SYNCED · </span>2026</div>
    </div>
  </div>
  <header class="site">
    <div class="nav-row container">
      <a href="index.html" class="brand">
        <span class="brand-mark"></span>
        <span class="brand-text">
          <span class="name">CHANTHABURI FIREWORKS</span><br>
          <span class="tag">Professional Fireworks & Special Effects</span>
        </span>
      </a>
      <nav class="main-nav">${linkHTML()}</nav>
      <div class="nav-actions">
        <button class="icon-btn menu-btn" id="menuToggle" aria-label="เปิดเมนู">☰</button>
      </div>
    </div>
    <div class="mobile-nav" id="mobileNav">${linkHTML('mobile')}</div>
  </header>`);

  const btn = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileNav");
  btn.addEventListener("click", () => menu.classList.toggle("open"));
}

function renderFooter() {
  document.body.insertAdjacentHTML("beforeend", `
  <footer class="site">
    <div class="container">
      <div class="footer-grid">
        <div>
          <span class="brand-text"><span class="name" style="font-family:var(--mono);font-weight:800;">CHANTHABURI FIREWORKS</span></span>
          <p style="margin-top:12px;">ระบบจุดพลุและอุปกรณ์ไฟเวิร์กสำหรับมืออาชีพ ที่ได้มาตรฐาน และทีมงานที่มากประสบการณ์</p>
        </div>
        <div>
          <h4>เมนู</h4>
          <ul>
            <li><a href="index.html">หน้าแรก</a></li>
            <li><a href="products.html">สินค้า</a></li>
            <li><a href="portfolio.html">ผลงาน</a></li>
            <li><a href="blog.html">บทความ</a></li>
          </ul>
        </div>
        <div>
          <h4>บริษัท</h4>
          <ul>
            <li><a href="about.html">เกี่ยวกับเรา</a></li>
            <li><a href="contact.html">ติดต่อ</a></li>
          </ul>
        </div>
        <div>
          <h4>ติดต่อ</h4>
          <p>081-308-9254<br>LINE: @<br></p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 CHANTHABURI FIREWORKS — ALL SYSTEMS RESERVED</span>
        <span>BUILT FOR THOSE WHO MASTER THE SKY</span>
      </div>
    </div>
  </footer>`);
}

// ---------- helpers ----------
function formatPrice(n) { return "฿" + n.toLocaleString("th-TH"); }

function stockInfo(s) {
  if (s === "in") return { cls: "stock-in", label: "พร้อมส่ง" };
  if (s === "low") return { cls: "stock-low", label: "ใกล้หมด" };
  return { cls: "stock-out", label: "หมดสต็อก" };
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function productCardHTML(p) {
  const st = stockInfo(p.stock);
  return `
  <a href="product.html?id=${p.id}" class="card">
    <div class="card-media">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
      <span class="stock-tag ${st.cls}"><span class="dot"></span>${st.label}</span>
      ${p.channels ? `<span class="ch-tag">${p.channels}CH</span>` : ""}
    </div>
    <div class="card-body">
      <div class="card-sku">${p.id}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-short">${p.short}</div>
      <div class="card-foot">
        <div class="price">${formatPrice(p.price)}</div>
        <span class="btn btn-outline btn-sm">ดูสินค้า →</span>
      </div>
    </div>
  </a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
