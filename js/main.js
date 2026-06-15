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
 
        // FILTRAGE DYNAMIQUE(freelance)
// Sélectionner les boutons et les cartes de freelances
const filterButtons = document.querySelectorAll('[data-filter]');
const freelanceCards = document.querySelectorAll('.freelance-card');

// Écouter le clic 
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    // Gérer les couleurs
    document.querySelector('[data-filter].active').classList.remove('active');
    button.classList.add('active');

    // Récupérer la catégorie ciblée 
    const selectedFilter = button.getAttribute('data-filter');

    // Filtrer les cartes
    freelanceCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      if (selectedFilter === 'all' || cardCategory === selectedFilter) {
        card.classList.remove('d-none'); 
      } else {
        card.classList.add('d-none');    
      }
    });
  });
});

        // FORMULAIRE DE CONTACT
const form = document.getElementById('contactForm');
const success = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
  // empêcher le rechargement de la page
  event.preventDefault();
  
  // principe que le formulaire est bon au début
  let formulaireValide = true;

  //  efface les anciens messages d'erreur et de succès
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  success.style.display = 'none';

  //  RÉCUPÉRATION DES VALEURS DES CHAMPS
  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();
  const sujet = document.getElementById('sujet').value;
  const message = document.getElementById('message').value.trim();

  //  VÉRIFICATION DU NOM
  if (nom === '') {
    document.getElementById('err-nom').textContent = "Le nom est obligatoire.";
    formulaireValide = false;
  } else if (nom.includes('0') || nom.includes('1') || nom.includes('2') || nom.includes('3') || nom.includes('4') || nom.includes('5') || nom.includes('6') || nom.includes('7') || nom.includes('8') || nom.includes('9')) {
    document.getElementById('err-nom').textContent = "Le nom ne doit pas contenir de chiffres.";
    formulaireValide = false;
  }

  //  VÉRIFICATION DU PRÉNOM
  if (prenom === '') {
    document.getElementById('err-prenom').textContent = "Le prénom est obligatoire.";
    formulaireValide = false;
  } else if (prenom.includes('0') || prenom.includes('1') || prenom.includes('2') || prenom.includes('3') || prenom.includes('4') || prenom.includes('5') || prenom.includes('6') || prenom.includes('7') || prenom.includes('8') || prenom.includes('9')) {
    document.getElementById('err-prenom').textContent = "Le prénom ne doit pas contenir de chiffres.";
    formulaireValide = false;
  }

  // 5. VÉRIFICATION DE L'EMAIL
  if (email === '') {
    document.getElementById('err-email').textContent = "L'email est obligatoire.";
    formulaireValide = false;
  } else if (!email.includes('@') || !email.includes('.')) {
    document.getElementById('err-email').textContent = "L'adresse email n'est pas valide (il manque @ ou un point).";
    formulaireValide = false;
  }

  // 6. VÉRIFICATION DU SUJET
  if (sujet === '') {
    document.getElementById('err-sujet').textContent = "Veuillez choisir un sujet dans la liste.";
    formulaireValide = false;
  }

  // 7. VÉRIFICATION DU MESSAGE
  if (message === '') {
    document.getElementById('err-message').textContent = "Le message est obligatoire.";
    formulaireValide = false;
  } else if (message.length < 20) {
    document.getElementById('err-message').textContent = "Le message est trop court (minimum 20 lettres).";
    formulaireValide = false;
  }

  // AFFICHAGE DU MESSAGE AVEC SUCCES
  if (formulaireValide === true) {
    success.style.display = 'block';
    form.reset(); // Vide le formulaire
  }
});

        