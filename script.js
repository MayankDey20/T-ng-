document.addEventListener('DOMContentLoaded', function() {

    // --- Element Selections ---
    const starsContainer = document.getElementById('stars');
    const floatingContainer = document.getElementById('floating-container');
    const repeatingTextContainer = document.getElementById('repeating-text-container');
    const galleryContainer = document.getElementById('gallery-container');
    const galleryNavContainer = document.getElementById('gallery-nav');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const memories = document.querySelectorAll('.memory');
    const memoryJar = document.querySelector('.memory-jar');
    const envelopes = document.querySelectorAll('.envelope');
    const envelopeContents = document.querySelectorAll('.envelope-content');
    const overlay = document.getElementById('overlay'); // Keep existing overlay reference
    const closeButtons = document.querySelectorAll('.close-btn'); // Keep existing close buttons
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseContent = document.getElementById('surprise-content');
    const musicControl = document.getElementById('music-control');
    const backgroundMusic = document.getElementById('background-music');
    const hoverSound = document.getElementById('hover-sound');
    // Add references for the new cake elements
    const gifCake = document.getElementById('gif-cake');
    const svgCakeContainer = document.getElementById('svg-cake-container');
    const closeSvgCakeBtn = document.getElementById('close-svg-cake');
    // Ensure interactiveElements includes the new SVG cake container if needed for hover sounds
    const interactiveElements = document.querySelectorAll('.envelope, .gallery, .memory-jar, .surprise-btn, .music-control, .footer, .envelope-content, #repeating-text-container, #gif-cake, #svg-cake-container');


    // Surprise Gallery Element Selections
    const surpriseGalleryContainer = document.getElementById('surprise-gallery-container');
    const surpriseGalleryNavContainer = document.getElementById('surprise-gallery-nav');
    const surpriseGalleryItems = document.querySelectorAll('.surprise-gallery-item');
    const surpriseGalleryPrev = document.querySelector('.surprise-gallery-prev');
    const surpriseGalleryNext = document.querySelector('.surprise-gallery-next');


    // Envelope audio elements
    const envelopeAudios = {
        1: document.getElementById('envelope-audio-1'),
        2: document.getElementById('envelope-audio-2'),
        3: document.getElementById('envelope-audio-3'),
        4: document.getElementById('envelope-audio-4'),
    };

    // Music player elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');


    // --- State Variables ---
    let currentSlide = 0;
    let surpriseCurrentSlide = 0;
    let isMusicPlaying = false; // Assuming you might have music logic
    let galleryIntervalId = null;
    let surpriseGalleryIntervalId = null;
    let fireworksIntervalId = null;
    let svgCakeAnimationTimeout = null; // Timeout for SVG cake animations


    // --- Initializations ---

    // Create stars
    if (starsContainer) {
        // ... (keep existing star creation logic) ...
         for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            starsContainer.appendChild(star);
        }
    } else {
        console.warn("Element with ID 'stars' not found. Skipping star creation.");
    }


    // Create floating hearts/petals/balloons
    if (floatingContainer) {
        // ... (keep existing floating item logic) ...
         const floatingItemsContent = ['❤️', '🌸', '✨', '🌷', '🌹', '🎈'];
        for (let i = 0; i < 40; i++) { // Increased count for more floating items
            const item = document.createElement('div');
            item.classList.add('floating-item');
            item.textContent = floatingItemsContent[Math.floor(Math.random() * floatingItemsContent.length)];
            item.style.left = Math.random() * 100 + '%';
            item.style.top = Math.random() * 100 + '%'; // Start from anywhere
            item.style.fontSize = (Math.random() * 25 + 15) + 'px'; // Slightly larger
            item.style.animationDuration = (Math.random() * 15 + 10) + 's';
            item.style.animationDelay = (Math.random() * 5) + 's';
            floatingContainer.appendChild(item);
        }
    } else {
        console.warn("Element with ID 'floating-container' not found. Skipping floating items creation.");
    }

    // Create repeating text
    if (repeatingTextContainer) {
        // ... (keep existing repeating text logic) ...
        const textToRepeat = "Happy Birthday my love ";
        const numberOfTextElements = 5;

        for (let i = 0; i < numberOfTextElements; i++) {
            const textElement = document.createElement('div');
            textElement.classList.add('repeating-text');
            textElement.textContent = textToRepeat;
            textElement.style.left = Math.random() * 100 + '%';
            textElement.style.top = '100%'; // Start from the bottom

            const randomRotation = Math.random() * 30 - 15;
            textElement.style.setProperty('--random-rotation', `${randomRotation}deg`);
            textElement.style.animationDelay = Math.random() * 10 + 's';
            textElement.style.animationDuration = Math.random() * 20 + 15 + 's';

            repeatingTextContainer.appendChild(textElement);
        }
    } else {
        console.warn("Element with ID 'repeating-text-container' not found. Skipping repeating text creation.");
    }


    // --- Gallery Functionality (Original) ---
    if (galleryContainer && galleryItems.length > 0 && galleryNavContainer && galleryPrev && galleryNext) {
        // ... (keep existing gallery logic) ...
          // Create navigation dots
        galleryItems.forEach((_, index) => {
            const navDot = document.createElement('div');
            navDot.classList.add('gallery-nav-item');
            if (index === 0) navDot.classList.add('active');
            navDot.addEventListener('click', () => {
                changeSlide(index);
                resetGalleryInterval(); // Reset timer on manual nav
            });
            galleryNavContainer.appendChild(navDot);
        });

        function changeSlide(index) {
            if (index < 0) index = galleryItems.length - 1;
            if (index >= galleryItems.length) index = 0;

            galleryContainer.style.transform = `translateX(-${index * 100}%)`;

            document.querySelectorAll('#gallery-nav .gallery-nav-item').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentSlide = index;
        }

        galleryPrev.addEventListener('click', () => {
            changeSlide(currentSlide - 1);
            resetGalleryInterval();
        });

        galleryNext.addEventListener('click', () => {
            changeSlide(currentSlide + 1);
            resetGalleryInterval();
        });

        function startGalleryInterval() {
            galleryIntervalId = setInterval(() => {
                changeSlide(currentSlide + 1);
            }, 5000);
        }

        function resetGalleryInterval() {
            clearInterval(galleryIntervalId);
            startGalleryInterval();
        }

        startGalleryInterval();

    } else {
        console.warn("One or more original gallery elements not found. Original gallery functionality disabled.");
    }

    // --- Gallery Functionality (Surprise) ---
    if (surpriseGalleryContainer && surpriseGalleryItems.length > 0 && surpriseGalleryNavContainer && surpriseGalleryPrev && surpriseGalleryNext) {
        // ... (keep existing surprise gallery logic) ...
         function changeSurpriseSlide(index) {
            if (index < 0) index = surpriseGalleryItems.length - 1;
            if (index >= surpriseGalleryItems.length) index = 0;

            surpriseGalleryContainer.style.transform = `translateX(-${index * 100}%)`;

            document.querySelectorAll('#surprise-gallery-nav .gallery-nav-item').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            surpriseCurrentSlide = index;
        }

        surpriseGalleryPrev.addEventListener('click', () => {
            changeSurpriseSlide(surpriseCurrentSlide - 1);
            resetSurpriseGalleryInterval();
        });

        surpriseGalleryNext.addEventListener('click', () => {
            changeSurpriseSlide(surpriseCurrentSlide + 1);
            resetSurpriseGalleryInterval();
        });

        function startSurpriseGalleryInterval() {
             // Only create dots if they don't exist
             if (surpriseGalleryNavContainer.children.length === 0) {
                surpriseGalleryItems.forEach((_, index) => {
                    const navDot = document.createElement('div');
                    navDot.classList.add('gallery-nav-item');
                    if (index === 0) navDot.classList.add('active');
                    navDot.addEventListener('click', () => {
                        changeSurpriseSlide(index);
                        resetSurpriseGalleryInterval();
                    });
                    surpriseGalleryNavContainer.appendChild(navDot);
                });
            }
            clearInterval(surpriseGalleryIntervalId); // Clear previous interval if any
            surpriseGalleryIntervalId = setInterval(() => {
                changeSurpriseSlide(surpriseCurrentSlide + 1);
            }, 5000);
        }

        function resetSurpriseGalleryInterval() {
            clearInterval(surpriseGalleryIntervalId);
            startSurpriseGalleryInterval();
        }
    } else {
        console.warn("One or more surprise gallery elements not found. Surprise gallery functionality disabled.");
    }


    // --- Memory Jar Functionality ---
    if (memories.length > 0) {
        // ... (keep existing memory jar click logic) ...
         memories.forEach(memory => {
            memory.addEventListener('click', function() {
                this.classList.toggle('untied');
            });
        });
    } else {
        console.warn("Memory Jar elements (.memory) not found. Memory Jar functionality disabled.");
    }

    // --- Fireworks Functionality ---
    function createFirework(x, y) {
        // ... (keep existing fireworks creation logic) ...
         const colors = ['#ffcc00', '#ff6699', '#66ffcc', '#cc66ff', '#ffffff', '#ff9933'];

        for (let i = 0; i < 30; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 3;
            const gravity = 0.05;
            const friction = 0.98;
            const duration = Math.random() * 800 + 800;
            const size = Math.random() * 3 + 2;

            firework.style.width = size + 'px';
            firework.style.height = size + 'px';

            let velX = Math.cos(angle) * speed;
            let velY = Math.sin(angle) * speed;
            const startTime = Date.now();

            document.body.appendChild(firework);

            function animateFirework() {
                const elapsed = Date.now() - startTime;
                if (elapsed >= duration) {
                    firework.remove(); return;
                }
                const progress = elapsed / duration;
                const currentX = parseFloat(firework.style.left) + velX;
                const currentY = parseFloat(firework.style.top) + velY;
                firework.style.left = currentX + 'px';
                firework.style.top = currentY + 'px';
                velY += gravity;
                velX *= friction;
                velY *= friction;
                firework.style.opacity = 1 - progress;
                requestAnimationFrame(animateFirework);
            }
            requestAnimationFrame(animateFirework);
        }
    }

    // Create fireworks on click (avoiding interactive elements)
    document.addEventListener('click', function(e) {
        // Include the SVG cake container and close button in elements to avoid fireworks on
         if (!e.target.closest('.envelope, .gallery, .memory-jar, .surprise-btn, .music-control, .footer, .envelope-content, .surprise-gallery, #repeating-text-container, #gif-cake, #svg-cake-container, .close-svg-cake-btn')) {
            createFirework(e.clientX, e.clientY);
        }
    });


    // --- Envelope Functionality ---
    if (envelopes.length === envelopeContents.length && overlay) {
        // ... (keep existing envelope logic) ...
        function stopAllEnvelopeSounds() {
            Object.values(envelopeAudios).forEach(audio => {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            });
        }

        function openEnvelope(index) {
            stopAllEnvelopeSounds();
            const audio = envelopeAudios[index];
            if (audio) {
                audio.play().catch(error => console.error(`Error playing envelope audio ${index}:`, error));
            } else {
                console.warn(`Audio element for envelope ${index} not found.`);
            }

            overlay.classList.add('active');
            const content = document.getElementById(`envelope-content-${index}`);
            if (content) {
                content.classList.add('active');
            } else {
                 console.warn(`Content element for envelope ${index} not found.`);
            }
        }

        function closeAllEnvelopes() {
            overlay.classList.remove('active');
            envelopeContents.forEach(content => {
                content.classList.remove('active');
            });
            stopAllEnvelopeSounds();
        }

        envelopes.forEach((envelope, index) => {
            envelope.addEventListener('click', () => {
                openEnvelope(index + 1);
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', closeAllEnvelopes);
        });

        overlay.addEventListener('click', closeAllEnvelopes);

    } else {
        console.warn("Envelope elements, contents, or overlay missing. Envelope functionality disabled.");
    }


    // --- Surprise Button ---
    if (surpriseBtn && surpriseContent) {
        // ... (keep existing surprise button logic) ...
         surpriseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            surpriseContent.classList.toggle('active');
            if (surpriseContent.classList.contains('active')) {
                if (surpriseGalleryContainer && surpriseGalleryItems.length > 0) {
                    startSurpriseGalleryInterval(); // Start or restart interval
                }
            } else {
                clearInterval(surpriseGalleryIntervalId); // Stop interval when hidden
            }
        });
        document.addEventListener('click', (e) => {
             if (!surpriseBtn.contains(e.target) && !surpriseContent.contains(e.target)) {
                 surpriseContent.classList.remove('active');
                 clearInterval(surpriseGalleryIntervalId); // Stop interval when hidden
             }
        });
    } else {
        console.warn("Surprise button or content element not found.");
    }


    // --- SVG Cake Toggle ---
    if (gifCake && svgCakeContainer && closeSvgCakeBtn) {
        gifCake.addEventListener('click', () => {
            gifCake.style.opacity = '0'; // Fade out GIF
            gifCake.style.pointerEvents = 'none'; // Disable clicks on faded GIF
            svgCakeContainer.classList.add('active'); // Show SVG container

            // Start SVG animations (find the relevant <animate> elements)
            // Need to slightly delay or re-trigger SMIL animations sometimes
            clearTimeout(svgCakeAnimationTimeout); // Clear previous timeout if any
            svgCakeAnimationTimeout = setTimeout(() => {
                 // Find SMIL animations and restart them if possible/needed
                 // This is complex and browser-dependent. A simpler way is often
                 // to just ensure the animations are defined to start when displayed.
                 // The CSS animations for candles/flames should start automatically.
                 // SMIL animations might need explicit start commands if 'begin' isn't sufficient.
                 const cakeAnims = svgCakeContainer.querySelectorAll('svg animate');
                 cakeAnims.forEach(anim => {
                     // Check if beginElement exists (might not be needed if begin="indefinite" isn't used heavily)
                     if (typeof anim.beginElement === 'function') {
                         // anim.beginElement(); // Force start - Be careful with this
                     }
                 });
            }, 50); // Small delay after display change

        });

        closeSvgCakeBtn.addEventListener('click', () => {
            svgCakeContainer.classList.remove('active'); // Hide SVG container
            gifCake.style.opacity = '1'; // Fade in GIF
            gifCake.style.pointerEvents = 'auto'; // Re-enable clicks
             // Optional: Stop SMIL animations if needed (again, complex)
             clearTimeout(svgCakeAnimationTimeout); // Clear any pending animation start
        });

        // Optional: Close SVG cake if clicking outside of the SVG itself but within the container
        svgCakeContainer.addEventListener('click', (e) => {
            if (e.target === svgCakeContainer) { // Only if clicking the background container
                 closeSvgCakeBtn.click(); // Trigger the close button's logic
            }
        });

    } else {
        console.warn("GIF cake, SVG cake container, or SVG close button not found.");
    }


    // --- Music Control ---
    if (musicControl && backgroundMusic && playPauseBtn /* && other music elements */) {
        // ... (keep existing music logic) ...
        // Make sure checks for progressBarContainer, progressBar, progress are included if used
        let isPlaying = false; // Renamed from isMusicPlaying for consistency

        function togglePlay() {
            if (isPlaying) {
                backgroundMusic.pause();
                if(playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                backgroundMusic.play().catch(error => {
                    console.error("Music playback failed:", error);
                });
                if(playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        }

        document.body.addEventListener('click', function musicStarter() {
            if (!isPlaying && backgroundMusic && backgroundMusic.paused) { // Check if paused
                backgroundMusic.play().then(() => {
                    isPlaying = true;
                    if(playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    document.body.removeEventListener('click', musicStarter);
                }).catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            } else {
                 document.body.removeEventListener('click', musicStarter);
            }
        }, { once: true }); // Use { once: true } for the starter

        if(playPauseBtn) {
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });
        }

        if(backgroundMusic){
             backgroundMusic.addEventListener('timeupdate', () => {
                 const duration = backgroundMusic.duration;
                 const currentTime = backgroundMusic.currentTime;
                 if (isFinite(duration) && duration > 0 && progress) {
                      const progressPercent = (currentTime / duration) * 100;
                      progress.style.width = `${progressPercent}%`;
                 }
             });
             backgroundMusic.addEventListener('ended', () => {
                 isPlaying = false;
                 if(playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                 if(progress) progress.style.width = '0%'; // Reset progress bar
                 backgroundMusic.currentTime = 0;
             });
        }

        if(progressBarContainer){
            progressBarContainer.addEventListener('click', function(event) {
                const totalWidth = this.offsetWidth;
                const clickPosition = event.offsetX;
                 const duration = backgroundMusic ? backgroundMusic.duration : 0;
                if (isFinite(duration) && duration > 0 && backgroundMusic) {
                    const seekTime = (clickPosition / totalWidth) * duration;
                    backgroundMusic.currentTime = seekTime;
                     if (!isPlaying) togglePlay(); // Start playing if paused
                }
            });
        }

        if(prevBtn && backgroundMusic) {
             prevBtn.addEventListener('click', () => {
                 backgroundMusic.currentTime = 0;
                  if (!isPlaying) togglePlay(); // Start playing if paused
             });
        }

        if(nextBtn && backgroundMusic) {
            nextBtn.addEventListener('click', () => {
                 // Go to end, which triggers the 'ended' event handler
                backgroundMusic.currentTime = backgroundMusic.duration - 0.1;
            });
        }

    } else {
        console.warn("Music control elements or background audio element not found.");
    }


    // --- Hover Sounds ---
    if (hoverSound) {
        // ... (keep existing hover sound logic) ...
          interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (hoverSound.readyState >= 2 && window.getComputedStyle(element).display !== 'none') {
                    hoverSound.volume = 0.5;
                    hoverSound.currentTime = 0;
                    hoverSound.play().catch(e => {});
                }
            });
        });
    } else {
        console.warn("Hover sound element not found.");
    }


}); // End DOMContentLoaded