// ==================== CONFIGURACIÓN ====================
const API_URL = "http://localhost:8000";   // ← Cambia esto si tu backend está en otro puerto o dominio

// ==================== CARGAR EMPLEADOS ====================
async function cargarEmpleados() {
    try {
    const res = await fetch(`${API_URL}/empleados`);
    if (!res.ok) throw new Error("Error al obtener empleados");
    
    const empleados = await res.json();
    const tbody = document.querySelector("#tabla-empleados tbody");
    tbody.innerHTML = "";

    empleados.forEach(emp => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${emp.id || '-'}</td>
        <td>${emp.nombre}</td>
        <td>${emp.primerApellido || ''} ${emp.segundoApellido || ''}</td>
        <td>${emp.genero || '-'}</td>
        <td>${emp.telefono || '-'}</td>
        <td>${emp.salario ? Number(emp.salario).toFixed(2) + ' €' : '-'}</td>
        <td>
            <button class="btn btn-edit" onclick="editarEmpleado(${emp.id})">Editar</button>
            <button class="btn btn-delete" onclick="eliminarEmpleado(${emp.id})">Eliminar</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
    } catch (err) {
    console.error(err);
    alert("No se pudo conectar con el backend.\nVerifica que esté corriendo en " + API_URL);
    }
}

// ==================== ENVIAR EMPLEADO (POST / PUT) ====================
document.getElementById("form-empleado").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("emp-id").value;

    const empleado = {
        nombre: document.getElementById("emp-nombre").value,
        primer_apellido: document.getElementById("emp-primer-ap").value,
        segundo_apellido: document.getElementById("emp-segundo-ap").value || null,
        genero: document.getElementById("emp-genero").value,
        telefono: document.getElementById("emp-telefono").value || null,
        numero_seguridad_social: document.getElementById("emp-nss").value,
        salario: parseFloat(document.getElementById("emp-salario").value) || 0,
        fecha_nacimiento: document.getElementById("emp-fecha-nac").value || null,
        correo_electronico: document.getElementById("emp-email").value || null,
        dni: document.getElementById("emp-dni").value || null,
        foto_perfil: " "
    };

    try {
    let res;
    if (id) {
        // Actualizar
        res = await fetch(`${API_URL}/empleados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado)
        });
    } else {
        // Crear nuevo
        res = await fetch(`${API_URL}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleado)
        });
    }

    const data = await res.json();

    if (res.ok) {
        alert(id ? "✅ Empleado actualizado correctamente" : "✅ Empleado creado correctamente");
        cargarEmpleados();
        resetFormulario();
    } else {
        alert("❌ Error: " + (data.error || data.message || "No se pudo guardar"));
    }
    } catch (err) {
        console.error(err);
        alert("❌ No se pudo conectar con el servidor. Verifica que el backend esté corriendo.");
    }
});

// ==================== FUNCIONES AUXILIARES ====================
async function editarEmpleado(id) {
    try {
        const res = await fetch(`${API_URL}/empleados/${id}`);
        const emp = await res.json();

        document.getElementById("emp-id").value = emp.id;
        document.getElementById("emp-nombre").value = emp.nombre;
        document.getElementById("emp-primer-ap").value = emp.primerApellido;
        document.getElementById("emp-segundo-ap").value = emp.segundoApellido || "";
        document.getElementById("emp-genero").value = emp.genero;
        document.getElementById("emp-telefono").value = emp.telefono || "";
        document.getElementById("emp-nss").value = emp.nroSeguridadSocial;
        document.getElementById("emp-salario").value = emp.salario || "";
        document.getElementById("emp-fecha-nac").value = emp.fechaNacimiento || "";
        document.getElementById("emp-email").value = emp.correoElectronico || "";
        document.getElementById("emp-dni").value = emp.dni || "";

        document.getElementById("form-titulo").textContent = "Editar Empleado";
    } catch (err) {
        alert("Error al cargar empleado");
    }
}

async function eliminarEmpleado(id) {
    if (!confirm("¿Eliminar este empleado?")) return;
    
    try {
    await fetch(`${API_URL}/empleados/${id}`, { method: "DELETE" });
    alert("Empleado eliminado");
    cargarEmpleados();
    } catch (err) {
    alert("Error al eliminar");
    }
}

function resetFormulario() {
    document.getElementById("form-empleado").reset();
    document.getElementById("emp-id").value = "";
    document.getElementById("form-titulo").textContent = "Registrar Nuevo Empleado";
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
    cargarEmpleados();
    // Si ya tienes window.onload, combina las funciones
};