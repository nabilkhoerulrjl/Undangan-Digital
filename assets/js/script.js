        // Envelope Animation
        document.getElementById('envelopeElement').addEventListener('click', function() {
            // Add open class for animation
            this.classList.add('open');
            
            // Hide envelope and show main content after animation
            setTimeout(() => {
                document.getElementById('envelope').style.transform = 'translateY(-100%)';
                
                // Show main content with fade in effect
                const mainContent = document.getElementById('mainContent');
                mainContent.style.display = 'block';
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    
                    // Set first section as active
                    document.querySelector('.section').classList.add('active');
                }, 100);
                
                // Play birthday song
                document.getElementById('birthdayAudio').play();
            }, 1000);
        });
        
        // Countdown Timer
        function updateCountdown() {
            const eventDate = new Date('August 10, 2025 15:00:00 GMT+0700');
            const now = new Date();
            const diff = eventDate - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initialize countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Carousel functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            // Ensure index is within bounds
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            // Update carousel position
            document.getElementById('carouselInner').style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
        
        // Previous button
        document.getElementById('prevBtn').addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        // Indicator clicks
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // Auto slide change
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Send wishes via WhatsApp
        document.getElementById('sendWish').addEventListener('click', function() {
            const name = document.getElementById('name').value || 'Teman';
            const message = document.getElementById('message').value;
            
            if (message.trim() === '') {
                alert('Silakan tulis ucapan terlebih dahulu');
                return;
            }
            
            const text = `Halo, saya ${name}. Saya mengucapkan selamat ulang tahun untuk Nazriel M Ilham yang ke-7. ${message}`;
            const encodedText = encodeURIComponent(text);
            window.open(`https://web.whatsapp.com/6289658553591?text=${encodedText}`, '_blank');
        });
        
        // Music player toggle
        const musicPlayer = document.getElementById('musicPlayer');
        const audio = document.getElementById('birthdayAudio');
        
        musicPlayer.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                this.style.background = 'rgba(0, 162, 255, 0.9)';
            } else {
                audio.pause();
                this.style.background = 'rgba(255, 255, 255, 0.9)';
            }
        });
        
        // Scroll animations with Intersection Observer
        const sections = document.querySelectorAll('.section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });