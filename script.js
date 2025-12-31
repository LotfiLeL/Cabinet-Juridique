const signupForm = document.getElementById("signupForm");
const signupPage = document.getElementById("signupPage");
const mainWebsite = document.getElementById("mainWebsite");
const loginLink = document.getElementById("loginLink");

// Gestion de la soumission du formulaire
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Récupérer les données du formulaire
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    consultationType: e.target.consultationType.value,
    message: e.target.message.value,
  };

  try {
    // Envoyer les données au backend
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // Animation de transition
      signupPage.style.opacity = "0";
      signupPage.style.transform = "scale(0.95)";
      signupPage.style.transition = "all 0.5s ease";

      setTimeout(() => {
        signupPage.style.display = "none";
        mainWebsite.style.display = "block";
        mainWebsite.style.opacity = "0";

        setTimeout(() => {
          mainWebsite.style.opacity = "1";
          mainWebsite.style.transition = "opacity 0.5s ease";
        }, 50);
      }, 500);
    } else {
      alert("Erreur lors de l'inscription: " + data.message);
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Erreur de connexion au serveur");
  }
});

// Lien de connexion (simulation)
loginLink.addEventListener("click", function (e) {
  e.preventDefault();
  signupPage.style.display = "none";
  mainWebsite.style.display = "block";
  mainWebsite.style.opacity = "1";
});

// Fonction de déconnexion
function logout() {
  mainWebsite.style.opacity = "0";
  mainWebsite.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    mainWebsite.style.display = "none";
    signupPage.style.display = "flex";
    signupPage.style.opacity = "0";
    signupPage.style.transform = "scale(0.95)";

    setTimeout(() => {
      signupPage.style.opacity = "1";
      signupPage.style.transform = "scale(1)";
      signupPage.style.transition = "all 0.5s ease";
    }, 50);
  }, 500);
}

// Scroll vers la section contact
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Smooth scroll pour les liens de navigation
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});
