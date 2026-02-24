/* Carrito de Compras */
let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio, cantidad = 1) {
    let producto = { nombre, precio, cantidad };
    carrito.push(producto);
    total += precio * cantidad;

    alert(`Producto agregado: ${nombre} - $${precio}`);
    actualizarCarrito();
}

function actualizarCarrito() {
    let carritoHTML = '';
    carrito.forEach((producto) => {
        carritoHTML += `
            <div class="productoCarrito">
                <img src="images/${producto.nombre.toLowerCase().replace(/\s/g, '-')}.jpg" alt="${producto.nombre}">
                <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
            </div>
        `;
    });

    document.getElementById('productosCarrito').innerHTML = carritoHTML;
    document.getElementById('totalCarrito').innerText = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    total -= carrito.find(item => item.nombre === nombre).precio;
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function pagar() {
    let mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n`;

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio} x ${item.cantidad}\n`;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;
    let url = `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`;  // Reemplaza con tu número de WhatsApp
    window.open(url, '_blank');
}

function cambiarDireccion() {
    let nuevaDireccion = prompt('Introduce la nueva dirección:');
    if (nuevaDireccion) {
        document.getElementById('direccionEntrega').innerText = nuevaDireccion;
    }
}

function personalizarProducto(nombre, precio) {
    // Abre el modal de personalización
    document.getElementById('personalizacionModal').style.display = "block";
    document.getElementById('productoNombre').innerText = `Producto: ${nombre} - $${precio}`;
}

function agregarAlCarritoPersonalizado(tipo) {
    let producto = document.getElementById('productoNombre').innerText.split(' - ')[0];
    let precio = parseFloat(document.getElementById('productoNombre').innerText.split('$')[1]);

    let nombreCompleto = `${producto} - ${tipo}`;

    carrito.push({ nombre: nombreCompleto, precio: precio });
    total += precio;

    alert(`Producto agregado: ${nombreCompleto} por $${precio}`);
    cerrarModal();
    actualizarCarrito();
}

function cerrarModal() {
    document.getElementById('personalizacionModal').style.display = "none";
}
