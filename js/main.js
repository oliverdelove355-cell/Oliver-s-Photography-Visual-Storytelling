// 🌐 Mobile menu toggle with animation
const toggleBtn = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    toggleBtn.textContent = isOpen ? 'Menu' : 'Close ✦';
  });
}

// 🎥 Lightbox (gallery) with fade + keyboard support
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

function openLightbox(src, caption) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open', 'fade-in');
  setTimeout(() => lightbox.classList.remove('fade-in'), 400);
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.add('fade-out');
  setTimeout(() => {
    lightbox.classList.remove('open', 'fade-out');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
  }, 300);
}
if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  // Escape key closes lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

// 🖼️ Bind gallery cards with ripple effect
document.querySelectorAll('.grid .card').forEach(card => {
  card.addEventListener('click', (e) => {
    const img = card.querySelector('img');
    const label = card.querySelector('.label');
    openLightbox(img.src, label?.textContent);

    // Ripple animation on click
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// 💌 Contact form with animated feedback
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all fields.', 'error');
      return;
    }

    // Simulated success (replace with backend call)
    showToast('✨ Thanks for reaching out—your story matters!', 'success');
    contactForm.reset();
  });
}

// 🎉 Toast notifications
function showToast(text, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}