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

document.addEventListener('DOMContentLoaded', () => {
  
  //  ANIMATION DES COMPTEURS DE STATISTIQUES

  const compteurs = document.querySelectorAll('.stat-counter');
  
  const animerCompteur = (compteur) => {
    // Récupère la valeur finale 
    const cible = parseInt(compteur.getAttribute('data-target'), 10);
    const duree = 2000; 
    const tempsDebut = performance.now(); 
    
    const actualiser = (tempsActuel) => {
      //  Calcule le temps passé 
      const tempsEcoule = tempsActuel - tempsDebut; 
      
      //  Calcule le pourcentage d'avancement 
      const progression = Math.min(tempsEcoule / duree, 1); 
      
      //  Multiplie la cible par le pourcentage 
      const chiffreActuel = Math.floor(progression * cible); 
      
      //  Affiche le chiffre sur la page
      compteur.innerText = `+${chiffreActuel}`; 
      
      // Si les 2 secondes ne sont pas écoulées, on continue l'animation
      if (progression < 1) {
        requestAnimationFrame(actualiser);
      }
    };
    
    requestAnimationFrame(actualiser);
  };

  // Création de l'observateur pour les compteurs
  const observateurCompteurs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animerCompteur(entry.target);
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.5 }); 

  // Initialisation 
  compteurs.forEach(compteur => {
    compteur.innerText = "+0"; 
    observateurCompteurs.observe(compteur);
  });



  //  (FADE-IN) DE LA SECTION
  
  const sectionsAanimer = document.querySelectorAll('.fade-in-section');

  // Création de l'observateur pour le fade-in
  const observateurSections = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 }); 

  sectionsAanimer.forEach(section => observateurSections.observe(section));
});
 