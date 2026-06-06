//  Déclaration des variables simples
const navbar = document.getElementById('mainNavbar');
const boutonTheme = document.getElementById('theme-toggle');
const boutonHaut = document.getElementById('back-to-top');

//  Application du thème sauvegardé au chargement de la page
const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde) {
  document.documentElement.setAttribute('data-theme', themeSauvegarde);
  
  const icone = boutonTheme.querySelector('.icon-theme');
  //  CHARGEMENT :
  if (themeSauvegarde === 'dark') {
    // Si le site est sombre, on affiche la LUNE
    icone.classList.remove('bi-sun-fill');
    icone.classList.add('bi-moon-fill');
  } else {
    // Si le site est clair, on affiche le SOLEIL
    icone.classList.remove('bi-moon-fill');
    icone.classList.add('bi-sun-fill');
  }
} else {
  // Par défaut
  document.documentElement.setAttribute('data-theme', 'light');
  const icone = boutonTheme.querySelector('.icon-theme');
  icone.classList.remove('bi-moon-fill');
  icone.classList.add('bi-sun-fill');
}

// Clic sur le bouton de la navbar
boutonTheme.addEventListener('click', function() {
  const themeActuel = document.documentElement.getAttribute('data-theme');
  const icone = boutonTheme.querySelector('.icon-theme');
  
  // LOGIQUE AU CLIC :
  if (themeActuel === 'dark') {
    // Si la page est noire, elle devient BLANCHE (mode light)
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    
    // Et l'icône devient le SOLEIL
    icone.classList.remove('bi-moon-fill');
    icone.classList.add('bi-sun-fill');
  } 
  else {
    // Si la page est blanche, elle devient NOIRE (mode dark)
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    // Et l'icône devient la LUNE
    icone.classList.remove('bi-sun-fill');
    icone.classList.add('bi-moon-fill');
  }
});

//  Gestion du Scroll (Navbar & Bouton Haut)
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 300) {
    boutonHaut.classList.add('visible');
  } else {
    boutonHaut.classList.remove('visible');
  }
});

boutonHaut.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
