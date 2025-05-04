// Slider functionality
let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = 3;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function moveSlide(direction) {
    currentSlide = (currentSlide + direction + slides) % slides;
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

function updateDots() {
    const mobileDots = document.querySelectorAll('.mobile-dot');
    const desktopDots = document.querySelectorAll('.desktop-dot');
    
    // mobile dots
    mobileDots.forEach((dot, index) => {
        dot.classList.toggle('bg-[#D4AF37]', index === currentSlide);
        dot.classList.toggle('bg-gray-400', index !== currentSlide);
    });
    
    // desktop dots
    desktopDots.forEach((dot, index) => {
        dot.classList.toggle('bg-[#D4AF37]', index === currentSlide);
        dot.classList.toggle('bg-gray-400', index !== currentSlide);
    });
}

// Optional: Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);

// Burger menu functionality
const burgerMenu = document.getElementById('burger-menu');
const mobileMenu = document.getElementById('mobile-menu');

burgerMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Toggle burger icon
    const burgerIcon = burgerMenu.querySelector('i');
    burgerIcon.classList.toggle('fa-bars');
    burgerIcon.classList.toggle('fa-times');
});

// Service content data
const serviceData = [
    {
        title: "GOVERNANCE ADVISORY",
        description: "The investment offices and Endowment funds for HNWI, Family Offices, and Endowments are a strategic vehicle for enterprising stakeholders to achieve their important goals, from wealth building to talent development to social impact among others.",
        image: "images/assist1.png"
    },
    {
        title: "WEALTH PLANNING",
        description: "we differentiate ourselves through an innovative approach to wealth governance that prioritizes customization, strategic alignment, and sustainable outcomes. We recognize that each client, whether an HNWI, Family Office, or Endowment, presents unique challenges and aspirations.",
        image: "images/assist2.png"
    },
    {
        title: "STRATEGIC INVESTMENT ADVISORY",
        description: "Based on the client investment policy statement and asset class objectives, criteria, and benchmark we start our due diligence process to choose the right investment manager who will manage the strategy, our focus is to choose the right managers who can lead the process efficiently and on reasonable management cost structure.",
        image: "images/assist3.png"
    },
    {
        title: "CIO OFFICE SERVICES",
        description: "It is important to start the initial discussion with the clients to understand their long-term needs and objectives of the investment management process and management style, our CIO office services offer HNWI, Family Offices, and Endowments a complete investment office outsourcing solutions ",
        image: "images/assist4.png"
    }
];

