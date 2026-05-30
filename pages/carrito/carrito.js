function obtenerCarrito() 
{
    const carrito = localStorage.getItem("carrito");

    if (carrito){
        return JSON.parse(carrito);
    } else{
        return [];
    }
}

function saldoFinal(carrito){
    let valorHTML = document.getElementById("valor-final");

    const valor = carrito.reduce((acumulador, p) => {
        const precio = Number(p.precio.replace("$",""));

        return acumulador + (p.cantidad * precio);
    }, 0);
    
    valorHTML.innerHTML = `El valor final es de: $${valor}`;
}

function cargarProductosCarrito() 
{
    let carrito = obtenerCarrito();
    let tabla = document.getElementById("cuerpo-carrito");
    tabla.innerHTML = "";

    for (let i = 0; i < carrito.length; i++){
        let producto = carrito[i];
        tabla.innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
        </tr>
        `;
    };

    saldoFinal(carrito);
}

function limpiarCarrito() 
{
    if (obtenerCarrito().length > 0){
        localStorage.removeItem("carrito");
        cargarProductosCarrito();
        alert("Carrito limpiado correctamente.")
    } else{
        alert("No hay productos en el carrito.");
    }
}
// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});

cargarProductosCarrito();
