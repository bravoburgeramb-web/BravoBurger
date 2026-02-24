let carrito = [];
let total = 0;

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