gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const menuLines = document.querySelectorAll('.menu-line');
let isMenuOpen = false;

lenis.on('scroll', ({ scroll }) => {
    if (scroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileNav.classList.toggle('active');
    
    if (isMenuOpen) {
        menuLines[0].style.transform = 'translateY(4px) rotate(45deg)';
        menuLines[1].style.transform = 'translateY(-4px) rotate(-45deg)';
        lenis.stop();
    } else {
        menuLines[0].style.transform = 'none';
        menuLines[1].style.transform = 'none';
        lenis.start();
    }
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileNav.classList.remove('active');
        menuLines[0].style.transform = 'none';
        menuLines[1].style.transform = 'none';
        lenis.start();
    });
});

const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

tl.from(".nav-brand, .nav-item, .mobile-menu-btn", {
    y: -20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 0.2
})
.from(".hero-subtitle", {
    y: 20,
    opacity: 0,
    duration: 1,
}, "-=0.5")
.from(".hero-title .line", {
    y: "100%",
    duration: 1.2,
    stagger: 0.15,
}, "-=0.8")
.from(".hero-desc", {
    y: 20,
    opacity: 0,
    duration: 1,
}, "-=0.8")
.from(".scroll-indicator", {
    opacity: 0,
    duration: 1,
}, "-=0.5");

gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.fromTo(element, 
        { 
            y: 50, 
            opacity: 0 
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true
            }
        }
    );
});

gsap.utils.toArray('.section-heading .line').forEach(line => {
    gsap.fromTo(line, 
        { 
            y: "100%", 
        },
        {
            y: "0%",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: line.closest('.section-heading'),
                start: "top 85%",
                once: true
            }
        }
    );
});

gsap.utils.toArray('.subtitle').forEach(subtitle => {
    gsap.fromTo(subtitle, 
        { x: -30, opacity: 0 },
        { 
            x: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: subtitle,
                start: "top 85%",
                once: true
            }
        }
    );
});

gsap.utils.toArray('.parallax-img img').forEach(img => {
    gsap.fromTo(img,
        {
            y: "-10%",
        },
        {
            y: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: img.closest('.project-image-container'),
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );
});

const magnets = document.querySelectorAll('.magnetic');

magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', function(e) {
        const position = magnet.getBoundingClientRect();
        
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        gsap.to(magnet, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    magnet.addEventListener('mouseleave', function() {
        gsap.to(magnet, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});
