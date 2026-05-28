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