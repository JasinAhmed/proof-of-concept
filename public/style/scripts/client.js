// Ik pak het formulier van de bewaar-knop
const favoriteForm = document.querySelector('.favorite-form');

// Ik pak de toast melding
const successToast = document.querySelector('#successToast');

// Ik pak de tekst in de toast melding
const successToastTitle = document.querySelector('.success-toast-content strong');
const successToastText = document.querySelector('.success-toast-content p');

// Ik pak de sluitknop van de toast
const successToastClose = document.querySelector('.success-toast-close');

// Hier sla ik de timer op, zodat de toast vanzelf weer weggaat
let toastTimer;

// Deze functie laat de melding zien
function showToast(title, text) {
  successToastTitle.textContent = title;
  successToastText.textContent = text;

  successToast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    successToast.classList.remove('show');
  }, 3500);
}

// Als je op het kruisje klikt, verdwijnt de melding
if (successToastClose) {
  successToastClose.addEventListener('click', () => {
    clearTimeout(toastTimer);
    successToast.classList.remove('show');
  });
}

// Alleen uitvoeren als het formulier bestaat
if (favoriteForm) {
  const favoriteButton = favoriteForm.querySelector('.favorite-button');
  const favoriteHeart = favoriteForm.querySelector('.favorite-heart');
  const favoriteText = favoriteForm.querySelector('.favorite-text');

  // Ik gebruik het huis-id om te onthouden welk huis al bewaard is
  const houseId = favoriteForm.dataset.houseId;
  const storageKey = 'favorite-house-' + houseId;

  // Als het huis al eerder is bewaard, zet ik de knop meteen op "Bewaard"
  if (localStorage.getItem(storageKey) === 'true') {
    favoriteButton.classList.add('is-favorite');
    favoriteHeart.textContent = '♥';
    favoriteText.textContent = 'Bewaard';
  }

  favoriteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Als het huis al is opgeslagen, haal ik hem weer uit favorieten
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

    // Loading state
    favoriteButton.classList.add('loading');
    favoriteButton.disabled = true;
    favoriteText.textContent = 'Bezig...';

    const formData = new FormData(favoriteForm);

    const response = await fetch(favoriteForm.action, {
      method: favoriteForm.method,
      body: new URLSearchParams(formData)
    });

    // Loading state weghalen
    favoriteButton.classList.remove('loading');
    favoriteButton.disabled = false;

    // Als opslaan goed ging
    if (response.ok) {
      localStorage.setItem(storageKey, 'true');

      favoriteButton.classList.add('is-favorite');
      favoriteButton.classList.add('success');

      favoriteHeart.textContent = '♥';
      favoriteText.textContent = 'Bewaard';

      showToast(
        'Woning opgeslagen',
        'Deze woning is toegevoegd aan je favorieten.'
      );

      setTimeout(() => {
        favoriteButton.classList.remove('success');
      }, 1500);
    }

    // Als opslaan niet goed ging
    if (!response.ok) {
      favoriteText.textContent = 'Niet gelukt';

      setTimeout(() => {
        favoriteHeart.textContent = '♡';
        favoriteText.textContent = 'Bewaren';
      }, 1500);
    }
  });
}