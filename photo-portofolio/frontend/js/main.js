// ===== БУРГЕР-МЕНЮ =====
const burgerBtn = document.getElementById('burgerBtn');
const nav = document.querySelector('.header nav');

burgerBtn.addEventListener('click', function() {
  nav.classList.toggle('open');
});

// ===== ЛАЙТБОКС (только на gallery.html) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

if (lightbox) {
  const galleryImgs = document.querySelectorAll('.gallery img');

  galleryImgs.forEach(function(img) {
    img.addEventListener('click', function() {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', function() {
    lightbox.classList.remove('open');
  });
}

// ===== ФОРМА (только на contact.html) =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('formStatus');

    if (name === '' || email === '' || message === '') {
      status.style.color = 'red';
      status.textContent = 'Пожалуйста, заполните все поля.';
    } else {
      status.style.color = 'green';
      status.textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
      contactForm.reset();
    }
  });
}