let carrito = [];
let total = 0;

function addToCart(producto, precio) {
    carrito.push({ producto, precio });
    total += precio;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function sendToWhatsApp() {
    const direccion = document.getElementById('direccion').value;
    let mensaje = 'Hola, me gustaría hacer el siguiente pedido:\n';

    carrito.forEach(item => {
        mensaje += `${item.producto} - $${item.precio.toFixed(2)}\n`;
    });

    mensaje += `Total: $${total.toFixed(2)}\n`;

    if (direccion) {
        mensaje += `Dirección: ${direccion}\n`;
    } else {
        mensaje += 'Retiro en el local.\n';
    }

    const numeroWhatsApp = '1234567890'; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
