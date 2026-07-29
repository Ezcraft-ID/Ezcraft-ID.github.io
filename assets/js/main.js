// ============================================
//  Porto-New — main.js
//  DeniARP.26 a.k.a EzCraftID — Portfolio
// ============================================

// ──────────────────────────────────────────
//  ★ KONFIGURASI LINK TAMBAHAN
//  Tambah atau hapus objek di array ini
//  untuk mengubah isi popup tombol "..."
//
//  Ikon: cari nama di https://fontawesome.com
// ──────────────────────────────────────────
const moreLinks = [
    { label: 'YouTube',   icon: 'fa-brands fa-youtube',   url: '#' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram',  url: '#' },
    { label: 'Twitter/X', icon: 'fa-brands fa-x-twitter',  url: '#' },
    { label: 'Website',   icon: 'fa-solid fa-globe',       url: '#' },
];
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // ── Avatar fallback ──
    const avatar = document.getElementById('avatar');
    if (avatar) {
        avatar.addEventListener('error', () => {
            avatar.style.background = '#444';
            avatar.removeAttribute('src');
        });
    }

    // ── Build popup "more" ──
    const btnMore  = document.getElementById('btn-more');
    const popup    = document.createElement('div');
    popup.id       = 'more-popup';
    popup.className = 'more-popup';
    popup.setAttribute('aria-hidden', 'true');

    // Render item dari config
    moreLinks.forEach(link => {
        const a = document.createElement('a');
        a.href      = link.url;
        a.className = 'more-popup-item';
        a.innerHTML = `<i class="${link.icon}"></i><span>${link.label}</span>`;
        if (link.url !== '#') a.target = '_blank';
        popup.appendChild(a);
    });

    // Sisipkan popup setelah tombol
    btnMore.parentElement.style.position = 'relative';
    btnMore.insertAdjacentElement('afterend', popup);

    // Toggle popup on click
    btnMore.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = popup.classList.toggle('open');
        popup.setAttribute('aria-hidden', !isOpen);
        btnMore.classList.toggle('active', isOpen);
    });

    // Tutup popup jika klik di luar
    document.addEventListener('click', () => {
        popup.classList.remove('open');
        popup.setAttribute('aria-hidden', 'true');
        btnMore.classList.remove('active');
    });

});
