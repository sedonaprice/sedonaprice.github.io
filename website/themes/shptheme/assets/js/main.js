// Import only the Bootstrap javascript necessary

import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';



// Loosly based on the example from
// https://www.freecodecamp.org/news/how-to-build-a-dark-mode-switcher-with-tailwind-css-and-flowbite/

const store = sessionStorage;

var themeSelectLight = document.getElementById('select-light');
var themeSelectDark = document.getElementById('select-dark');
var themeSelectAuto = document.getElementById('select-auto');


// Change the current active theme based on previous settings
if (
  (!('color-theme' in store))
) {
  themeSelectAuto.classList.add('active');
  themeSelectDark.classList.remove('active');
  themeSelectLight.classList.remove('active');
} else if (
  (store.getItem('color-theme') === 'dark')
) {
  themeSelectAuto.classList.remove('active');
  themeSelectDark.classList.add('active');
  themeSelectLight.classList.remove('active');
} else if (
  (store.getItem('color-theme') === 'light')
){
  themeSelectAuto.classList.remove('active');
  themeSelectDark.classList.remove('active');
  themeSelectLight.classList.add('active');
}


// Add event listeners to the selectors:
window.onload = function () {
  themeSelectDark.addEventListener('click', function() {
        // Change current icon setting
        themeSelectLight.classList.remove('active');
        themeSelectAuto.classList.remove('active');
        themeSelectDark.classList.add('active');

        // Set theme
        if (!document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.add('dark');
        }
        store.setItem('color-theme', 'dark');
  });
  themeSelectLight.addEventListener('click', function() {
        // Change current icon setting
        themeSelectLight.classList.add('active');
        themeSelectAuto.classList.remove('active');
        themeSelectDark.classList.remove('active');

        // Set theme
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        }
        store.setItem('color-theme', 'light');
  });

  themeSelectAuto.addEventListener('click', function() {
        // Change current icon setting
        themeSelectLight.classList.remove('active');
        themeSelectAuto.classList.add('active');
        themeSelectDark.classList.remove('active');

        // Set theme
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        store.removeItem("color-theme")
  });
}
