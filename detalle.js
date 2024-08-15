
        document.addEventListener('DOMContentLoaded', function() {
            const params = new URLSearchParams(window.location.search);
            const productId = params.get('productId');
            let products = JSON.parse(localStorage.getItem('products')) || [];

            if (productId && products[productId]) {
                const product = products[productId];
                document.getElementById('productName').textContent = product.name;
                document.getElementById('productDescription').textContent = product.description;
                document.getElementById('productFeatures').textContent = product.features;
                document.getElementById('productPdf').onclick = function() {
                    window.open(product.pdf, '_blank');
                };

                const carouselContainer = document.getElementById('carouselContainer');
                const carouselInner = document.getElementById('carouselInner');

                if (product.additionalImages.length > 0) {
                    product.additionalImages.forEach((url) => {
                        const img = document.createElement('img');
                        img.src = url;
                        img.alt = 'Imagen del producto';
                        img.addEventListener('click', () => openLightbox(url));
                        carouselInner.appendChild(img);
                    });

                    // Carousel animation
                    let currentIndex = 0;
                    const images = carouselInner.querySelectorAll('img');
                    const totalImages = images.length;

                    function showImage(index) {
                        carouselInner.style.transform = `translateX(-${index * 100}%)`; // Ancho de imagen
                    }

                    // Auto-slide
                    setInterval(() => {
                        currentIndex = (currentIndex + 1) % totalImages;
                        showImage(currentIndex);
                    }, 3000); // Cambia la imagen cada 3 segundos

                    // Mostrar solo una imagen a la vez
                    showImage(currentIndex);
                } else {
                    carouselContainer.style.display = 'none';
                }
            }

            function openLightbox(imageSrc) {
                const lightbox = document.getElementById('lightbox');
                const lightboxImage = document.getElementById('lightboxImage');
                const images = document.querySelectorAll('.carousel-inner img');
                lightboxImage.src = imageSrc;
                lightbox.style.display = 'flex';

                // Find index of the image
                let currentIndex = Array.from(images).findIndex(img => img.src === imageSrc);

                function updateLightboxImage(index) {
                    lightboxImage.src = images[index].src;
                }

                document.getElementById('closeLightbox').addEventListener('click', function() {
                    document.getElementById('lightbox').style.display = 'none';
                });

                document.getElementById('prevLightbox').addEventListener('click', function() {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    updateLightboxImage(currentIndex);
                });

                document.getElementById('nextLightbox').addEventListener('click', function() {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateLightboxImage(currentIndex);
                });
            }
        });

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
   