// ==========================================================================
// 1. Initialize Supabase Client with Fallback & Local configuration support
// ==========================================================================
let supabaseUrl = "";
let supabaseAnonKey = "";

// 1.1 Read from Vite Environment Variables (if building/running through Vite)
if (typeof import.meta !== 'undefined' && import.meta.env) {
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
}

// 1.2 Read from global configuration object (for raw local run without bundler)
if ((!supabaseUrl || supabaseUrl.includes('your-project-id')) && window.SUPABASE_CONFIG) {
  supabaseUrl = window.SUPABASE_CONFIG.URL;
  supabaseAnonKey = window.SUPABASE_CONFIG.ANON_KEY;
}

// Check if credentials are correct and not placeholder values
const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') && 
  !supabaseAnonKey.includes('your-supabase-anon-key');

let supabase = null;

if (isSupabaseConfigured && window.supabase) {
  try {
    const { createClient } = window.supabase;
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized successfully via CDN.");
  } catch (err) {
    console.error("Failed to initialize Supabase:", err);
  }
} else {
  console.warn(
    "Supabase is not configured, has placeholder credentials, or library failed to load.\n" +
    "The website will use Mock Data for News & Announcements."
  );
}

// ==========================================================================
// 2. Mock Data (For offline use or before Supabase configuration)
// ==========================================================================
const mockNews = [
  {
    id: 1,
    title: "โรงเรียนบ้านดงกลางจัดกิจกรรมวันไหว้ครู ประจำปีการศึกษา ๒๕๖๙",
    content: "<p>โรงเรียนบ้านดงกลาง (ธนาคารกรุงเทพ ๓๑) ได้จัดกิจกรรมพิธีไหว้ครู ประจำปีการศึกษา ๒๕๖๙ นำโดย นางสาวสายใจ วิลัยทอง ผู้อำนวยการโรงเรียน พร้อมด้วยคณะครู บุคลากรทางการศึกษา และนักเรียนทุกระดับชั้นเข้าร่วมกิจกรรมอย่างพร้อมเพรียงกัน</p><p>กิจกรรมครั้งนี้จัดขึ้นเพื่อให้นักเรียนได้แสดงความกตัญญูกตเวทิตาและความเคารพต่อครูอาจารย์ผู้ประสิทธิ์ประสาทวิชาความรู้ รวมถึงสร้างความสัมพันธ์อันดีระหว่างครูและนักเรียน โดยในพิธีมีการมอบพานดอกไม้ธูปเทียน และการให้โอวาทจากผู้อำนวยการโรงเรียนเพื่อเป็นแนวทางในการปฏิบัติตนของนักเรียนในตลอดปีการศึกษานี้</p>",
    date: "2026-06-18",
    category: "activity",
    image_url: "" // empty uses fallback background pattern
  },
  {
    id: 2,
    title: "คณะผู้ตรวจการ สพป.ตราด เข้าเยี่ยมชมการจัดกิจกรรมการเรียนรู้ Active Learning",
    content: "<p>คณะศึกษานิเทศก์จากสำนักงานเขตพื้นที่การศึกษาประถมศึกษาตราด (สพป.ตราด) ได้เข้าตรวจเยี่ยมและติดตามการจัดการเรียนการสอนของโรงเรียนบ้านดงกลาง เพื่อส่งเสริมพัฒนาคุณภาพการศึกษา</p><p>โดยการเข้าเยี่ยมชมในครั้งนี้ เน้นไปที่กระบวนการจัดการเรียนรู้เชิงรุก (Active Learning) ที่กระตุ้นให้นักเรียนเกิดการเรียนรู้และมีส่วนร่วมในห้องเรียนอย่างเต็มศักยภาพ คณะผู้ตรวจการได้ชื่นชมการทำงานของคณะครูโรงเรียนบ้านดงกลางที่สามารถประยุกต์สื่อการสอนและเทคโนโลยีมาใช้ควบคู่กับการใช้อาคารเรียนได้อย่างลงตัว</p>",
    date: "2026-06-10",
    category: "academic",
    image_url: ""
  },
  {
    id: 3,
    title: "ธนาคารกรุงเทพ มอบทุนการศึกษาประจำปีแก่นักเรียนโรงเรียนบ้านดงกลาง",
    content: "<p>ผู้แทนจากธนาคารกรุงเทพ จำกัด (มหาชน) ได้เดินทางมามอบทุนการศึกษาประจำปีการศึกษา ๒๕๖๙ และมอบอุปกรณ์การเรียน กีฬา แก่นักเรียนโรงเรียนบ้านดงกลาง (ธนาคารกรุงเทพ ๓๑)</p><p>โครงการส่งมอบอาคารเรียนหลังที่ 31 และการสนับสนุนทุนการศึกษาอย่างต่อเนื่องนี้ เป็นการมีส่วนร่วมที่สำคัญจากภาคเอกชนในการยกระดับคุณภาพชีวิตและการศึกษาของเยาวชนในชนบท ทางโรงเรียนบ้านดงกลาง คณะครู และนักเรียนทุกคน ขอขอบพระคุณความอนุเคราะห์ในครั้งนี้เป็นอย่างยิ่ง</p>",
    date: "2026-06-05",
    category: "activity",
    image_url: ""
  }
];

