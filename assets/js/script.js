// Theme Toggler
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const menu_Bars = document.querySelector('.menu-bars');
const navLinks = document.querySelector('.nav-links');

menu_Bars.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Project Carousel Functionality
function initCarousels() {
    const carousels = document.querySelectorAll('.project-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));

        let currentIndex = 0;

        // Set initial position
        updateCarousel();

        // Next button
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        // Previous button
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        function updateCarousel() {
            // Move track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    });
}

// Initialize carousels when page loads
document.addEventListener('DOMContentLoaded', initCarousels);

// Project Detail View
const viewDetailLinks = document.querySelectorAll('.view-detail');
const projectDetailContainer = document.getElementById('project-detail-container');
const mainContent = document.querySelector('body > section:not(.project-detail)');

viewDetailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const projectDetail = document.getElementById(`project-${projectId}`);

        // Hide main content and show project detail
        document.querySelectorAll('body > section').forEach(section => {
            section.style.display = 'none';
        });
        document.querySelector('footer').style.display = 'none';
        document.querySelector('header').style.display = 'none';

        projectDetailContainer.style.display = 'block';
        projectDetail.style.display = 'block';

        // Scroll to top of project detail
        window.scrollTo(0, 0);
    });
});

// Back to Projects
const backButtons = document.querySelectorAll('.back-btn');
backButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide project details and show main content
        projectDetailContainer.style.display = 'none';
        document.querySelectorAll('.project-detail').forEach(detail => {
            detail.style.display = 'none';
        });

        document.querySelectorAll('body > section').forEach(section => {
            section.style.display = 'block';
        });
        document.querySelector('footer').style.display = 'block';
        document.querySelector('header').style.display = 'flex';

        // Scroll to projects section
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
});

// Animate skill bars when scrolled into view
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

// Initialize skill bars with 0 width
window.addEventListener('load', () => {
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// Animate on scroll
window.addEventListener('scroll', animateSkillBars);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if it's a project detail link
        if (this.classList.contains('view-detail')) return;

        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Contact Form with Sweet Alert
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show loading alert
        Swal.fire({
            title: 'Sending Message...',
            text: 'Please wait a moment',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Simulate sending message (replace with actual form submission)
        setTimeout(() => {
            Swal.fire({
                title: 'Message Sent!',
                text: `Thank you ${name}, your message has been sent successfully! I'll get back to you soon.`,
                icon: 'success',
                confirmButtonText: 'Great!',
                confirmButtonColor: '#4f46e5',
                timer: 5000,
                timerProgressBar: true,
                willClose: () => {
                    // Reset form
                    contactForm.reset();
                }
            });
        }, 2000);
    });
}

// Simple contact form handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // Initialize EmailJS
        emailjs.init("0Ls-RW64ewuXiP9jZ");

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            try {
                // Show loading
                Swal.fire({
                    title: 'Sending...',
                    text: 'Please wait',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading()
                });

                // Send email
                const response = await emailjs.send(
                    "service_sxoo7lp",
                    "template_6w3sx8n",
                    {
                        from_name: name,
                        from_email: email,
                        subject: subject,
                        message: message,
                        reply_to: email
                    }
                );

                // Success
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                contactForm.reset();

            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to send message. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});