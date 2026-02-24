let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    let producto = { nombre, precio };
    carrito.push(producto);
    total += precio;
    alert(`Producto agregado: ${nombre}`);
    actualizarCarrito();
}

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

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function pagar() {
    let mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n`;

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio}\n`;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;
    let url = `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`;  // Reemplaza con tu número de WhatsApp
    window.open(url, '_blank');
}