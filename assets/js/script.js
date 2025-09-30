// Background Animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    ctx.fillStyle = "#0b0c10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.speed;
      if (star.y > canvas.height) star.y = 0;
    });
  } else {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#f0f9ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(drawStars);
}

initStars();
drawStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

// Floating Contact Button Animation
const contactToggle = document.getElementById("contactToggle");
const contactIcons = document.querySelectorAll(".contact-icon");

let contactOpen = false;

contactToggle.addEventListener("click", () => {
  contactOpen = !contactOpen;

  contactIcons.forEach((icon, index) => {
    if (contactOpen) {
      setTimeout(() => icon.classList.add("show-icon"), index * 100);
    } else {
      icon.classList.remove("show-icon");
    }
  });
});

  // ---------- Utility: sinkron posisi GIF dengan tombol + ----------
  function syncGifWithButton() {
    const tombolPlus = document.getElementById('contactToggle');
    const gif = document.getElementById('gifDekorasi');
    if (!tombolPlus || !gif) return;
    const parent = tombolPlus.parentElement;
    const cs = window.getComputedStyle(parent);
    const bottomValue = cs.bottom || '80px';
    gif.style.bottom = bottomValue;
  }

  // ---------- Membuat dan menampilkan bubble di samping kanan-atas GIF ----------
  let bubbleTimeout = null;

  function showChatBubble(message = 'Halo!') {
    const gif = document.getElementById('gifDekorasi');
    if (!gif) return;

    // Hapus bubble lama jika ada
    const old = document.getElementById('chatBubbleDekor');
    if (old) old.remove();

    // buat wrapper bubble
    const bubble = document.createElement('div');
    bubble.id = 'chatBubbleDekor';
    bubble.className = 'chat-bubble-custom chat-bubble-hidden';
    bubble.setAttribute('role','status');
    bubble.setAttribute('aria-live','polite');

    // isi teks
    const text = document.createElement('div');
    text.innerText = message;
    bubble.appendChild(text);

    // panah kecil
    const arrow = document.createElement('div');
    arrow.className = 'chat-bubble-arrow';
    bubble.appendChild(arrow);

    document.body.appendChild(bubble);

    // pastikan style dark mode kalau body pakai dark class
    if (document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')) {
      bubble.classList.add('dark');
    }

    // ukur dulu agar dapat posisi akurat
    const gRect = gif.getBoundingClientRect();

    // default posisi: di kanan-atas GIF (disamping kanan atasnya)
    const gap = 8;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const bRect = bubble.getBoundingClientRect();

    // prefer: kanan-atas
    let left = Math.round(gRect.right + gap);
    let top = Math.round(gRect.top - 6);

    // jika melebihi kanan viewport, fallback ke kiri-atas
    if (left + bRect.width + 8 > viewportW) {
      left = Math.round(gRect.left + gRect.width - bRect.width);
      top = Math.round(gRect.top - bRect.height - gap);
    }

    // jika top terlalu kecil (keluar atas layar)
    if (top < 8) top = Math.min(8, viewportH - bRect.height - 8);

    bubble.style.left = left + 'px';
    bubble.style.top = top + 'px';

    const arrowSize = 12;
    const arrowOffset = 6;

    if (left > gRect.right) {
      arrow.style.left = (-arrowSize/2) + 'px';
      let arrowTop = (gRect.top - top) + arrowOffset;
      arrowTop = Math.max(6, Math.min(bRect.height - 6, arrowTop));
      arrow.style.top = Math.round(arrowTop) + 'px';
    } else {
      arrow.style.top = (bRect.height - arrowSize/2) + 'px';
      let centerX = (gRect.left + gRect.width/2) - left;
      centerX = Math.max(10, Math.min(bRect.width - 10, centerX));
      arrow.style.left = Math.round(centerX - arrowSize/2) + 'px';
    }

    bubble.offsetHeight;
    bubble.classList.remove('chat-bubble-hidden');
    bubble.classList.add('chat-bubble-show');

    if (bubbleTimeout) clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(hideChatBubble, 3000);

    bubble.addEventListener('click', hideChatBubble);
  }

  function hideChatBubble() {
    const bubble = document.getElementById('chatBubbleDekor');
    if (!bubble) return;
    bubble.classList.remove('chat-bubble-show');
    bubble.classList.add('chat-bubble-hidden');
    setTimeout(() => {
      const b = document.getElementById('chatBubbleDekor');
      if (b) b.remove();
    }, 200);
  }

  // ---------- Bind interaction ke GIF ----------
  function bindGifInteraction() {
    const gif = document.getElementById('gifDekorasi');
    if (!gif) return;
    gif.style.pointerEvents = 'auto';

    // gunakan click + touchstart (mobile)
    gif.addEventListener('click', (e) => {
      e.stopPropagation();
      showChatBubble('Haiii~!');
    });
    gif.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      showChatBubble('Haiii~!');
    }, {passive: true});
  }

  // ---------- Inisialisasi ----------
  function initGifWithBubble() {
    syncGifWithButton();
    bindGifInteraction();

    window.addEventListener('load', syncGifWithButton);
    window.addEventListener('resize', syncGifWithButton);

    const tombolPlus = document.getElementById('contactToggle');
    if (tombolPlus && tombolPlus.parentElement) {
      const obs = new MutationObserver(() => syncGifWithButton());
      obs.observe(tombolPlus.parentElement, { attributes: true, attributeFilter: ['style', 'class'] });
    }
  }

  window.addEventListener('DOMContentLoaded', initGifWithBubble);

  // ---------- FUNGSI BARU: Tampilkan bubble sambutan saat web selesai loading ----------
  function showWelcomeBubble() {
    // Durasi preloader: 1500ms (tahan) + 500ms (fade-out) = 2000ms
    // Kita tampilkan bubble setelah 2.5 detik agar preloader pasti sudah hilang.
    const delayAfterLoad = 2500; 

    setTimeout(() => {
      showChatBubble('Selamat Datang!');
    }, delayAfterLoad);
  }

  // Panggil fungsi di atas saat semua resource halaman (gambar, dll) sudah termuat
  window.addEventListener('load', showWelcomeBubble);


  // ---------- KODE AUDIO (dan seterusnya) ----------
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