const adminDeptsData = {
  academic: {
    title: "กลุ่มบริหารวิชาการ",
    icon: "fa-book-open-reader",
    subtitle: "เสาหลักแห่งการพัฒนาคุณภาพการศึกษาและผลสัมฤทธิ์ของผู้เรียน",
    tasks: [
      { name: "การพัฒนาหลักสูตรสถานศึกษา", desc: "พัฒนาหลักสูตรให้สอดคล้องกับมาตรฐานการศึกษาของชาติ และความต้องการของท้องถิ่นในศตวรรษที่ 21" },
      { name: "การจัดการเรียนการสอน", desc: "ส่งเสริมการสอนแบบ Active Learning เน้นผู้เรียนเป็นสำคัญ บูรณาการคุณธรรมนำความรู้" },
      { name: "งานวัดผลและประเมินผล", desc: "จัดทำระบบประเมินผลการเรียนรู้ของนักเรียนอย่างรอบด้าน โปร่งใส และเป็นไปตามหลักวิชาการ" },
      { name: "งานส่งเสริมสื่อ นวัตกรรม และแหล่งเรียนรู้", desc: "พัฒนาสื่อการสอนที่ทันสมัย เทคโนโลยีทางการศึกษา และดูแลห้องสมุดโรงเรียนบ้านดงกลาง" },
      { name: "งานทะเบียนนักเรียน", desc: "ดูแลประวัติและเอกสารทางการศึกษาของนักเรียนทุกคนอย่างเป็นระบบและถูกต้องตามกฎหมาย" },
      { name: "คู่มือการปฏิบัติงานกลุ่มบริหารวิชาการ", desc: "คลิกเพื่อเปิดอ่านหรือดาวน์โหลดคู่มือการปฏิบัติงาน กลุ่มบริหารวิชาการ โรงเรียนบ้านดงกลาง (ธนาคารกรุงเทพ ๓๑)", link: "/academic-manual.pdf" }
    ]
  },
  budget: {
    title: "กลุ่มบริหารงบประมาณ",
    icon: "fa-calculator",
    subtitle: "บริหารทรัพยากรด้วยความโปร่งใส คุ้มค่า ตรวจสอบได้",
    tasks: [
      { name: "จัดทำแผนปฏิบัติราชการประจำปี", desc: "วางแผนกลยุทธ์การใช้งบประมาณตามเป้าหมายของโรงเรียนและนโยบายภาครัฐ" },
      { name: "การบริหารเงินสด บัญชี และการรายงาน", desc: "บันทึกและจัดทำบัญชีรับ-จ่ายเงินนอกงบประมาณและเงินงบประมาณด้วยระบบคอมพิวเตอร์อย่างถูกต้อง" },
      { name: "การบริหารพัสดุและสินทรัพย์", desc: "ควบคุม จัดซื้อจัดจ้าง และตรวจรับพัสดุด้วยระบบจัดซื้อจัดจ้างภาครัฐ (e-GP) อย่างถูกต้อง" },
      { name: "การควบคุมภายในและการตรวจสอบ", desc: "วางระบบควบคุมภายในเพื่อป้องกันความเสี่ยงทางการเงินและพัสดุ" },
      { name: "คู่มือการปฏิบัติงานกลุ่มบริหารงบประมาณ", desc: "คลิกเพื่อเปิดอ่านหรือดาวน์โหลดคู่มือการปฏิบัติงาน กลุ่มบริหารงบประมาณ โรงเรียนบ้านดงกลาง (ธนาคารกรุงเทพ ๓๑)", link: "/budget-manual.pdf" }
    ]
  },
  personnel: {
    title: "กลุ่มบริหารงานบุคคล",
    icon: "fa-users-gear",
    subtitle: "ส่งเสริมศักยภาพครู พัฒนาคุณธรรมจริยธรรมนักเรียน",
    tasks: [
      { name: "การวางแผนอัตรากำลังและพัฒนาบุคลากร", desc: "จัดครูผู้สอนให้ตรงกับวิชาเอกและพัฒนาศักยภาพครูผ่านการอบรมสัมมนาอย่างสม่ำเสมอ" },
      { name: "งานส่งเสริมวินัยและคุณธรรมครู", desc: "ดูแลการรักษาวินัย จริยธรรมวิชาชีพครู และส่งเสริมขวัญกำลังใจครูในการปฏิบัติหน้าที่" },
      { name: "งานส่งเสริมสภานักเรียนและสวัสดิการนักเรียน", desc: "ดูแลระบบสภานักเรียน ส่งเสริมวินัย ความประพฤติ และความมีระเบียบวินัยในโรงเรียน" },
      { name: "งานแนะแนวศึกษาต่อ", desc: "ให้คำแนะนำและช่วยเหลือดูแลนักเรียนในการพัฒนาตนเองและการวางแผนเรียนต่อ" },
      { name: "คู่มือการปฏิบัติงานกลุ่มบริหารงานบุคคล", desc: "คลิกเพื่อเปิดอ่านหรือดาวน์โหลดคู่มือการปฏิบัติงาน กลุ่มบริหารงานบุคคล โรงเรียนบ้านดงกลาง (ธนาคารกรุงเทพ ๓๑)", link: "/personnel-manual.pdf" }
    ]
  },
  general: {
    title: "กลุ่มบริหารทั่วไป",
    icon: "fa-building-user",
    subtitle: "อำนวยความสะดวก ปลอดภัย และสัมพันธ์อันดีกับชุมชน",
    tasks: [
      { name: "งานธุรการและสารบรรณ", desc: "ระบบรับ-ส่งเอกสารราชการอิเล็กทรอนิกส์ จัดเก็บเอกสารสำคัญของโรงเรียนอย่างเป็นระเบียบ" },
      { name: "งานดูแลรักษาอาคารสถานที่และสภาพแวดล้อม", desc: "ปรับปรุงภูมิทัศน์โรงเรียน ดูแลรักษาอาคารเรียนธนาคารกรุงเทพ ๓๑ ให้สะอาด ปลอดภัย น่าเรียนรู้" },
      { name: "งานสัมพันธ์ชุมชนและประชาสัมพันธ์", desc: "ประสานงานกับคณะกรรมการสถานศึกษาฯ ชุมชนบ้านดงกลาง ศิษย์เก่า และประชาสัมพันธ์ข่าวสารสู่สาธารณชน" },
      { name: "งานอนามัยและโภชนาการโรงเรียน", desc: "ดูแลความสะอาดของน้ำดื่ม โรงอาหาร อาหารกลางวันนักเรียน และระบบคัดกรองสุขภาพเบื้องต้น" },
      { name: "คู่มือการปฏิบัติงานกลุ่มบริหารงานทั่วไป", desc: "คลิกเพื่อเปิดอ่านหรือดาวน์โหลดคู่มือการปฏิบัติงาน กลุ่มบริหารงานทั่วไป โรงเรียนบ้านดงกลาง (ธนาคารกรุงเทพ ๓๑)", link: "/general-manual.pdf" }
    ]
  }
};

