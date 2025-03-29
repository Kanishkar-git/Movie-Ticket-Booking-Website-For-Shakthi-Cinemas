let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    // Remove active and prev classes from all slides
    slides.forEach((slide) => {
        slide.classList.remove('active', 'prev');
    });

    // Add 'prev' class to the current slide before transitioning
    if (slides[currentIndex]) {
        slides[currentIndex].classList.add('prev');
    }

    // Add 'active' class to the new slide
    slides[index].classList.add('active');

    // Update the current index
    currentIndex = index;
}

function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
}

// Automatically change slides every 5 seconds
setInterval(nextSlide, 5000);

// Show the first slide initially
showSlide(currentIndex);