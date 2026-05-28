const API_URL = "http://localhost:8000";   // ← Cambia según tu backend

// Cargar todos los departamentos
async function cargarDepartamentos() {
    try {
        const res = await fetch(`${API_URL}/departamentos`);
        const departamentos = await res.json();

        const tbody = document.querySelector("#tabla-departamentos tbody");
        tbody.innerHTML = "";

        departamentos.forEach(dep => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${dep.id}</td>
            <td><strong>${dep.nombre}</strong></td>
            <td>${dep.descripcion || '-'}</td>
            <td>
                <button class="btn btn-edit" onclick="editarDepartamento(${dep.id})">Editar</button>
                <button class="btn btn-delete" onclick="eliminarDepartamento(${dep.id})">Eliminar</button>
            </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        alert("Error al cargar departamentos: " + error.message);
    }
}

// Enviar formulario (Crear o Actualizar)
document.getElementById("form-departamento").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("dep-id").value;
    const departamento = {
    nombre: document.getElementById("dep-nombre").value,
    descripcion: document.getElementById("dep-descripcion").value
    };

    try {
    let res;
    if (id) {
        // Actualizar
        res = await fetch(`${API_URL}/departamentos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departamento)
        });
    } else {
        // Crear
        res = await fetch(`${API_URL}/departamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departamento)
        });
    }

    if (res.ok) {
        alert(id ? "Departamento actualizado correctamente" : "Departamento creado correctamente");
        cargarDepartamentos();
        resetFormulario();
    } else {
        alert("Error al guardar el departamento");
    }
    } catch (error) {
    alert("Error: " + error.message);
    }
});

// Editar departamento
async function editarDepartamento(id) {
    try {
    const res = await fetch(`${API_URL}/departamentos/${id}`);
    const dep = await res.json();

    document.getElementById("dep-id").value = dep.id;
    document.getElementById("dep-nombre").value = dep.nombre;
    document.getElementById("dep-descripcion").value = dep.descripcion || "";

    document.getElementById("form-titulo").textContent = "Editar Departamento";
    } catch (error) {
    alert("Error al cargar datos del departamento");
    }
}

// Eliminar departamento
async function eliminarDepartamento(id) {
    if (!confirm("¿Estás seguro de eliminar este departamento?")) return;

    try {
    await fetch(`${API_URL}/departamentos/${id}`, { method: "DELETE" });
    alert("Departamento eliminado");
    cargarDepartamentos();
    } catch (error) {
    alert("Error al eliminar el departamento");
    }
}

// Resetear formulario
function resetFormulario() {
    document.getElementById("form-departamento").reset();
    document.getElementById("dep-id").value = "";
    document.getElementById("form-titulo").textContent = "Crear Nuevo Departamento";
}


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
    cargarDepartamentos();
    // Si ya tienes window.onload, combina las funciones
};