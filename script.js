document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      // Close all others
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current
      item.classList.toggle('active');
    });
  });

  // Lightbox functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev-modal');
  const nextBtn = document.querySelector('.next-modal');
  const galleryImages = document.querySelectorAll('.gallery-img');
  
  let currentIndex = 0;

  if (modal && galleryImages.length > 0) {
    const imagesArray = Array.from(galleryImages);

    function openModal(index) {
      currentIndex = index;
      modal.classList.add('active');
      modalImg.src = imagesArray[currentIndex].src;
    }

    function closeModalFunc() {
      modal.classList.remove('active');
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % imagesArray.length;
      modalImg.src = imagesArray[currentIndex].src;
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
      modalImg.src = imagesArray[currentIndex].src;
    }

    imagesArray.forEach((img, index) => {
      img.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModalFunc);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-nav')) {
        closeModalFunc();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModalFunc();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }
});

// Copy PIX Key function
window.copyPixKey = function() {
  const pixKeyText = document.getElementById('pixKey').innerText;
  navigator.clipboard.writeText(pixKeyText).then(() => {
    const pixEl = document.getElementById('pixKey');
    const msg = document.getElementById('copyMsg');
    
    // Visual feedback
    pixEl.style.borderColor = '#00ff88';
    pixEl.style.color = '#00ff88';
    msg.style.opacity = '1';
    
    setTimeout(() => {
      pixEl.style.borderColor = 'var(--text-muted)';
      pixEl.style.color = 'var(--text-main)';
      msg.style.opacity = '0';
    }, 2500);
  }).catch(err => {
    console.error('Falha ao copiar:', err);
  });
};
