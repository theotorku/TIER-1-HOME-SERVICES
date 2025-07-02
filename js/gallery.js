document.addEventListener('DOMContentLoaded', function () {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const imgAlt = this.querySelector('img').getAttribute('alt');
      lightboxImg.setAttribute('src', imgSrc);
      lightboxCaption.textContent = imgAlt;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function () {
    lightbox.classList.remove('active');
  });
});
