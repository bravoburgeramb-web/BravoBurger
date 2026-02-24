let carrito = [];
let total = 0;

function verProducto(producto) {
    window.location.href = `producto.html?producto=${producto}`;
}

function agregarAlCarrito() {
    let nombreProducto = document.getElementById('productoNombre').innerText;
    let precio = parseFloat(document.getElementById('productoDetalles').innerText.split('$')[1]);

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

    let producto = `${nombreProducto} - $${precio.toFixed(2)} (${extras.slice(0, -2)})`;
    carrito.push({ nombre: producto, precio: precio });
    total += precio;

    alert(`Producto agregado: ${producto}`);
    irAlMenu();
}

function irAlMenu() {
    window.location.href = 'menu.html';
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

// Al hacer clic en el botón "Pagar", solicitamos la dirección si es a domicilio
function pagar() {
    let mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n`;

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio}\n`;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;

    // Verificamos si es domicilio o no
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

// Función para cambiar la dirección de entrega (si el usuario seleccionó Domicilio)
function cambiarDireccion() {
    let nuevaDireccion = prompt('Introduce la nueva dirección:');
    if (nuevaDireccion) {
        document.getElementById('direccionEntrega').innerText = nuevaDireccion;
    }
}
