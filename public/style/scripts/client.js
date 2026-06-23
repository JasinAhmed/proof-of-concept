// Sorteerformulier op de overzichtspagina
const sortSelect = document.querySelector('#sort');

if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    sortSelect.form.submit();
  });
}

// Formulier van de bewaar-knop
const favoriteForm = document.querySelector('.favorite-form');

// Toast melding
const successToast = document.querySelector('#successToast');
const successToastTitle = document.querySelector('.success-toast-content strong');
const successToastText = document.querySelector('.success-toast-content p');
const successToastClose = document.querySelector('.success-toast-close');

if (successToastClose && successToastClose.textContent.trim() === '') {
  successToastClose.textContent = 'Sluiten';
}

let toastTimer;

function showToast(title, text) {
  if (!successToast || !successToastTitle || !successToastText) {
    return;
  }

  successToastTitle.textContent = title;
  successToastText.innerHTML = text;

  successToast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    successToast.classList.remove('show');
  }, 4000);
}

if (successToastClose && successToast) {
  successToastClose.addEventListener('click', () => {
    clearTimeout(toastTimer);
    successToast.classList.remove('show');
  });
}

if (favoriteForm) {
  const favoriteButton = favoriteForm.querySelector('.favorite-button');
  const favoriteHeart = favoriteForm.querySelector('.favorite-heart');
  const favoriteText = favoriteForm.querySelector('.favorite-text');

  const houseId = favoriteForm.dataset.houseId;
  const storageKey = 'favorite-house-' + houseId;

  if (localStorage.getItem(storageKey) === 'true') {
    favoriteButton.classList.add('is-favorite');
    favoriteHeart.textContent = '♥';
    favoriteText.textContent = 'Bewaard';
  }

  favoriteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (localStorage.getItem(storageKey) === 'true') {
      localStorage.removeItem(storageKey);

      favoriteButton.classList.remove('is-favorite');
      favoriteHeart.textContent = '♡';
      favoriteText.textContent = 'Bewaren';

      showToast(
        'Woning verwijderd',
        'Deze woning is uit je favorieten gehaald.'
      );

      return;
    }

    favoriteButton.classList.add('loading');
    favoriteButton.disabled = true;
    favoriteText.textContent = 'Bezig...';

    const formData = new FormData(favoriteForm);

    const response = await fetch(favoriteForm.action, {
      method: favoriteForm.method,
      body: new URLSearchParams(formData)
    });

    favoriteButton.classList.remove('loading');
    favoriteButton.disabled = false;

    if (response.ok) {
      localStorage.setItem(storageKey, 'true');

      favoriteButton.classList.add('is-favorite');
      favoriteButton.classList.add('success');

      favoriteHeart.textContent = '♥';
      favoriteText.textContent = 'Bewaard';

      showToast(
        'Je huis is bewaard',
        'Je vindt &apos;m onder <a href="/favorieten">Favorieten</a> in je account'
      );

      setTimeout(() => {
        favoriteButton.classList.remove('success');
      }, 1500);
    }

    if (!response.ok) {
      favoriteText.textContent = 'Niet gelukt';

      showToast(
        'Opslaan niet gelukt',
        'Probeer het later opnieuw.'
      );

      setTimeout(() => {
        favoriteHeart.textContent = '♡';
        favoriteText.textContent = 'Bewaren';
      }, 1500);
    }
  });
}
// Mobiel menu - Progressive Enhancement
const openMenuBtn = document.querySelector('.menu-button');
const closeMenuBtn = document.querySelector('.closemenu-btn');
const mobileMenu = document.querySelector('#mobile-menu');

if (openMenuBtn && closeMenuBtn && mobileMenu) {
  openMenuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    mobileMenu.classList.add('menu-open');
  });

  closeMenuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    mobileMenu.classList.remove('menu-open');
  });
}