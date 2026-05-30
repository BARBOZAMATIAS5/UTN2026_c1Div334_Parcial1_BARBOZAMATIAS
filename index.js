//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    const carrito = localStorage.getItem("carrito");

    if (carrito){
        return JSON.parse(carrito);
    } else{
        return [];
    }
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    if (carrito.length === 0){ ///si carrito no tiene nada, remuevo el item (id)
        localStorage.removeItem("carrito"); 
    } else{
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let carritoAuxiliar = obtenerCarrito();
    let elementoClickeado = e.target;

    // con closest lo que hago es buscar al ancestro anterior que coincida con las etiquetas de CSS pasadas por parametro
    let producto = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");

    // obtengo el producto entonces busco con querySelector, tambien por la etiqueta de CSS el nombre y precio del producto
    let nombreProducto = producto.querySelector(".nombre-producto").textContent;
    let precioProducto = producto.querySelector(".precio-producto").textContent;
    
    //creo el objeto del producto con su nombre, precio y en cantidad le pongo 1
    const productoObjeto = 
    {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: 1
    };

    //guardo referencia del producto encontrado en el carrito
    let productoEnCarrito = carritoAuxiliar.find(producto => 
        producto.nombre === productoObjeto.nombre
    );

    // no lo encuentra, entonces lo pusheo
    if (!productoEnCarrito){
        carritoAuxiliar.push(productoObjeto);
    } else{ //lo encuentra, entonoces le subo la cantidad
        productoEnCarrito.cantidad++;
    }
    
    alert(`Un/una: ${productoObjeto.nombre} fue agregado al carrito`)
    

    guardarCarrito(carritoAuxiliar);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let carritoAuxiliar = obtenerCarrito();
    let elementoClickeado = e.target;
    
    // con closest lo que hago es buscar al ancestro anterior que coincida con las etiquetas de un selector CSS pasadas por parametro
    let producto = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");

    //solo guardo nombre del producto ya que no se va a repetir en la lista
    let nombreProducto = producto.querySelector(".nombre-producto").textContent;

    //guardo referencia (otra vez) del producto dentro del carrito
    let productoEnCarrito = carritoAuxiliar.find(producto => 
        producto.nombre === nombreProducto
    );

    //si se encuentra, le resto cantidad
    if (productoEnCarrito){
        productoEnCarrito.cantidad--;
        //si se encuentra y tiene menor o igual a 0, creo nuevamente un array sin ese objeto
        if (productoEnCarrito.cantidad <= 0){
            carritoAuxiliar = carritoAuxiliar.filter(producto => producto.nombre !== productoEnCarrito.nombre
            );
            alert(`No hay mas ${nombreProducto} en el carrito`);
        }
    } else{
        alert(`No se puede restar ${nombreProducto} porque no existe en el carrito`);
    }

    guardarCarrito(carritoAuxiliar);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});

console.log(obtenerCarrito);