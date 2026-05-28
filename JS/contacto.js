document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;

    if (!email || !telefono) {
    alert("Por favor, completa los campos obligatorios (Correo y Teléfono).");
    return;
    }

    // Simulación de envío
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("contactForm").reset();

    // Ocultar mensaje después de 6 segundos
    setTimeout(() => {
    document.getElementById("successMessage").style.display = "none";
    }, 6000);
});


    // Verificar si el usuario está logueado
    function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const authSection = document.getElementById("auth-section");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
    }

    const logoutConst = document.getElementById("logout");
    logoutConst.addEventListener("click", function(e) {
    e.preventDefault();
    logout();
    });

    function logout() {
    if (confirm("¿Cerrar sesión?")) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
    }
    }

// Ejecutar al cargar la página
window.onload = () => {
    checkAuth();
    // Si ya tienes window.onload, combina las funciones
};