const favoriteForm = document.querySelector('.favorite-form');
const favoritesCount = document.querySelector('.favorites-count');
const favoritesHeaderHeart = document.querySelector('.favorites-heart');
const successToast = document.querySelector('#successToast');
const successToastClose = document.querySelector('.success-toast-close');

let toastTimer;

function showSuccessToast() {
  clearTimeout(toastTimer);

  successToast.classList.add('show');

  toastTimer = setTimeout(() => {
    successToast.classList.remove('show');
  }, 3500);
}

if (successToastClose) {
  successToastClose.addEventListener('click', () => {
    clearTimeout(toastTimer);
    successToast.classList.remove('show');
  });
}

if (favoriteForm) {
  const favoriteButton = favoriteForm.querySelector('.favorite-button');
  const favoriteHeart = favoriteForm.querySelector('.favorite-heart');
  const favoriteText = favoriteForm.querySelector('.favorite-text');

  favoriteForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    favoriteButton.classList.add('loading');
    favoriteButton.disabled = true;
    favoriteText.textContent = 'Bezig...';

    const formData = new FormData(favoriteForm);

    const response = await fetch(favoriteForm.action, {
      method: favoriteForm.method,
      body: new URLSearchParams(formData)
    });

    favoriteButton.classList.remove('loading');

    if (response.ok) {
      favoriteButton.classList.add('is-favorite');
      favoriteButton.classList.add('success');

      favoriteHeart.textContent = '♥';
      favoriteText.textContent = 'Bewaard';

      showSuccessToast();

      if (favoritesHeaderHeart) {
        favoritesHeaderHeart.textContent = '♥';
      }

      if (favoritesCount) {
        const huidigeAantal = Number(favoritesCount.textContent) || 0;
        favoritesCount.textContent = huidigeAantal + 1;
        favoritesCount.classList.add('zichtbaar');
      }

      setTimeout(() => {
        favoriteButton.classList.remove('success');
      }, 1500);
    } else {
      favoriteText.textContent = 'Niet gelukt';
    }

    favoriteButton.disabled = false;
  });
}