// ==========================================================================
// 3. Document Ready Setup & Core UI Functions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupMobileDrawer();
  setupDepartmentModals();
  fetchAndRenderNews();
  setupContactForm();
  fetchAndRenderTeachers();
  setupAdminDashboard();

  // Close all modals when Escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        
        // Clear login error message if it's the login modal
        const loginError = document.getElementById('login-error-msg');
        if (loginError) loginError.style.display = 'none';
      });
    }
  });
});

// Navigation Bar Scroll Effect & Active Link Highlight
function setupNavigation() {
  const header = document.querySelector('.main-header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  // Smooth scroll without changing hash in URL
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Only handle internal anchor links
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 120, // offset for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  window.addEventListener('scroll', () => {
    // Scroll header background change
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Tracking
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130; // offset for fixed header + padding buffer
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Mobile Navigation Drawer Menu Toggle
function setupMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock body scroll
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        closeDrawer();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          // Wait a moment for drawer closing animation to start
          setTimeout(() => {
            window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
            });
          }, 150);
        }
      } else {
        closeDrawer();
      }
    });
  });
}

// ==========================================================================
// 4. Department Modal Details Interaction
// ==========================================================================
function setupDepartmentModals() {
  const adminCards = document.querySelectorAll('.admin-card');
  const modal = document.getElementById('admin-modal');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalIconArea = modal.querySelector('.modal-icon-area');
  const modalTitle = modal.querySelector('.modal-title-text');
  const modalSubtitle = modal.querySelector('.modal-subtitle-text');
  const modalDetailList = modal.querySelector('.modal-detail-list');

  function openModal(deptKey) {
    const data = adminDeptsData[deptKey];
    if (!data) return;

    // Populate modal contents
    modalIconArea.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;

    let listHtml = '';
    data.tasks.forEach(task => {
      if (task.link) {
        listHtml += `
          <a href="${task.link}" target="_blank" rel="noopener noreferrer" class="modal-list-item pdf-link-item">
            <i class="fa-solid fa-file-pdf"></i>
            <div class="modal-list-item-text">
              <h4>${task.name} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.75rem; margin-left: 3px;"></i></h4>
              <p>${task.desc}</p>
            </div>
          </a>
        `;
      } else {
        listHtml += `
          <div class="modal-list-item">
            <i class="fa-solid fa-circle-check"></i>
            <div class="modal-list-item-text">
              <h4>${task.name}</h4>
              <p>${task.desc}</p>
            </div>
          </div>
        `;
      }
    });
    modalDetailList.innerHTML = listHtml;

    // Open modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  adminCards.forEach(card => {
    card.addEventListener('click', () => {
      const deptKey = card.getAttribute('data-dept');
      openModal(deptKey);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// ==========================================================================
// 5. News Fetch & Render (Supabase or Mock Fallback)
// ==========================================================================
let allNewsData = [];

async function fetchAndRenderNews() {
  const container = document.getElementById('news-container');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Loading skeleton placeholder is already in HTML.
  
  if (supabase) {
    try {
      // Query from 'news' table, ordered by date descending
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      allNewsData = data || [];
      console.log(`Fetched ${allNewsData.length} news items from Supabase.`);
    } catch (err) {
      console.error("Error fetching news from Supabase, loading fallback mock data:", err);
      allNewsData = mockNews;
    }
  } else {
    // If Supabase not initialized, wait 800ms for realistic skeleton feel, then load mock
    await new Promise(resolve => setTimeout(resolve, 800));
    allNewsData = mockNews;
  }

  // Render news cards
  renderNews(allNewsData);

  // Setup news category filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      if (category === 'all') {
        renderNews(allNewsData);
      } else {
        const filtered = allNewsData.filter(item => item.category === category);
        renderNews(filtered);
      }
    });
  });
}

