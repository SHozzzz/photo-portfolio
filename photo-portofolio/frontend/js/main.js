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
  contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('formStatus');

    if (name === '' || email === '' || message === '') {
      status.style.color = 'red';
      status.textContent = 'Пожалуйста, заполните все поля.';
      return;
    }

    // Отправляем данные на сервер
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      status.style.color = 'green';
      status.textContent = data.message;
      contactForm.reset();

    } catch (error) {
      status.style.color = 'red';
      status.textContent = 'Ошибка соединения с сервером.';
    }
  });
}