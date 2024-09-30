let currentItemIndex = 0;

function abrirItems(id) {
    var itemContainer = document.getElementById(id);
    if (itemContainer.classList.contains('show')) {
        itemContainer.classList.remove('show');
        setTimeout(() => {
            itemContainer.style.display = 'none';
        }, 300);
    } else {
        ocultarItems();
        itemContainer.style.display = 'block';
        setTimeout(() => {
            itemContainer.classList.add('show');
        }, 10);
    }
} 

function ocultarItems() {
    var itemContainers = document.querySelectorAll('.item-container');
    itemContainers.forEach(itemContainer => {
        if (itemContainer.classList.contains('show')) {
            itemContainer.classList.remove('show');
            setTimeout(() => {
                itemContainer.style.display = 'none';
            }, 300);
        }
    });
} 

function enviarFormulario(event, containerId) {
    event.preventDefault(); // Evitar el envío del formulario
    const container = document.getElementById(containerId);
    const formData = new FormData(container.querySelector('form'));
    console.log('Datos enviados desde ' + containerId + ':', Object.fromEntries(formData.entries()));
    container.classList.remove('show'); // Ocultar el contenedor después de enviar
    setTimeout(() => {
        container.style.display = 'none';
    }, 300);
    return false; // Para evitar el envío real del formulario
}

const sliderButton = document.getElementById('sliderButton');
let isDragging = false;
let startX = 0;
let startLeft = 0; 

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    startLeft = parseInt(getComputedStyle(sliderButton).left, 10);
    sliderButton.style.transition = 'none'; 
}

function drag(e) {
    if (!isDragging) return;
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const dx = x - startX;
    sliderButton.style.left = `${startLeft + dx}px`;
}

function endDrag() {
    isDragging = false;
    sliderButton.style.transition = 'left 0.3s ease';
    const leftPosition = parseInt(sliderButton.style.left, 10);
    const itemCount = 10; // Cambiar según la cantidad de ítems
    const itemWidth = 50; // Ancho del item (ajustar según necesidad)
    currentItemIndex = Math.min(Math.max(Math.round(leftPosition / itemWidth), 0), itemCount - 1);
    console.log('Ítem actual:', currentItemIndex);
    sliderButton.style.left = `${currentItemIndex * itemWidth}px`; // Posicionar el slider en el índice actual
}

sliderButton.addEventListener('mousedown', startDrag);
sliderButton.addEventListener('touchstart', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);
document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