function renderNews(newsItems) {
  const container = document.getElementById('news-container');
  
  if (newsItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gray-600);">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--gray-300); margin-bottom: 15px;"></i>
        <p>ไม่พบข่าวสารในหมวดหมู่นี้</p>
      </div>
    `;
    return;
  }

  let cardsHtml = '';
  newsItems.forEach(item => {
    // Formatted date in Thai
    const thaiDate = formatThaiDate(item.date);
    const categoryName = item.category === 'academic' ? 'ข่าววิชาการ' : 'กิจกรรมโรงเรียน';
    
    // Check for image
    const imageHtml = item.image_url 
      ? `<img src="${item.image_url}" alt="${item.title}" class="news-card-img">`
      : `<div class="news-image-placeholder"><i class="fa-solid fa-school"></i></div>`;

    cardsHtml += `
      <article class="news-card" data-news-id="${item.id}">
        <div class="news-image-wrapper">
          <span class="news-tag">${categoryName}</span>
          ${imageHtml}
        </div>
        <div class="news-content">
          <div class="news-date"><i class="fa-solid fa-calendar-days"></i> ${thaiDate}</div>
          <h3 class="news-title">${item.title}</h3>
          <div class="news-excerpt">${stripHtml(item.content)}</div>
          <button class="btn-readmore">อ่านรายละเอียด <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </article>
    `;
  });

  container.innerHTML = cardsHtml;

  // Setup click handler for each news card to open detail modal
  const newsCards = container.querySelectorAll('.news-card');
  newsCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.getAttribute('data-news-id'));
      const newsItem = allNewsData.find(item => item.id === id);
      if (newsItem) openNewsModal(newsItem);
    });
  });
}

// News Detail Modal Open/Close
function openNewsModal(item) {
  const modal = document.getElementById('news-modal');
  const closeBtn = modal.querySelector('.modal-close-btn');
  const imgElement = document.getElementById('news-modal-img');
  const dateElement = document.getElementById('news-modal-date');
  const tagElement = document.getElementById('news-modal-tag');
  const titleElement = document.getElementById('news-modal-title');
  const contentElement = document.getElementById('news-modal-content');

  // Fill contents
  if (item.image_url) {
    imgElement.style.display = 'block';
    imgElement.src = item.image_url;
  } else {
    // If no image, hide the image wrapper or show a header accent instead
    imgElement.style.display = 'none';
  }
  
  dateElement.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${formatThaiDate(item.date)}`;
  tagElement.textContent = item.category === 'academic' ? 'ข่าววิชาการ' : 'กิจกรรมโรงเรียน';
  titleElement.textContent = item.title;
  contentElement.innerHTML = item.content;

  // Open modal
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Setup close
  function closeNewsModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.onclick = closeNewsModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeNewsModal();
  };
}

