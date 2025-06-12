function setDarkMode() {
  document.documentElement.classList.add('dark-mode');
}

function setLightMode() {
  document.documentElement.classList.remove('dark-mode');
}

//---------------------------------------------------------------------------------------------------------------

// اعمال تم ذخیره‌شده هنگام لود صفحه
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark-mode');
  document.getElementById('theme-checkbox').checked = true;
} else {
  document.documentElement.classList.remove('dark-mode');
  document.getElementById('theme-checkbox').checked = false;
}

// سوییچ تم با چک‌باکس
document.getElementById('theme-checkbox').addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});