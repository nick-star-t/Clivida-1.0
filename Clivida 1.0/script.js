// Alternar modo escuro
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
  document.getElementById("darkToggle").textContent = isDark ? "☀️" : "🌙";
});

// Restaurar modo escuro salvo
window.addEventListener("load", () => {
  const savedDark = localStorage.getItem("darkMode") === "true";
  if (savedDark) {
    document.body.classList.add("dark-mode");
    document.getElementById("darkToggle").textContent = "☀️";
  }
  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) document.getElementById("profilePhoto").src = savedPhoto;
});

// Atualizar foto de perfil
document.getElementById("uploadPhoto").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const photo = e.target.result;
      document.getElementById("profilePhoto").src = photo;
      localStorage.setItem("profilePhoto", photo);
    };
    reader.readAsDataURL(file);
  }
});