// Helper: Strip HTML tags to make text excerpt
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

// Helper: Format Thai Date (YYYY-MM-DD to Thai Date)
function formatThaiDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // return original if invalid
  
  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // BC to Thai Buddhist Year
  return `${day} ${month} ${year}`;
}

// ==========================================================================
// 6. Contact Form Submission (Saves to Supabase or logs locally)
// ==========================================================================
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Set Loading State
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    alertBox.style.display = 'none';
    alertBox.className = 'form-alert-message';

    // Get input values
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Validation check
    if (!name || !email || !subject || !message) {
      alertBox.textContent = "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง";
      alertBox.classList.add('error');
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      return;
    }

    const payload = {
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      try {
        // Insert into 'contact_submissions' table
        const { error } = await supabase
          .from('contact_submissions')
          .insert([payload]);

        if (error) throw error;

        // Success Alert
        alertBox.textContent = "ส่งข้อความติดต่อสอบถามเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด";
        alertBox.classList.add('success');
        form.reset();
      } catch (err) {
        console.error("Error submitting contact form to Supabase:", err);
        alertBox.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล กรุณาลองใหม่อีกครั้งภายหลัง";
        alertBox.classList.add('error');
      }
    } else {
      // Mock submission for offline presentation
      console.log("Mock Submit payload (Supabase not configured):", payload);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alertBox.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> 
        ส่งข้อความเรียบร้อย! (สถานะ: ออฟไลน์ / การบันทึกจำลอง)
        <br><small style="opacity: 0.8;">กรุณาตั้งค่าเชื่อมต่อกับ Supabase เพื่อบันทึกข้อมูลจริง</small>
      `;
      alertBox.classList.add('success');
      form.reset();
    }

    // Reset Loading state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  });
}

// ==========================================================================
// 6. Staff Directory & Admin Dashboard Logic
// ==========================================================================

// Mock Teachers Data (For offline use or fallback)
let mockTeachers = [
  {
    id: 1,
    name: "นางสาวสายใจ วิลัยทอง",
    position: "ผู้อำนวยการโรงเรียนบ้านดงกลาง",
    image_url: "/director.png",
    order_index: 1
  },
  {
    id: 2,
    name: "นางสาวนพรัตน์ วิสพันธ์",
    position: "ครูชำนาญการพิเศษ (หัวหน้าฝ่ายบริหารงบประมาณ)",
    image_url: "",
    order_index: 2
  },
  {
    id: 3,
    name: "นางชูชื่น บุตรฉิม",
    position: "ครูชำนาญการ (หัวหน้าฝ่ายบริหารทั่วไป)",
    image_url: "",
    order_index: 3
  },
  {
    id: 4,
    name: "นางสาวสิริมน จันทสาร",
    position: "ครู (หัวหน้าฝ่ายบริหารวิชาการ)",
    image_url: "",
    order_index: 4
  },
  {
    id: 5,
    name: "นางธีรกานต์ กุมภะ",
    position: "ครูชำนาญการพิเศษ",
    image_url: "",
    order_index: 5
  }
];

let isAdminMode = false;
let allTeachers = [];

async function fetchAndRenderTeachers() {
  const loadingElement = document.getElementById('teachers-loading');
  const emptyElement = document.getElementById('teachers-empty');
  const directorRow = document.getElementById('director-row');
  const teachersGrid = document.getElementById('teachers-grid');

  if (!directorRow || !teachersGrid) return;

  // Show Loading state
  loadingElement.style.display = 'block';
  emptyElement.style.display = 'none';
  directorRow.innerHTML = '';
  teachersGrid.innerHTML = '';

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('order_index', { ascending: true })
        .order('id', { ascending: true });

      if (error) throw error;
      allTeachers = data || [];
    } else {
      // Offline fallback
      allTeachers = [...mockTeachers].sort((a, b) => a.order_index - b.order_index);
    }
  } catch (err) {
    console.error("Error fetching teachers from Supabase:", err);
    // Fallback to mock on db error
    allTeachers = [...mockTeachers].sort((a, b) => a.order_index - b.order_index);
  }

  // Hide loading state
  loadingElement.style.display = 'none';

  if (allTeachers.length === 0) {
    emptyElement.style.display = 'block';
    return;
  }

  // Find the Director (order_index = 1 or top teacher)
  const director = allTeachers.find(t => t.order_index === 1);
  const staff = allTeachers.filter(t => t.order_index !== 1);

  // Render Director
  if (director) {
    directorRow.innerHTML = renderTeacherCard(director, true);
  }

  // Render Staff Grid
  if (staff.length > 0) {
    teachersGrid.innerHTML = staff.map(t => renderTeacherCard(t, false)).join('');
  }

  // Setup event listeners for edit and delete buttons
  setupTeacherCardActions();
}

function renderTeacherCard(teacher, isDirector) {
  const avatarHtml = teacher.image_url 
    ? `<img src="${teacher.image_url}" alt="${teacher.name}">` 
    : `<i class="fa-solid fa-user-tie"></i>`;

  const cardClass = isDirector ? 'director-card-style' : 'staff-card-style';

  const actionButtons = isAdminMode ? `
    <div class="teacher-card-actions">
      <button class="btn-action btn-edit" data-id="${teacher.id}" title="แก้ไขข้อมูล"><i class="fa-solid fa-pencil"></i></button>
      <button class="btn-action btn-delete" data-id="${teacher.id}" title="ลบข้อมูล"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  ` : '';

  return `
    <div class="teacher-card ${cardClass}" id="teacher-card-${teacher.id}">
      ${actionButtons}
      <div class="teacher-avatar-container">
        ${avatarHtml}
      </div>
      <h3 class="teacher-name-text">${teacher.name}</h3>
      <p class="teacher-position-text">${teacher.position}</p>
    </div>
  `;
}

function setupAdminDashboard() {
  const loginTrigger = document.getElementById('admin-login-trigger');
  const loginModal = document.getElementById('admin-login-modal');
  const loginForm = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password');
  const loginError = document.getElementById('login-error-msg');
  const addBtnContainer = document.getElementById('admin-add-btn-container');
  const addTeacherBtn = document.getElementById('add-teacher-btn');

  // Teacher modal and form elements
  const teacherModal = document.getElementById('teacher-form-modal');
  const teacherForm = document.getElementById('teacher-form');
  const teacherIdInput = document.getElementById('teacher-id');
  const teacherNameInput = document.getElementById('teacher-name');
  const teacherPositionInput = document.getElementById('teacher-position');
  const teacherOrderInput = document.getElementById('teacher-order');
  const photoInput = document.getElementById('teacher-photo-input');
  const photoPreview = document.getElementById('teacher-photo-preview');
  const photoPlaceholder = document.getElementById('teacher-photo-placeholder');
  const modalTitle = document.getElementById('teacher-modal-title');
  const submitBtn = document.getElementById('teacher-form-submit-btn');

  if (!loginTrigger) return;

  // 1. Manage Modal overlays close buttons
  document.querySelectorAll('.modal-overlay').forEach(modalOverlay => {
    const closeBtn = modalOverlay.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
        // Clear login error if it's the login modal
        if (loginError) loginError.style.display = 'none';
      });
    }
  });

  // 2. Open Admin Login
  loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdminMode) {
      // If already logged in, show logout confirmation
      if (confirm("คุณต้องการออกจากระบบการจัดการบุคลากรใช่หรือไม่?")) {
        logoutAdmin();
      }
    } else {
      passwordInput.value = '';
      loginError.style.display = 'none';
      loginModal.classList.add('open');
    }
  });

  // 3. Login Submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = passwordInput.value;
    if (pass === 'admin') {
      loginAdmin();
      loginModal.classList.remove('open');
    } else {
      loginError.style.display = 'block';
    }
  });

  // 4. Open Add Teacher Form
  if (addTeacherBtn) {
    addTeacherBtn.addEventListener('click', () => {
      // Reset form
      teacherForm.reset();
      teacherIdInput.value = '';
      photoPreview.style.display = 'none';
      photoPlaceholder.style.display = 'block';
      modalTitle.textContent = 'เพิ่มบุคลากรใหม่';
      submitBtn.textContent = 'บันทึกข้อมูล';
      teacherModal.classList.add('open');
    });
  }

  // 5. Preview photo when selected
  if (photoInput) {
    photoInput.addEventListener('change', () => {
      const file = photoInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          photoPreview.src = e.target.result;
          photoPreview.style.display = 'block';
          photoPlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 6. Teacher Form Submit
  if (teacherForm) {
    teacherForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const id = teacherIdInput.value;
      const name = teacherNameInput.value.trim();
      const position = teacherPositionInput.value.trim();
      const order_index = parseInt(teacherOrderInput.value, 10);
      const photoFile = photoInput.files[0];

      if (!name || !position || isNaN(order_index)) {
        alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
        return;
      }

      // Show saving loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'กำลังบันทึกข้อมูล...';

      try {
        let image_url = photoPreview.src && photoPreview.style.display === 'block' ? photoPreview.src : '';

        // If a new photo file was uploaded and Supabase is configured
        if (photoFile && supabase) {
          try {
            image_url = await uploadTeacherPhoto(photoFile);
          } catch (uploadErr) {
            console.error("Upload error:", uploadErr);
            alert("ไม่สามารถอัปโหลดรูปภาพไปยัง Supabase Storage ได้ จะเซฟข้อมูลรูปภาพแบบโลคอล");
          }
        }

        const payload = {
          name,
          position,
          order_index,
          image_url
        };

        if (supabase) {
          if (id) {
            // Update
            const { error } = await supabase
              .from('teachers')
              .update(payload)
              .eq('id', id);
            if (error) throw error;
          } else {
            // Insert
            const { error } = await supabase
              .from('teachers')
              .insert([payload]);
            if (error) throw error;
          }
        } else {
          // Offline mock updates
          if (id) {
            const idx = mockTeachers.findIndex(t => t.id === parseInt(id, 10));
            if (idx !== -1) {
              mockTeachers[idx] = { ...mockTeachers[idx], ...payload };
            }
          } else {
            const newId = mockTeachers.length > 0 ? Math.max(...mockTeachers.map(t => t.id)) + 1 : 1;
            mockTeachers.push({ id: newId, ...payload });
          }
        }

        // Close modal and refresh list
        teacherModal.classList.remove('open');
        fetchAndRenderTeachers();
      } catch (err) {
        console.error("Error saving teacher:", err);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + err.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'บันทึกข้อมูล';
      }
    });
  }
}

// Function to upload photos to Supabase Storage
async function uploadTeacherPhoto(file) {
  if (!supabase) return '';
  
  const fileExt = file.name.split('.').pop();
  // Safe filename
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { data, error } = await supabase.storage
    .from('teachers')
    .upload(filePath, file);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from('teachers')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

// Helper to enter Admin Mode
function loginAdmin() {
  isAdminMode = true;
  document.body.classList.add('admin-mode-active');
  
  // Show Add button container
  const addBtnContainer = document.getElementById('admin-add-btn-container');
  if (addBtnContainer) addBtnContainer.style.display = 'block';

  // Add the green floating badge indicator
  let badge = document.getElementById('admin-badge-indicator');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'admin-badge-indicator';
    badge.className = 'admin-badge-indicator';
    badge.innerHTML = `
      <i class="fa-solid fa-unlock-keyhole"></i> 
      <span>ระบบจัดการครู (Active)</span>
      <button class="btn-logout" id="admin-logout-btn">ออกจากระบบ</button>
    `;
    document.body.appendChild(badge);
    
    // Setup logout click
    document.getElementById('admin-logout-btn').addEventListener('click', logoutAdmin);
  } else {
    badge.style.display = 'flex';
  }

  // Refresh view to display card actions
  fetchAndRenderTeachers();
}

// Helper to logout Admin Mode
function logoutAdmin() {
  isAdminMode = false;
  document.body.classList.remove('admin-mode-active');
  
  const addBtnContainer = document.getElementById('admin-add-btn-container');
  if (addBtnContainer) addBtnContainer.style.display = 'none';

  const badge = document.getElementById('admin-badge-indicator');
  if (badge) badge.style.display = 'none';

  // Refresh view to hide actions
  fetchAndRenderTeachers();
}

// Bind clicks to Card actions (Edit/Delete)
function setupTeacherCardActions() {
  if (!isAdminMode) return;

  // Edit Actions
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const teacher = allTeachers.find(t => t.id == id);
      if (teacher) {
        // Open form in edit mode
        const teacherModal = document.getElementById('teacher-form-modal');
        const teacherIdInput = document.getElementById('teacher-id');
        const teacherNameInput = document.getElementById('teacher-name');
        const teacherPositionInput = document.getElementById('teacher-position');
        const teacherOrderInput = document.getElementById('teacher-order');
        const photoPreview = document.getElementById('teacher-photo-preview');
        const photoPlaceholder = document.getElementById('teacher-photo-placeholder');
        const modalTitle = document.getElementById('teacher-modal-title');
        const submitBtn = document.getElementById('teacher-form-submit-btn');

        teacherIdInput.value = teacher.id;
        teacherNameInput.value = teacher.name;
        teacherPositionInput.value = teacher.position;
        teacherOrderInput.value = teacher.order_index;

        if (teacher.image_url) {
          photoPreview.src = teacher.image_url;
          photoPreview.style.display = 'block';
          photoPlaceholder.style.display = 'none';
        } else {
          photoPreview.style.display = 'none';
          photoPlaceholder.style.display = 'block';
        }

        modalTitle.textContent = 'แก้ไขข้อมูลบุคลากร';
        submitBtn.textContent = 'อัปเดตข้อมูล';
        teacherModal.classList.add('open');
      }
    });
  });

  // Delete Actions
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const teacher = allTeachers.find(t => t.id == id);
      if (teacher) {
        if (confirm(`คุณต้องการลบรายชื่อคุณครู "${teacher.name}" ออกจากทำเนียบจริงหรือไม่?`)) {
          try {
            if (supabase) {
              const { error } = await supabase
                .from('teachers')
                .delete()
                .eq('id', id);
              if (error) throw error;
            } else {
              // Mock Delete
              const idx = mockTeachers.findIndex(t => t.id == id);
              if (idx !== -1) mockTeachers.splice(idx, 1);
            }
            fetchAndRenderTeachers();
          } catch (err) {
            console.error("Error deleting teacher:", err);
            alert("เกิดข้อผิดพลาดในการลบข้อมูล: " + err.message);
          }
        }
      }
    });
  });
}
