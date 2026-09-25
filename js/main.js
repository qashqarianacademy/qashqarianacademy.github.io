import { auth } from "./firebase-config.js";
/* =========================================
   QASHQARIAN ACADEMY
   Main JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    // Close mobile menu after clicking a navigation link

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });

}


/* =========================================
   SUBJECT CARDS
========================================= */

const subjectCards = document.querySelectorAll(".subject-card");

subjectCards.forEach(function (card) {

    card.addEventListener("click", function (event) {

        const subject = card.dataset.subject;
        const href = card.getAttribute("href");

        // If the card has a real link, let the browser follow it
        if (href && href !== "#") {
            return;
        }

        // Otherwise, show the "coming soon" message
        event.preventDefault();

        alert(
            "The " +
            subject.charAt(0).toUpperCase() +
            subject.slice(1) +
            " quiz section will be available here soon."
        );

    });

});


/* =========================================
   SIMPLE PAGE LOAD MESSAGE
========================================= */

console.log("Qashqarian Academy website loaded successfully.");

/* =========================================
   HERO 3D TILT
========================================= */

const heroSection = document.querySelector(".hero");
const tiltCard = document.querySelector(".main-card");

if (heroSection && tiltCard && window.matchMedia("(hover: hover)").matches) {

    heroSection.addEventListener("mousemove", function (e) {

        const rect = tiltCard.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

        tiltCard.style.transform =
            "perspective(900px) rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 10) + "deg)";
    });

    heroSection.addEventListener("mouseleave", function () {
        tiltCard.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    });
}

/* =========================================
   SCROLL ANIMATIONS
========================================= */

(function () {

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ---------- Scroll progress bar ---------- */

    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    document.body.appendChild(bar);

    function updateBar() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
    }

    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();


    /* ---------- Highlight the menu link of the section in view ---------- */

    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]:not(.nav-button)');
    const sections = document.querySelectorAll("section[id]");

    if (navLinks.length && sections.length) {

        const spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navLinks.forEach(function (link) {
                        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
                    });
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        sections.forEach(function (section) { spy.observe(section); });
    }


    if (reduceMotion) return;


    /* ---------- Reveal elements as they scroll into view ---------- */

    const revealGroups = [
        [".intro-item", "reveal-up"],
        [".about-section .section-heading", "reveal-left"],
        [".about-card", "reveal-right"],
        [".center-heading", "reveal-up"],
        [".feature-card", "reveal-up"],
        [".section-header-row", "reveal-up"],
        [".subject-card", "reveal-zoom"],
        [".resource-category", "reveal-up"],
        [".resource-subject-card", "reveal-up"],
        [".note-card", "reveal-up"],
        [".recreated-test-card", "reveal-zoom"],
        [".resource-disclaimer", "reveal-up"],
        [".preview-content", "reveal-left"],
        [".quiz-preview-window", "reveal-right"],
        [".cta-content", "reveal-up"],
        [".contact-container > div:first-child", "reveal-left"],
        [".contact-card", "reveal-right"],
        [".footer-main", "reveal-up"],
        [".footer-bottom", "reveal-up"]
    ];

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    revealGroups.forEach(function (group) {

        const selector = group[0];
        const effect = group[1];

        document.querySelectorAll(selector).forEach(function (el) {

            const siblings = Array.from(el.parentElement.children).filter(function (child) {
                return child.matches(selector);
            });

            const position = siblings.indexOf(el);

            el.classList.add("reveal", effect);
            el.style.setProperty("--d", Math.min(position * 0.12, 0.6) + "s");

            revealObserver.observe(el);
        });
    });


    /* ---------- Cursor spotlight on cards ---------- */

    document.querySelectorAll(".feature-card, .subject-card, .resource-subject-card, .note-card").forEach(function (card) {

        card.addEventListener("mousemove", function (e) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
            card.style.setProperty("--my", (e.clientY - rect.top) + "px");
        });
    });


    /* ---------- Quiz preview: automatic answer demo ---------- */

    const options = document.querySelectorAll(".quiz-preview-window .answer-option");

    if (options.length >= 2) {

        function clearAll() {
            options.forEach(function (option) {
                option.classList.remove("selected", "wrong");
                const mark = option.querySelector("b");
                if (mark) mark.remove();
            });
        }

        function mark(option, symbol) {
            const b = document.createElement("b");
            b.textContent = symbol;
            option.appendChild(b);
        }

        function showCorrect() {
            clearAll();
            options[0].classList.add("selected");
            mark(options[0], "✓");
        }

        let round = 0;

        setInterval(function () {
            clearAll();
            const wrong = options[1 + (round++ % (options.length - 1))];
            wrong.classList.add("wrong");
            mark(wrong, "✗");
            setTimeout(showCorrect, 1400);
        }, 4200);
    }

})();