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
            pageYOffset < sectionTop + sectionHeight
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

//Scroll Reveal Animation//
const revealElements = document.querySelectorAll(
    ".service-box, .skill-card, .project-box, .experience-box, .contact form, .contact-text"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});




// Contact Form
const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const submitButton = contactForm.querySelector("button");

    submitButton.disabled = true;
    submitButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Sending...
    `;

    const templateParams = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value
    };

    emailjs.send(
        "service_lgmxzrk",
        "template_92tobx5",
        templateParams
    )
    .then(() => {

        alert("Message sent successfully! I'll get back to you soon.");

        contactForm.reset();

        submitButton.disabled = false;
        submitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
            Send Message
        `;

    })
    .catch((error) => {

        console.error("EmailJS Error:", error);

        alert("Something went wrong. Please try again.");

        submitButton.disabled = false;
        submitButton.innerHTML = `
            <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
            Send Message
        `;

    });

});


// Read More//
const readMoreBtns = document.querySelectorAll(".readMoreBtn");

readMoreBtns.forEach((button) => {

    button.addEventListener("click", (e) => {
        e.preventDefault();

        const currentCard = button.closest(".service-box");
        const currentMore = currentCard.querySelector(".more");
        const currentDots = currentCard.querySelector(".dots");

        // Close all other cards
        document.querySelectorAll(".service-box").forEach((card) => {

            if (card !== currentCard) {

                card.querySelector(".more")?.classList.remove("show");
                card.querySelector(".dots")?.classList.remove("hide");

                const otherButton = card.querySelector(".readMoreBtn");

                if (otherButton) {
                    otherButton.innerHTML = `
                        Read More
                        <i class="fa-solid fa-arrow-right"></i>
                    `;

                    otherButton.setAttribute("aria-expanded", "false");
                }
            }
        });

        // Toggle the clicked card
        const isOpen = currentMore.classList.contains("show");

        currentMore.classList.toggle("show", !isOpen);
        currentDots.classList.toggle("hide", !isOpen);

        button.innerHTML = isOpen
            ? `Read More <i class="fa-solid fa-arrow-right"></i>`
            : `Show Less <i class="fa-solid fa-arrow-up"></i>`;

        button.setAttribute("aria-expanded", isOpen);
    });

});





// Back To Top Button //
const backToTop = document.getElementById("backToTop");

if(backToTop){

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        backToTop.classList.add("show");
    }else{
        backToTop.classList.remove("show");
    }

});

}

// Scroll Progress Indicator //
const scrollProgress = document.querySelector(".scroll-progress");


window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    if(scrollProgress){
    scrollProgress.style.width = progress + "%";
}

});

// Preloader //
window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if(preloader){
        preloader.classList.add("hide");
    }

});

// Project Details Toggle
const projectToggles = document.querySelectorAll(".project-toggle");

projectToggles.forEach((toggle) => {

    toggle.addEventListener("click", () => {

        const currentProject = toggle.closest(".project-box");

        // Close all other projects
        document.querySelectorAll(".project-box").forEach((project) => {

            if (project !== currentProject) {

                project.classList.remove("active");

                const otherToggle = project.querySelector(".project-toggle");

                otherToggle?.setAttribute("aria-expanded", "false");

            }

        });

        // Toggle the current project
        currentProject.classList.toggle("active");

        // Check if current project is open
        const isOpen = currentProject.classList.contains("active");

        // Update accessibility
        toggle.setAttribute("aria-expanded", isOpen);

    });

});