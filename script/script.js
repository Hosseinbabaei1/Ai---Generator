document.addEventListener('DOMContentLoaded', () => {
  // انیمیشن اسلایدر قبل/بعد
  const afterImages = document.querySelectorAll('.after-image');

  afterImages.forEach((afterImage) => {
    let progress = 0;
    let direction = 1;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    function animateBeforeAfter() {
      progress += direction * 0.006;
      const easedProgress = easeInOutCubic(progress);
      afterImage.style.clipPath = `polygon(0 0, ${(1 - easedProgress) * 100}% 0, ${(1 - easedProgress) * 100}% 100%, 0 100%)`;

      if (progress >= 1 || progress <= 0) {
        direction *= -1;
        setTimeout(() => {
          requestAnimationFrame(animateBeforeAfter);
        }, 1000);
      } else {
        requestAnimationFrame(animateBeforeAfter);
      }
    }

    animateBeforeAfter();
  });

  // اسکرول نرم برای لینک‌های داخلی
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // پاپ‌آپ: باز و بسته شدن و قرار دادن متن پرامپت
  document.querySelectorAll('[data-popup]').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const popupId = this.getAttribute('data-popup');
      const promptText = this.getAttribute('data-prompt') || "No prompt provided";
      const popup = document.getElementById(popupId);
      if (!popup) return;
      const promptSpan = popup.querySelector('#promptText');
      if (promptSpan) promptSpan.textContent = promptText;
      popup.classList.add('show');
    });
  });

  // بستن پاپ‌آپ با کلیک روی دکمه یا خارج از باکس
  document.querySelectorAll('.popup .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.popup').classList.remove('show');
    });
  });

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', e => {
      if (e.target === popup) popup.classList.remove('show');
    });
  });

  // اسلایدر داخلی پاپ‌آپ (before/after)
  const container = document.querySelector('.container-img-prompts');
  if (container) {
    const before = container.querySelector('.before');
    const slider = container.querySelector('.popup-slider');
    let isDragging = false;

    container.addEventListener('mousedown', e => {
      isDragging = true;
      moveSlider(e.clientX);
    });
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    function moveSlider(x) {
      const rect = container.getBoundingClientRect();
      let offset = x - rect.left;
      offset = Math.max(0, Math.min(offset, rect.width));
      const percent = (offset / rect.width) * 100;
      slider.style.transition = 'none';
      before.style.transition = 'none';
      slider.style.left = `${percent}%`;
      before.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    }
  }
});

// تابع کپی کردن متن پرامپت
function copyPrompt() {
  const promptText = document.getElementById('promptText')?.textContent;
  if (!promptText) return alert('هیچ متنی برای کپی وجود ندارد!');
  navigator.clipboard.writeText(promptText)
    .then(() => alert('Prompt copied to clipboard!'))
    .catch(() => alert('Copy failed!'));
}

// صفحه وقتی بارگذاری میشه اسکرول به بالا
window.onload = function() {
  window.scrollTo(0, 0);
};


// ---------------------------------------------------- see more -----------------------------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
  const seeMoreBtn = document.getElementById("seeMoreBtn");

  seeMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const hiddenCards = document.querySelectorAll(".poster-cards.hidden-card");
    const numberToShow = 8;

    for (let i = 0; i < numberToShow && i < hiddenCards.length; i++) {
      const card = hiddenCards[i];

      // ابتدا فقط opacity و transform رو برمی‌داریم
      card.classList.remove("hidden-card");

      // بازنشانی موقعیت اولیه برای انیمیشن
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";

      // اجرای انیمیشن با تاخیر کم برای فعال شدن ترنزیشن
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.position = "relative";
      }, 50);
    }

    // مخفی کردن دکمه اگر چیزی باقی نمونده
    if (document.querySelectorAll(".poster-cards.hidden-card").length === 0) {
      seeMoreBtn.style.display = "none";
    }
  });
});
// ---------------------------------------------------scrole top -----------------------------------------------------------------
document.querySelector('.footer-scroll-btn').addEventListener('click', function(e) {
  e.preventDefault();
  const target = document.getElementById('home');
  if (target) {
    const y = target.getBoundingClientRect().top + window.pageYOffset - 100; // 100 پیکسل برای هدر فیکس
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
});
// ---------------------------------------------------copy prompt -----------------------------------------------------------------
function copyPrompt() {
  const text = document.getElementById('promptText').innerText;
  navigator.clipboard.writeText(text).then(function() {
    showCopyNotification();
  });
}

function showCopyNotification() {
  const notif = document.getElementById('copy-notification');
  notif.style.display = 'block';
  notif.style.opacity = '1';
  setTimeout(() => {
    notif.style.opacity = '0';
    setTimeout(() => notif.style.display = 'none', 300);
  }, 1200);
}


// ---------------------------------------------------fix popup-----------------------------------------------------------------
function openPopup(el) {
  const imgBefore = document.getElementById('popupImageBefore');
  const imgAfter = document.getElementById('popupImageAfter');
  const promptText = document.getElementById('promptText');
  const popup = document.getElementById('popup1');
  if (!imgBefore || !imgAfter || !promptText || !popup || !el) {
    console.error('Popup elements or trigger element not found.');
    return;
  }
  imgBefore.src = el.getAttribute('data-img-before') || '';
  imgAfter.src = el.getAttribute('data-img-after') || '';
  promptText.innerText = el.getAttribute('data-prompt') || '';
  popup.classList.add('show');
}



