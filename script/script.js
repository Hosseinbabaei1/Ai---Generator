const afterImages = document.querySelectorAll('.after-image'); // انتخاب تمام عناصر .after-image

afterImages.forEach((afterImage) => {
  let progress = 0;
  let direction = 1; // 1 برای جلو رفتن، -1 برای برگشتن

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  function animateBeforeAfter() {
    progress += direction * 0.006; // تغییر مقدار به صورت نرم‌تر
    const easedProgress = easeInOutCubic(progress);

    afterImage.style.clipPath = `polygon(0 0, ${(1 - easedProgress) * 100}% 0, ${(1 - easedProgress) * 100}% 100%, 0 100%)`;

    if (progress >= 1 || progress <= 0) {
      direction *= -1; // تغییر جهت انیمیشن
      setTimeout(() => {
        requestAnimationFrame(animateBeforeAfter); // مکث 2 ثانیه
      }, 1000); // مکث 2 ثانیه
    } else {
      requestAnimationFrame(animateBeforeAfter);
    }
  }

  // شروع انیمیشن برای هر تصویر
  animateBeforeAfter();
});

// refresh 

 window.onload = function() {
    window.scrollTo(0, 0);
  };


