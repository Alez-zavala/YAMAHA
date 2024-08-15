
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

        // Manejo del formulario
        document.getElementById('addForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Previene el envío del formulario de manera tradicional

            // Obtiene los valores del formulario
            const productName = document.getElementById('productName').value;
            const productDescription = document.getElementById('productDescription').value;
            const productFeatures = document.getElementById('productFeatures').value;
            const productImage = document.getElementById('productImage').value;
            const additionalImages = document.getElementById('additionalImages').value;
            const productPdf = document.getElementById('productPdf').value;

            // Crea un objeto del producto
            const newProduct = {
                name: productName,
                description: productDescription,
                features: productFeatures,
                image: productImage,
                additionalImages: additionalImages,
                pdf: productPdf
            };

            // Guarda el producto en el almacenamiento local
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            // Resetea el formulario
            document.getElementById('addForm').reset();

            // Opcional: Mensaje de confirmación
            alert('Producto agregado exitosamente');
        });
    