const API_URL = "http://localhost:8000";   // ← Cambia esto si tu backend está en otro puerto o dominio

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    const body = {
    nombre_usuario: user,
    contrasena: password
    }

    try {
    const res = await fetch (`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Error en la autenticación");
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", user);

    alert("✅ Inicio de sesión exitoso");
    window.location.href = "index.html";
    } catch (error) {
    alert("❌ Error en el login");
    errorMsg.style.display = "block";
    setTimeout(() => errorMsg.style.display = "none", 4000);
    console.error("Error en el login:", error);
    }

});