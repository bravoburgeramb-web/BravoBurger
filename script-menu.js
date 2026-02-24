function seleccionarOpcion(opcion) {
    if (opcion === 'domicilio') {
        // Redirigir a la página de dirección para domicilio
        window.location.href = 'domicilio.html';
    } else if (opcion === 'recoger') {
        // Redirigir al menú para recoger en el local
        window.location.href = 'menu.html';
    }
}