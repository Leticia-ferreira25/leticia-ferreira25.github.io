        // --- Animação de fundo ---
        const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.speed = 1 + Math.random() * 0.5;
                this.angle = Math.random() * 360;
                this.color = ['#1c46f5', '#60a5fa'][Math.floor(Math.random() * 2)];
                this.length = 150 + Math.random() * 100;
            }
            update() {
                const radians = this.angle * Math.PI / 180;
                this.x += Math.cos(radians) * this.speed;
                this.y += Math.sin(radians) * this.speed;
                if (this.x < -this.length || this.x > width + this.length || this.y < -this.length || this.y > height + this.length) {
                    const edge = Math.floor(Math.random() * 4);
                    if (edge === 0) { this.x = Math.random() * width; this.y = -this.length; } 
                    else if (edge === 1) { this.x = width + this.length; this.y = Math.random() * height; } 
                    else if (edge === 2) { this.x = Math.random() * width; this.y = height + this.length; } 
                    else { this.x = -this.length; this.y = Math.random() * height; }
                }
            }
            draw() {
                ctx.beginPath();
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length * Math.cos(this.angle * Math.PI / 180), this.y - this.length * Math.sin(this.angle * Math.PI / 180));
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.5, this.color);
                gradient.addColorStop(1, 'transparent');
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.8;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length * Math.cos(this.angle * Math.PI / 180), this.y - this.length * Math.sin(this.angle * Math.PI / 180));
                ctx.stroke();
            }
        }

        function initCanvas() {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection || !canvas) return;
            width = canvas.width = heroSection.offsetWidth;
            height = canvas.height = heroSection.offsetHeight;
            particles = [];
            const particleCount = Math.floor((width * height) / 20000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            if(!ctx || !particles) return;
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        }
        
        // --- Ano atual no rodapé ---
        function setFooterYear() {
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        }

        // --- Lógica do Botão Voltar ao Topo ---
        function handleBackToTopButton() {
            const backToTopButton = document.getElementById('back-to-top');
            const heroSection = document.getElementById('home');

            if (!backToTopButton || !heroSection) return;

            if (window.scrollY > heroSection.offsetHeight) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        }

        // --- Inicialização ---
        window.addEventListener('resize', initCanvas);
        window.addEventListener('scroll', handleBackToTopButton);
        
        window.onload = () => {
            initCanvas();
            animateCanvas();
            setFooterYear();
            handleBackToTopButton(); // Executa uma vez no carregamento
        };
        // --- ///
        document.addEventListener('DOMContentLoaded', function () {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');// Função para alternar (mostrar/esconder) o menu móvel
        mobileMenuButton.addEventListener(&#39;click&#39;, () =&gt; {
            mobileMenu.classList.toggle(&#39;hidden&#39;);
        });
        
        // Função para fechar o menu ao clicar em um link
        mobileLinks.forEach(link =&gt; {
            link.addEventListener(&#39;click&#39;, () =&gt; {
                mobileMenu.classList.add(&#39;hidden&#39;);
            });
        });