// Function to update content
function updateServiceContent(index) {
    const contentContainer = document.getElementById('serviceContent');
    const data = serviceData[index];
    
    // Update desktop content (unchanged from original)
    if (window.innerWidth >= 1024) {
        contentContainer.innerHTML = `
            <div class="absolute inset-0">
                <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover object-top"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                <div class="flex flex-col">
                    <div class="max-w-xl">
                        <h3 class="text-xl sm:text-2xl md:text-3xl font-neue-extrabold mb-2 md:mb-4">${data.title}</h3>
                        <p class="text-[1rem] font-['Poppins'] text-white">${data.description}</p>
                    </div>
                    <div class="flex justify-end mt-4">
                        <button class="text-[#D4AF37] font-neue-bold text-sm hover:opacity-80 transition-all">Read More</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Update mobile image content
    if (window.innerWidth < 1024) {
        const mobileImage = document.querySelector('.block.lg\\:hidden.mb-6 img');
        const mobileTitle = document.querySelector('.block.lg\\:hidden.mb-6 h3');
        const mobileDesc = document.querySelector('.block.lg\\:hidden.mb-6 p');
        
        if (mobileImage && mobileTitle && mobileDesc) {
            mobileImage.src = data.image;
            mobileTitle.textContent = data.title;
            mobileDesc.textContent = data.description;
        }
    }

    // Update active button state
    document.querySelectorAll('.service-btn').forEach((btn, i) => {
        if (i === index) {
            btn.classList.remove('bg-[#1a1f2e]');
            btn.classList.add('bg-[#D4AF37]');
        } else {
            btn.classList.remove('bg-[#D4AF37]');
            btn.classList.add('bg-[#1a1f2e]');
        }
    });
}

// Add click event listeners to buttons
document.querySelectorAll('.service-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        updateServiceContent(index);
    });
});

// Initialize with first content
document.addEventListener('DOMContentLoaded', () => {
    updateServiceContent(0);
});

// Mobile metrics slider variables
let currentMobileMetricsSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
const mobileMetricsSlides = 3;
let mobileSwiping = false;
let mobileSliderLock = false;

// Mobile metrics slider functionality
function goToMobileMetricsSlide(slideIndex) {
    if (mobileSliderLock) return; // Prevent changing slides while animation is in progress
    mobileSliderLock = true;
    
    // Fade out current slide
    const metrics = document.querySelectorAll('#mobile-metrics-slider > div');
    metrics.forEach(metric => {
        metric.style.opacity = '0';
    });
    
    // Wait for fade out animation to complete
    setTimeout(() => {
        currentMobileMetricsSlide = slideIndex;
        updateMobileMetricsDots();
        
        // Load appropriate content for the current slide
        const slideContents = [
            // Slide 1 metrics
            [
                { value: "650.0 M$", label: "Assets Under<br/>Advisory" },
                { value: "1,300.0", label: "The average client's<br/>portfolio return" },
                { value: "8.0", label: "Family<br/>Constitutions" }
            ],
            // Slide 2 metrics
            [
                { value: "24.7%", label: "Annual Growth<br/>Rate" },
                { value: "42", label: "Satisfied<br/>Clients" },
                { value: "15+", label: "Years of<br/>Experience" }
            ],
            // Slide 3 metrics
            [
                { value: "5", label: "Global<br/>Offices" },
                { value: "97%", label: "Client<br/>Retention" },
                { value: "25+", label: "Industry<br/>Awards" }
            ]
        ];
        
        // Update the metrics with the current slide content
        slideContents[slideIndex].forEach((metric, index) => {
            if (metrics[index]) {
                const valueSpan = metrics[index].querySelector('span');
                const labelP = metrics[index].querySelector('p');
                
                if (valueSpan) valueSpan.innerHTML = metric.value;
                if (labelP) labelP.innerHTML = metric.label;
            }
        });
        
        // Fade in new slide
        setTimeout(() => {
            metrics.forEach(metric => {
                metric.style.opacity = '1';
            });
            mobileSliderLock = false;
        }, 50);
    }, 300);
}

function updateMobileMetricsDots() {
    const dots = document.querySelectorAll('.mobile-metrics-dot');
    
    dots.forEach((dot, index) => {
        if (index === currentMobileMetricsSlide) {
            dot.classList.remove('bg-white', 'opacity-30');
            dot.classList.add('bg-[#D4AF37]');
        } else {
            dot.classList.remove('bg-[#D4AF37]');
            dot.classList.add('bg-white', 'opacity-30');
        }
    });
}

// Setup touch event listeners for swiping
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('mobile-metrics-slider');
    if (!slider) return;
    
    // Touch start event
    slider.addEventListener('touchstart', (e) => {
        if (mobileSliderLock) return;
        touchStartX = e.changedTouches[0].screenX;
        mobileSwiping = true;
        
        // Pause the auto-advance when user starts interacting
        clearInterval(mobileMetricsInterval);
    }, {passive: true});
    
    // Touch end event
    slider.addEventListener('touchend', (e) => {
        if (!mobileSwiping || mobileSliderLock) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleMobileSwipe();
        mobileSwiping = false;
        
        // Restart auto-advance timer after user interaction
        mobileMetricsInterval = setInterval(() => {
            if (!mobileSwiping && !mobileSliderLock) {
                const nextSlide = (currentMobileMetricsSlide + 1) % mobileMetricsSlides;
                goToMobileMetricsSlide(nextSlide);
            }
        }, 5000);
    }, {passive: true});
    
    // Initialize mobile dots
    document.querySelectorAll('.mobile-metrics-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!mobileSliderLock) {
                goToMobileMetricsSlide(index);
                
                // Reset auto-advance timer
                clearInterval(mobileMetricsInterval);
                mobileMetricsInterval = setInterval(() => {
                    if (!mobileSwiping && !mobileSliderLock) {
                        const nextSlide = (currentMobileMetricsSlide + 1) % mobileMetricsSlides;
                        goToMobileMetricsSlide(nextSlide);
                    }
                }, 5000);
            }
        });
    });
});

function handleMobileSwipe() {
    const swipeThreshold = 50; // Minimum distance to register as a swipe
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped left -> next slide
        const nextSlide = (currentMobileMetricsSlide + 1) % mobileMetricsSlides;
        goToMobileMetricsSlide(nextSlide);
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped right -> previous slide
        const prevSlide = (currentMobileMetricsSlide - 1 + mobileMetricsSlides) % mobileMetricsSlides;
        goToMobileMetricsSlide(prevSlide);
    }
}

// Auto-advance the mobile slider
let mobileMetricsInterval = setInterval(() => {
    if (!mobileSwiping && !mobileSliderLock) {
        const nextSlide = (currentMobileMetricsSlide + 1) % mobileMetricsSlides;
        goToMobileMetricsSlide(nextSlide);
    }
}, 5000);

// Initialize first slide
document.addEventListener('DOMContentLoaded', () => {
    const metrics = document.querySelectorAll('#mobile-metrics-slider > div');
    if (metrics.length > 0) {
        metrics.forEach(metric => {
            metric.style.opacity = '1';
        });
    }
});

// Dropdown functionality
function toggleDropdown(element) {
    // Prevent the click from propagating to the parent link
    event.stopPropagation();
    
    // Toggle the dropdown content
    const dropdownContent = element.parentElement.nextElementSibling;
    dropdownContent.classList.toggle('hidden');
    
    // Toggle the arrow rotation
    element.classList.toggle('rotate-180');
}

// Close all dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.contains(event.target)) {
        const dropdowns = mobileMenu.querySelectorAll('.group > div + div');
        const arrows = mobileMenu.querySelectorAll('.group > div i');
        
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
        
        arrows.forEach(arrow => {
            arrow.classList.remove('rotate-180');
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the parent div containing this toggle button
            const parentDiv = this.closest('div.border-b');
            // Find the dropdown content within this parent
            const content = parentDiv.querySelector('.dropdown-content');
            // Toggle display
            content.classList.toggle('hidden');
            // Toggle icon
            const icon = this.querySelector('i');
            if (content.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
});
let currentMetricsSlide = 0;
const metricsSlides = 3; // Total number of slides
let isSliding = false; // Flag to prevent multiple rapid clicks

function updateMetricsSlider() {
    const slider = document.getElementById('metrics-slider');
    if (!slider) return;
    
    // Simple 100% width translation - each slide is 100% wide
    slider.style.transform = `translateX(-${currentMetricsSlide * 100}%)`;
    
    updateMetricsDots();
}

function moveMetricsSlide(direction) {
    if (isSliding) return; // Prevent rapid clicking
    isSliding = true;
    
    currentMetricsSlide = (currentMetricsSlide + direction + metricsSlides) % metricsSlides;
    updateMetricsSlider();
    
    // Reset auto-slide timer when manually navigating
    clearInterval(metricsInterval);
    metricsInterval = setInterval(() => {
        if (!isSliding) moveMetricsSlide(1);
    }, 5000);
    
    // Allow clicking again after transition completes
    setTimeout(() => {
        isSliding = false;
    }, 500);
}

function goToMetricsSlide(slideIndex) {
    if (isSliding) return; // Prevent rapid clicking
    isSliding = true;
    
    currentMetricsSlide = slideIndex;
    updateMetricsSlider();
    
    // Reset auto-slide timer when manually navigating
    clearInterval(metricsInterval);
    metricsInterval = setInterval(() => {
        if (!isSliding) moveMetricsSlide(1);
    }, 5000);
    
    // Allow clicking again after transition completes
    setTimeout(() => {
        isSliding = false;
    }, 500);
}

function updateMetricsDots() {
    const dots = document.querySelectorAll('.metrics-dot');
    dots.forEach((dot, index) => {
        if (index === currentMetricsSlide) {
            dot.classList.remove('bg-gray-400');
            dot.classList.add('bg-[#D4AF37]');
        } else {
            dot.classList.remove('bg-[#D4AF37]');
            dot.classList.add('bg-gray-400');
        }
    });
}

// Auto-slide every 5 seconds
let metricsInterval = setInterval(() => {
    if (!isSliding) moveMetricsSlide(1);
}, 5000);

// Initialize slider and handle resize
window.addEventListener('resize', updateMetricsSlider);
document.addEventListener('DOMContentLoaded', () => {
    updateMetricsSlider();
});

// Board of Directors Section
let currentDirectorSlide = 0;
const directorSlides = 3;

function updateDirectorsSlider() {
    const slider = document.getElementById('directors-slider');
    slider.style.transform = `translateX(-${currentDirectorSlide * 100}%)`;
    updateDirectorDots();
}

function moveDirectorsSlide(direction) {
    currentDirectorSlide = (currentDirectorSlide + direction + directorSlides) % directorSlides;
    updateDirectorsSlider();
}

function goToDirectorSlide(slideIndex) {
    currentDirectorSlide = slideIndex;
    updateDirectorsSlider();
}

function updateDirectorDots() {
    const dots = document.querySelectorAll('.director-dot');
    dots.forEach((dot, index) => {
        if (index === currentDirectorSlide) {
            dot.classList.remove('bg-[#041B44]');
            dot.classList.add('bg-[#D4AF37]');
        } else {
            dot.classList.remove('bg-[#D4AF37]');
            dot.classList.add('bg-[#041B44]');
        }
    });
}

// Initialize the slider if it exists
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('directors-slider');
    if (slider) {
        updateDirectorsSlider();
    }
});


// Blogs Pages Tabs Filtering Script

    (function() {
        const tabBtns = document.querySelectorAll('#articles-tabs .tab-btn-articles');
        const cards = document.querySelectorAll('#articles-cards .article-card-articles');
        let activeTab = 'economic';
        function updateTabs(tab) {
            tabBtns.forEach(btn => {
                if (btn.getAttribute('data-tab') === tab) {
                    btn.classList.add('bg-[#D4AF37]', 'text-white');
                    btn.classList.remove('bg-white', 'text-[#041B44]');
                } else {
                    btn.classList.remove('bg-[#D4AF37]', 'text-white');
                    btn.classList.add('bg-white', 'text-[#041B44]');
                }
            });
            cards.forEach(card => {
                card.style.display = (card.getAttribute('data-category') === tab) ? '' : 'none';
            });
        }
        // Initial state
        updateTabs(activeTab);
        // Tab click event
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                activeTab = this.getAttribute('data-tab');
                updateTabs(activeTab);
            });
        });
    })();

    document.addEventListener('DOMContentLoaded', function() {
        const burgerMenu = document.getElementById('burger-menu');
        const mobileMenu = document.getElementById('mobile-menu-1');
        
        burgerMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Carousel functionality
        const carouselContainer = document.getElementById('carousel-container');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const carouselItems = document.querySelectorAll('.carousel-item');
        
        let currentIndex = 0;
        const totalItems = carouselItems.length;
        
        // Initial setup
        function setupCarousel() {
            // On mobile, show only one item
            if (window.innerWidth < 768) {
                carouselItems.forEach((item, index) => {
                    item.style.display = index === currentIndex ? 'block' : 'none';
                });
                // Show/hide navigation buttons based on current index
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentIndex === totalItems - 1 ? '0.5' : '1';
            } else {
                // On desktop, show both items
                carouselItems.forEach(item => {
                    item.style.display = 'block';
                });
                prevBtn.style.opacity = '0.5';
                nextBtn.style.opacity = '0.5';
            }
        }
        
        // Run initial setup
        setupCarousel();
        
        prevBtn.addEventListener('click', function() {
            if (window.innerWidth < 768 && currentIndex > 0) {
                currentIndex--;
                setupCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (window.innerWidth < 768 && currentIndex < totalItems - 1) {
                currentIndex++;
                setupCarousel();
            }
        });
        
        // Update carousel on window resize
        window.addEventListener('resize', setupCarousel);

        // NEW: Steps Carousel Functionality - Simplified
        const stepsPrevBtn = document.getElementById('steps-prev-btn');
        const stepsNextBtn = document.getElementById('steps-next-btn');
        const stepsItems = document.querySelectorAll('.steps-item');
        
        let currentStepIndex = 0;
        const totalSteps = stepsItems.length;
        
        // Add CSS styles for the carousel
        const style = document.createElement('style');
        style.textContent = `
            .steps-item {
                transition: all 0.3s ease-in-out;
            }
            .number-badge {
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
        
        // Function to update the carousel display
        function updateStepsCarousel() {
            // For mobile view (one card at a time)
            if (window.innerWidth < 768) {
                stepsItems.forEach((item, index) => {
                    // Only show the current step on mobile
                    if (index === currentStepIndex) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            } 
            // For desktop view (three cards at a time)
            else {
                stepsItems.forEach((item, index) => {
                    // Show first three items on desktop
                    if (index >= currentStepIndex && index < currentStepIndex + 3) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            }
            
            // Update the navigation buttons
            stepsPrevBtn.style.opacity = currentStepIndex === 0 ? '0.5' : '1';
            stepsPrevBtn.style.cursor = currentStepIndex === 0 ? 'default' : 'pointer';
            
            const maxIndex = window.innerWidth < 768 ? totalSteps - 1 : totalSteps - 3;
            stepsNextBtn.style.opacity = currentStepIndex >= maxIndex ? '0.5' : '1';
            stepsNextBtn.style.cursor = currentStepIndex >= maxIndex ? 'default' : 'pointer';
        }
        
        // Initialize the carousel
        updateStepsCarousel();
        
        // Handle previous button click
        stepsPrevBtn.addEventListener('click', function() {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateStepsCarousel();
            }
        });
        
        // Handle next button click
        stepsNextBtn.addEventListener('click', function() {
            const maxIndex = window.innerWidth < 768 ? totalSteps - 1 : totalSteps - 3;
            if (currentStepIndex < maxIndex) {
                currentStepIndex++;
                updateStepsCarousel();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', function() {
            // Reset the index if needed
            const maxIndex = window.innerWidth < 768 ? totalSteps - 1 : totalSteps - 3;
            if (currentStepIndex > maxIndex) {
                currentStepIndex = maxIndex;
            }
            updateStepsCarousel();
        });
    });
