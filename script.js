// mobile menu //
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector("header");

if(menuIcon && navbar){
menuIcon.addEventListener("click", (e) => {

    // Prevent the click from reaching the document //
    e.stopPropagation();

    navbar.classList.toggle("active");

    const icon = menuIcon.querySelector("i");


    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

}

// Close Mobile Menu When Clicking Outside //
document.addEventListener("click", (e) => {

    if (
        navbar.classList.contains("active") &&
        !navbar.contains(e.target)
    ) {

        navbar.classList.remove("active");

        const icon = menuIcon.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});

//Sticky Header //
window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {
        header.style.background = "rgba(2, 6, 23, .92)";
        header.style.backdropFilter = "blur(18px)";
        header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, .35)";
    } else {
        header.style.background = "rgba(2, 6, 23, .65)";
        header.style.boxShadow = "none";
    }
});

// Active Navigation Link //
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";
    
    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            pageYOffset >= sectionTop && 
            pageXOffset < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});

// Scroll Reveal Animation //
const revealElements = document.querySelectorAll(".service-box, .skill-card, .project-box, .experience div, .contact form, .contact-text");

const revealOnScroll = () => {

    revealElements.forEach(element => {

    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {

        element.classList.remove("hidden");
        element.classList.add("show");
    }

    });

};

// Initial Styles //
revealElements.forEach(element => {
    element.classList.add("hidden");
});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// Contact form //
const form = document.querySelector("form");

if(form) {
    form.addEventListener("submit", function (e) {

    e.preventDefault ();

    alert("✅ Message Sent Successfully We'll get back to you shortly.");

    form.reset();
    });

}


// Read More //
const readMoreBtns = document.querySelectorAll(".readMoreBtn");
readMoreBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const currentBox = this.closest(".service-box");
        const currentDots = currentBox.querySelector(".dots");
        const currentMore = currentBox.querySelector(".more");

        // close every other card //
        document.querySelectorAll(".service-box").forEach(box => {
            if (box !== currentBox) {
                box.querySelector(".more").classList.remove("show");
                box.querySelector(".dots").style.display = "inline";
                box.querySelector(".readMoreBtn").textContent = "Read More"
            }
        })


        //toggle the current card //
        if (currentMore.classList.contains("show")) {
            currentMore.classList.remove("show");
            currentDots.style.display = "inline";
            this.textContent = "Read More";
        } else {
            currentMore.classList.add("show");
            currentDots.style.display = "none";
            this.textContent  = "Read Less";
        }
    })
});


// Back To Top Button //
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

// Scroll Progress Indicator //
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    scrollProgress.style.width = progress + "%";

});

// Preloader //
window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    preloader.classList.add("hide");

});