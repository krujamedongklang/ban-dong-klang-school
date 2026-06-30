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
      { name: "งานทะเบียนนักเรียน", desc: "ดูแลประวัติและเอกสารทางการศึกษาของนักเรียนทุกคนอย่างเป็นระบบและถูกต้องตามกฎหมาย" }
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
      { name: "การควบคุมภายในและการตรวจสอบ", desc: "วางระบบควบคุมภายในเพื่อป้องกันความเสี่ยงทางการเงินและพัสดุ" }
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
      { name: "งานแนะแนวศึกษาต่อ", desc: "ให้คำแนะนำและช่วยเหลือดูแลนักเรียนในการพัฒนาตนเองและการวางแผนเรียนต่อ" }
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
      { name: "งานอนามัยและโภชนาการโรงเรียน", desc: "ดูแลความสะอาดของน้ำดื่ม โรงอาหาร อาหารกลางวันนักเรียน และระบบคัดกรองสุขภาพเบื้องต้น" }
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
});

// Navigation Bar Scroll Effect & Active Link Highlight
function setupNavigation() {
  const header = document.querySelector('.main-header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

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
      const sectionTop = section.offsetTop - 120; // offset for fixed header
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
    link.addEventListener('click', () => {
      closeDrawer();
      // Wait a moment for smooth scroll
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
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
      listHtml += `
        <div class="modal-list-item">
          <i class="fa-solid fa-circle-check"></i>
          <div class="modal-list-item-text">
            <h4>${task.name}</h4>
            <p>${task.desc}</p>
          </div>
        </div>
      `;
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
