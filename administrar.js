
document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const searchBox = document.getElementById('searchBox');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayProducts(filteredProducts) {
        productList.innerHTML = '';
        if (filteredProducts.length > 0) {
            filteredProducts.forEach((product, index) => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                
                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><img src="${product.image}" alt="${product.name}" style="max-width: 100%;"></p>
                    <p><a href="detalle.html?productId=${index}">Ver Detalles</a></p>
                    <p><a href="modificar.html?productId=${index}">Editar</a></p>
                    <p><a href="#" onclick="deleteProduct(${index})">Eliminar</a></p>
                `;
                productList.appendChild(productItem);
            });
        } else {
            productList.innerHTML = '<p>No hay productos disponibles.</p>';
        }
    }

    displayProducts(products);

    searchBox.addEventListener('input', function() {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
});

function deleteProduct(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Producto eliminado exitosamente.');
        location.reload();
    }
}


// Configuración del canvas de animación de Matrix en el fondo
const matrixCanvas = document.getElementById('matrixCanvas');
const matrixCtx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const matrixCharacters = '01';
const matrixFontSize = 16;
const matrixColumns = matrixCanvas.width / matrixFontSize;
const matrixDrops = Array(Math.floor(matrixColumns)).fill(1);
let matrixColors = ['#600000', '#000060', '#400040', '#555555']; // Colores más oscuros

function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Suaviza el efecto de "desvanecimiento"
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    matrixCtx.fillStyle = '#0F0'; // Color de los números
    matrixCtx.font = `${matrixFontSize}px monospace`;

    for (let i = 0; i < matrixDrops.length; i++) {
        const text = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        const x = i * matrixFontSize;
        const y = matrixDrops[i] * matrixFontSize;

        matrixCtx.fillStyle = matrixColors[Math.floor(Math.random() * matrixColors.length)]; // Color aleatorio
        matrixCtx.fillText(text, x, y);

        if (y > matrixCanvas.height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
        }

        matrixDrops[i]++;
    }
}

function updateMatrixColors() {
    matrixColors = ['#600000', '#000060', '#400040', '#555555']; // Colores más oscuros
}

setInterval(updateMatrixColors, 5000); // Cambia los colores cada 5 segundos
setInterval(drawMatrix, 50); // Redibuja cada 50ms

window.addEventListener('resize', function() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
});
