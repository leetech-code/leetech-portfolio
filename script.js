//toggle icon bar //
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}


//scroll section //
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 200;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      //active navbar //
      navLinks.forEach(Links => {
        Links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });

  //remove toggle icon and navbar when click on navlinks
  menuIcon.classList.remove('bx-x')
  navbar.classList.remove('active')
}


// skills section //
const skillsBox = document.querySelector('.skills-box');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsBox) {
  observer.observe(skillsBox);
}


// contact //
const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = form.querySelector("button");

    btn.textContent = "Sending...";
    btn.disabled = true;

    emailjs.sendForm(
        "service_bxf8slj",
        "template_gaxqru9",
        form
    )
    .then(() => {
        btn.textContent = "Message Sent ✓";
        form.reset();
        alert("✅ Your message has been sent successfully. I'll get back to you as soon as possible.");

        setTimeout(() => {
            btn.textContent = "Send Message";
            btn.disabled = false;
        }, 2000);
    })
    .catch((error) => {
        console.error(error);

        btn.textContent = "Send Message";
        btn.disabled = false;

        alert("Failed to send message.");
    });
});