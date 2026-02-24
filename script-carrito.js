let carrito = [];
let total = 0;

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
    let producto = { nombre, precio };
    carrito.push(producto);
    total += precio;
    alert(`Producto agregado: ${nombre}`);
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    let carritoHTML = '';
    carrito.forEach((producto) => {
        carritoHTML += `
            <div class="productoCarrito">
                <img src="images/${producto.nombre.toLowerCase().replace(/\s/g, '-')}.jpg" alt="${producto.nombre}">
                <p>${producto.nombre} - $${producto.precio}</p>
            </div>
        `;
    });

    document.getElementById('productosCarrito').innerHTML = carritoHTML;
    document.getElementById('totalCarrito').innerText = `$${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

// Función para proceder al pago (redirige a WhatsApp)
function pagar() {
    let mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n`;

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio}\n`;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;

    // Verificar si es domicilio o no
    let direccion = "";
    if (document.getElementById('direccionEntrega')) {
        direccion = document.getElementById('direccionEntrega').value;
        if (!direccion) {
            alert('Por favor ingresa una dirección para el envío.');
            return; // Detiene el flujo si no se ingresa la dirección
        }
        mensaje += `\nDirección de entrega: ${direccion}`;
    }

    let url = `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`;  // Cambia el número por el de tu WhatsApp
    window.open(url, '_blank');
}

// Función para cambiar la dirección de entrega
function cambiarDireccion() {
    let nuevaDireccion = prompt('Introduce la nueva dirección:');
    if (nuevaDireccion) {
        document.getElementById('direccionEntrega').innerText = nuevaDireccion;
    }
}
