let carritoGlobal = []; //let para que se vaya modificando, con const no me deja si no, eliminar

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
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (carrito.length === 0){ ///si carrito no tiene nada, remuevo el item (id)
        localStorage.removeItem("carrito"); 
    }
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    
    // recien me doy cuenta que solo agarre li-hamburguesa (osea las hamburguesas) jaaa
    let producto = elementoClickeado.closest(".li-hamburguesa");
    let nombreProducto = producto.querySelector(".nombre-producto").textContent;
    let precioProducto = producto.querySelector(".precio-producto").textContent;
    
    const productoObjeto = 
    {
        nombre: nombreProducto,
        precio: precioProducto,
        cantidad: 1
    };

    //guardo referencia del producto encontrado en el carrito
    let productoEnCarrito = carritoGlobal.find(producto => 
        producto.nombre === productoObjeto.nombre
    );

    // no lo encuentra, entonces lo pusheo
    if (!productoEnCarrito){
        carritoGlobal.push(productoObjeto);
    } else{ //lo encuentra, entonoces le subo la cantidad
        productoEnCarrito.cantidad++;
    }
    
    alert(`Un/una: ${productoObjeto} fue agregado al carrito`)
    

    guardarCarrito(carritoGlobal);
}



function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    
    // recien me doy cuenta que solo agarre li-hamburguesa (osea las hamburguesas) jaaa

    let producto = elementoClickeado.closest(".li-hamburguesa");
    let nombreProducto = producto.querySelector(".nombre-producto").textContent;

    //guardo referencia (otra vez) del producto dentro del carrito
    let productoEnCarrito = carritoGlobal.find(producto => 
        producto.nombre === nombreProducto
    );

    //si se encuentra, le resto cantidad
    if (productoEnCarrito){
        productoEnCarrito.cantidad--;
        //si se encuentra y tiene menor o igual a 0, creo nuevamente un array sin ese objeto
        if (productoEnCarrito.cantidad <= 0 || !productoEnCarrito){
            carritoGlobal = carritoGlobal.filter(producto => producto.nombre != productoEnCarrito.nombre
            );
            alert(`No hay mas ${nombreProducto} en el carrito`);
        }
    }

    guardarCarrito(carritoGlobal);
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