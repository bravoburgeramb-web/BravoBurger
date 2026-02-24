let carrito = [];
let total = 0;

// Función para redirigir a la página de personalización con el producto seleccionado
function verProducto(producto) {
    // Al hacer clic en un producto, se redirige a la página de personalización con el producto seleccionado
    window.location.href = `producto.html?producto=${producto}`;
}

// Función para agregar el producto al carrito
function agregarAlCarrito() {
    // Recuperar el nombre y precio del producto
    let nombreProducto = document.getElementById('productoNombre').innerText;
    let precio = parseFloat(document.getElementById('productoDetalles').innerText.split('$')[1]);

    // Verificar si el usuario seleccionó algún extra
    let extras = '';
    if (document.getElementById('quesoExtra').checked) {
        extras += 'Queso Extra, ';
        precio += 0.50;
    }
    if (document.getElementById('tocinoExtra').checked) {
        extras += 'Tocino Extra, ';
        precio += 0.75;
    }
    if (document.getElementById('salsaExtra').checked) {
        extras += 'Salsa Extra, ';
        precio += 0.25;
    }

    // Agregar el producto con sus extras al carrito
    let producto = `${nombreProducto} - $${precio.toFixed(2)} (${extras.slice(0, -2)})`;
    carrito.push({ nombre: producto, precio: precio });
    total += precio;

    alert(`Producto agregado: ${producto}`);
    irAlMenu();
}

// Función para redirigir de vuelta al menú después de agregar al carrito
function irAlMenu() {
    window.location.href = 'menu.html';
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

    // Mostrar el carrito actualizado
    document.getElementById('productosCarrito').innerHTML = carritoHTML;
    document.getElementById('totalCarrito').innerText = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    total -= carrito.find(item => item.nombre === nombre).precio;
    actualizarCarrito();
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
    let url = `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`;  // Reemplaza con tu número de WhatsApp
    window.open(url, '_blank');
}

// Función para cambiar la dirección de entrega
function cambiarDireccion() {
    let nuevaDireccion = prompt('Introduce la nueva dirección:');
    if (nuevaDireccion) {
        document.getElementById('direccionEntrega').innerText = nuevaDireccion;
    }
}

// Función para mostrar el producto y sus opciones de personalización
function personalizarProducto(nombre, precio) {
    // Mostrar el modal de personalización
    document.getElementById('personalizacionModal').style.display = "block";
    document.getElementById('productoNombre').innerText = `Producto: ${nombre} - $${precio}`;
}

// Función para cerrar el modal de personalización
function cerrarModal() {
    document.getElementById('personalizacionModal').style.display = "none";
}

// Función para agregar un producto personalizado al carrito con los extras
function agregarAlCarritoPersonalizado(tipo) {
    let producto = document.getElementById('productoNombre').innerText.split(' - ')[0];
    let precio = parseFloat(document.getElementById('productoNombre').innerText.split('$')[1]);

    // Agregar el tipo (Original o Crispy) al nombre
    let nombreCompleto = `${producto} - ${tipo}`;

    carrito.push({ nombre: nombreCompleto, precio: precio });
    total += precio;

    alert(`Producto agregado: ${nombreCompleto} por $${precio}`);
    cerrarModal();
    actualizarCarrito();
}
