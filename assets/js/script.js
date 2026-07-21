/* ─── Background Canvas ─── */

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.2,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.7 + 0.3
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (document.documentElement.classList.contains('dark')) {
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.speed;
      if (star.y > canvas.height) { star.y = 0; star.x = Math.random() * canvas.width; }
    });
    ctx.globalAlpha = 1;
  } else {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#dbeafe');
    gradient.addColorStop(0.5, '#ede9fe');
    gradient.addColorStop(1, '#fdf4ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(drawStars);
}

initStars();
drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

/* ─── Preloader ─── */

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }, 1500);
});

/* ─── Navbar Scroll Effect ─── */

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── Dark Mode Toggle ─── */

const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

applyTheme(document.documentElement.classList.contains('dark'));

themeBtn.addEventListener('click', () => {
  applyTheme(!document.documentElement.classList.contains('dark'));
});

/* ─── Typed Text Animation ─── */

const typedEl = document.getElementById('typed-text');
const words = ['Pelajar TJKT', 'Network Enthusiast', 'IoT Builder', 'Web Developer'];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeLoop() {
  const current = words[wordIdx];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIdx--);
  } else {
    typedEl.textContent = current.slice(0, charIdx++);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIdx > current.length) {
    isDeleting = true;
    delay = 1800;
  } else if (isDeleting && charIdx < 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % words.length;
    charIdx = 0;
    delay = 350;
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

/* ─── Reveal on Scroll ─── */

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Floating Contact Button ─── */

const contactToggle = document.getElementById('contactToggle');
const contactIcons = document.querySelectorAll('.contact-icon');
let contactOpen = false;

contactToggle.addEventListener('click', () => {
  contactOpen = !contactOpen;
  contactToggle.classList.toggle('open', contactOpen);
  contactIcons.forEach((icon, index) => {
    if (contactOpen) {
      setTimeout(() => icon.classList.add('show-icon'), index * 80);
    } else {
      icon.classList.remove('show-icon');
    }
  });
});

/* ─── Hu Tao Mascot System ─── */

function syncGifWithButton() {
  const tombolPlus = document.getElementById('contactToggle');
  const gif = document.getElementById('gifDekorasi');
  if (!tombolPlus || !gif) return;
  const cs = window.getComputedStyle(tombolPlus.parentElement);
  gif.style.bottom = cs.bottom || '80px';
}

let bubbleTimeout = null;
let typingIndicatorTimeout = null;
let idleTimer = null;
let lastSection = null;
let clickCount = 0;

const MASCOT = {
  welcome: [
    '✨ Hei hei! Selamat datang di portofolionya Deni~ Aku Hu Tao, pemandu setengah resmi hari ini!',
    '👻 Oho, ada tamu baru! Jangan lupa scroll ke bawah ya, ada banyak hal menarik tentang Deni~',
    '🎉 Eh, kamu dateng juga! Aku udah nunggu lho. Mari kukenalkan Deni padamu~',
  ],

  sections: {
    hero: [
      '✨ Ini dia orangnya! Deni April Rian Pratama~ Namanya panjang tapi orangnya seru kok!',
      '🌟 Kamu lagi liat halamannya si Deni nih. Dia itu orangnya tekun banget soal teknologi~',
      '👀 Tampan kan? Eh maksudnya... portofolionya tampan! Scroll ke bawah yuk~',
    ],
    about: [
      '📖 Nah, ini bagian "Tentang Saya"-nya Deni! Dia itu siswa TJKT yang punya mimpi besar di dunia IT~',
      '🤔 Hmm, Deni itu tertarik sama jaringan komputer. Katanya jaringan itu kayak "urat nadi" teknologi. Dalam banget ya~',
      '💡 Deni lagi serius belajar buat karier di masa depan! Eits, jangan lupa baca sampai habis ya~',
      '🎓 Jurusan TJKT itu keren lho! Belajar gimana "menghubungkan" dunia. Cocok banget sama Deni yang supel~',
    ],
    skills: [
      '⚡ Wah wah wah! Skill-nya Deni ga main-main nih~ HTML, CSS, JS, sampai IoT! Rajin banget belajarnya~',
      '🛠️ Deni bisa networking lho! Ngerti kabel, protokol, semua deh. Aku sendiri bingung kabel mana yang mana... 😅',
      '🔧 IoT? Internet of Things? Deni bisa bikin benda-benda "hidup" lewat internet! Mirip aku yang bikin arwah "aktif"... eh beda ya!',
      '💻 HTML sama CSS itu fondasi web. Dan Deni udah kuasain itu~ Kira-kira apa yang dia bakal buat selanjutnya ya~?',
      '🌐 MikroTik lovers! Deni itu penggemar MikroTik buat networking. Katanya konfigurasinya enak~',
    ],
    projects: [
      '🌱 Penyiram tanaman otomatis pakai ESP8266! Deni beneran bikin ini~ Bayangin, tanaman disiram sendiri!',
      '🖥️ Deni pernah pasang jaringan LAN beneran di lab sekolah lho! Bukan cuma teori, tapi praktek~',
      '🔌 Proyek IoT-nya Deni keren banget! ESP8266 sebagai otaknya, bisa dikontrol dari website pula~ Deni emang kreatif!',
      '💼 Dua proyek ini baru permulaan~ Aku yakin Deni bakal punya lebih banyak proyek keren ke depannya!',
    ],
  },

  randomFacts: [
    '💡 Fakta: Deni itu pengguna setia MikroTik! Router kesukaannya buat ngutak-ngatik jaringan~',
    '🌐 Fun fact: TJKT itu singkatan dari Teknik Jaringan Komputer & Telekomunikasi. Panjang ya? Tapi Deni hafal diluar kepala!',
    '🔥 Deni bisa bikin jaringan LAN dari nol! Kabel, switch, router, semua dia tau~',
    '📡 Tau gak? IoT yang Deni pelajari itu bisa bikin kulkas "ngomong" ke hp lho! Canggih banget~',
    '⚡ Deni itu cocoknya jadi network engineer~ Atau mungkin IoT developer? Atau web dev? Serba bisa!',
    '🎯 Deni belajar otodidak banyak hal~ Semangat belajarnya itu yang bikin aku salut!',
    '🛡️ Hardware troubleshooting? Gampang buat Deni! Komputermu rusak? Dia mungkin bisa bantu~',
    '📱 Deni bisa Canva juga lho~ Jadi bukan cuma teknis, sisi kreatifnya juga ada nih!',
    '🌙 Psst~ Deni itu suka eksplorasi hal baru di bidang IT. Rasa penasarannya besar banget!',
    '🤫 Rahasia: Deni itu diam-diam punya skill yang terus berkembang~ Tunggu aja karya besarnya!',
  ],

  clicks: [
    '👋 Haiii~! Lagi ngapain? Jangan cuma liat-liat, explore dulu dong!',
    '😄 Hehe, kamu klik aku lagi! Aku tau aku imut~ Tapi jangan lupain portofolionya Deni ya!',
    '👻 BOO! Eh salah, itu bukan gayaku... HAIII!! 😆',
    '🎭 Klak-klik klak-klik~ Kamu beneran suka sama aku ya? Makasih~ Tapi baca profilnya Deni dulu sana!',
    '✨ Aku lagi bosen nganggur nih~ Makasih udah klik! Ada yang mau ditanyain tentang Deni?',
    '🌸 Ssst! Aku lagi ngawasin kamu dari tadi lho~ Hehe, bercanda! Haiii!!',
    '💫 Kamu yang ke-' + (++clickCount) + ' kalinya klik aku! ...sebenernya aku ngitung dari tadi~',
    '🔮 Kata ramalan aku: Kamu bakal terkesan sama proyek-proyeknya Deni! Scroll ke bawah dan buktikan~',
  ],

  idle: [
    '😴 Hei hei~ Jangan ketiduran! Masih ada bagian seru di bawah lho~',
    '👀 Psst! Kamu masih di sini kan? Klik aku kalau mau ngobrol~',
    '🎵 La la la~ Sambil nunggu kamu scroll, aku nyanyi dulu ya. Deni juga suka musik lho!',
    '⏰ Udah lama nih~ Gimana? Portofolionya Deni menarik kan? Jangan lupa simpan kontaknya!',
    '🌟 Reminder: Deni itu open to opportunities lho! Kalau butuh orang IT, hubungi dia ya~',
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function positionBubble(bubble, gif) {
  document.body.appendChild(bubble);

  if (document.documentElement.classList.contains('dark')) {
    bubble.classList.add('dark');
  }

  const gRect = gif.getBoundingClientRect();
  const gap = 10;
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const bRect = bubble.getBoundingClientRect();

  let left = Math.round(gRect.right + gap);
  let top  = Math.round(gRect.top - 6);

  if (left + bRect.width + 12 > viewportW) {
    left = Math.round(gRect.left - bRect.width - gap);
  }
  if (left < 8) left = 8;
  if (top < 8)  top  = Math.min(8, viewportH - bRect.height - 8);
  if (top + bRect.height > viewportH - 8) top = viewportH - bRect.height - 8;

  bubble.style.left = left + 'px';
  bubble.style.top  = top + 'px';

  const arrowSize = 10;
  const arrow = bubble.querySelector('.chat-bubble-arrow');
  if (!arrow) return;

  if (left >= gRect.right) {
    arrow.style.left = (-arrowSize / 2) + 'px';
    let arrowTop = (gRect.top + gRect.height / 2) - top - arrowSize / 2;
    arrowTop = Math.max(6, Math.min(bRect.height - 14, arrowTop));
    arrow.style.top  = Math.round(arrowTop) + 'px';
    arrow.style.right = '';
  } else {
    arrow.style.right = (-arrowSize / 2) + 'px';
    arrow.style.left  = '';
    let arrowTop = (gRect.top + gRect.height / 2) - top - arrowSize / 2;
    arrowTop = Math.max(6, Math.min(bRect.height - 14, arrowTop));
    arrow.style.top   = Math.round(arrowTop) + 'px';
  }
}

function showTypingThenBubble(message, duration = 4500) {
  const gif = document.getElementById('gifDekorasi');
  if (!gif) return;

  const old = document.getElementById('chatBubbleDekor');
  if (old) old.remove();
  if (typingIndicatorTimeout) clearTimeout(typingIndicatorTimeout);
  if (bubbleTimeout) clearTimeout(bubbleTimeout);

  const typing = document.createElement('div');
  typing.id = 'chatBubbleDekor';
  typing.className = 'chat-bubble-custom chat-bubble-hidden typing-indicator';
  typing.setAttribute('role', 'status');
  typing.setAttribute('aria-live', 'polite');
  typing.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  const typingArrow = document.createElement('div');
  typingArrow.className = 'chat-bubble-arrow';
  typing.appendChild(typingArrow);

  positionBubble(typing, gif);
  typing.offsetHeight;
  typing.classList.remove('chat-bubble-hidden');
  typing.classList.add('chat-bubble-show');

  typingIndicatorTimeout = setTimeout(() => {
    const t = document.getElementById('chatBubbleDekor');
    if (t) t.remove();

    const bubble = document.createElement('div');
    bubble.id = 'chatBubbleDekor';
    bubble.className = 'chat-bubble-custom chat-bubble-hidden';
    bubble.setAttribute('role', 'status');
    bubble.setAttribute('aria-live', 'polite');

    const text = document.createElement('div');
    text.innerText = message;
    bubble.appendChild(text);

    const arrow = document.createElement('div');
    arrow.className = 'chat-bubble-arrow';
    bubble.appendChild(arrow);

    positionBubble(bubble, gif);
    bubble.offsetHeight;
    bubble.classList.remove('chat-bubble-hidden');
    bubble.classList.add('chat-bubble-show');

    bubbleTimeout = setTimeout(hideChatBubble, duration);
    bubble.addEventListener('click', hideChatBubble);

    resetIdleTimer();
  }, 900);
}

function showChatBubble(message, duration = 4500) {
  showTypingThenBubble(message, duration);
}

function hideChatBubble() {
  const bubble = document.getElementById('chatBubbleDekor');
  if (!bubble) return;
  bubble.classList.remove('chat-bubble-show');
  bubble.classList.add('chat-bubble-hidden');
  setTimeout(() => {
    const b = document.getElementById('chatBubbleDekor');
    if (b) b.remove();
  }, 250);
}

function resetIdleTimer() {
  if (idleTimer) clearTimeout(idleTimer);
  const delay = 25000 + Math.random() * 15000;
  idleTimer = setTimeout(() => {
    showChatBubble(pickRandom(MASCOT.idle), 5000);
  }, delay);
}

function onSectionEnter(sectionId) {
  if (lastSection === sectionId) return;
  lastSection = sectionId;
  const msgs = MASCOT.sections[sectionId];
  if (!msgs) return;
  setTimeout(() => showChatBubble(pickRandom(msgs), 5000), 400);
}

function bindGifInteraction() {
  const gif = document.getElementById('gifDekorasi');
  if (!gif) return;
  gif.style.pointerEvents = 'auto';
  gif.style.cursor = 'pointer';

  const handleClick = (e) => {
    e.stopPropagation();
    clickCount++;
    const clickMsgs = [
      ...MASCOT.clicks,
      ...MASCOT.randomFacts,
    ];
    showChatBubble(pickRandom(clickMsgs), 5000);
    resetIdleTimer();
  };

  gif.addEventListener('click', handleClick);
  gif.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    handleClick(e);
  }, { passive: true });
}

function initSectionObserver() {
  const sections = [
    { id: 'hero',     el: document.getElementById('hero') },
    { id: 'about',    el: document.getElementById('about') },
    { id: 'skills',   el: document.getElementById('skills') },
    { id: 'projects', el: document.getElementById('projects') },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const found = sections.find(s => s.el === entry.target);
        if (found) onSectionEnter(found.id);
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => { if (s.el) observer.observe(s.el); });
}

function initGifWithBubble() {
  syncGifWithButton();
  bindGifInteraction();
  initSectionObserver();
  window.addEventListener('load', syncGifWithButton);
  window.addEventListener('resize', syncGifWithButton);
  const tombolPlus = document.getElementById('contactToggle');
  if (tombolPlus && tombolPlus.parentElement) {
    const obs = new MutationObserver(() => syncGifWithButton());
    obs.observe(tombolPlus.parentElement, { attributes: true, attributeFilter: ['style', 'class'] });
  }
}

window.addEventListener('DOMContentLoaded', initGifWithBubble);

function showWelcomeBubble() {
  setTimeout(() => {
    showChatBubble(pickRandom(MASCOT.welcome), 6000);
    resetIdleTimer();
    setTimeout(() => {
      showChatBubble(pickRandom(MASCOT.randomFacts), 5000);
    }, 18000);
  }, 2200);
}

window.addEventListener('load', showWelcomeBubble);

/* ─── Audio Player ─── */

const audio = document.getElementById('bgAudio');
const btn = document.getElementById('diskBtn');
const icon = btn.querySelector('i');

audio.muted = true;
audio.play().catch(() => {});

function updateIcon() {
  if (!audio.paused && !audio.muted) {
    icon.classList.add('spin');
  } else {
    icon.classList.remove('spin');
  }
}

btn.addEventListener('click', () => {
  if (audio.muted || audio.paused) {
    audio.muted = false;
    audio.play();
  } else {
    audio.muted = true;
  }
  updateIcon();
});

audio.addEventListener('play', updateIcon);
audio.addEventListener('pause', updateIcon);
audio.addEventListener('volumechange', updateIcon);

updateIcon();