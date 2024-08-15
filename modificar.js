
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

        window.addEventListener('resize', () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        });

        // Cargar el producto a editar
        document.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('productId');
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products[productId];

            if (product) {
                document.getElementById('productName').value = product.name;
                document.getElementById('productDescription').value = product.description;
                document.getElementById('productFeatures').value = product.features;
                document.getElementById('productImage').value = product.image;
                document.getElementById('additionalImages').value = product.additionalImages.join(',');
                document.getElementById('productPdf').value = product.pdf;
            }
        });

        document.getElementById('modifyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('productId');
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products[productId];

            if (product) {
                product.name = document.getElementById('productName').value;
                product.description = document.getElementById('productDescription').value;
                product.features = document.getElementById('productFeatures').value;
                product.image = document.getElementById('productImage').value;
                product.additionalImages = document.getElementById('additionalImages').value.split(',');
                product.pdf = document.getElementById('productPdf').value;
                localStorage.setItem('products', JSON.stringify(products));
                alert('Cambios guardados exitosamente.');
                window.location.href = 'administrar.html'; // Redirige a la página de administrar productos
            }
        });
    