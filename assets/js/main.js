// ============================================
//  Porto-New — main.js
//  DeniARP.26 a.k.a EzCraftID — Portfolio
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // Avatar fallback jika gambar gagal dimuat
    const avatar = document.getElementById('avatar');
    if (avatar) {
        avatar.addEventListener('error', () => {
            avatar.style.background = '#444';
            avatar.removeAttribute('src');
        });
    }

});
