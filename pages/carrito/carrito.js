function obtenerCarrito() 
{
    const carrito = localStorage.getItem("carrito");

    if (carrito){
        return JSON.parse(carrito);
    } else{
        return [];
    }
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
}

function limpiarCarrito() 
{

}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});

cargarProductosCarrito();
console.log(obtenerCarrito());