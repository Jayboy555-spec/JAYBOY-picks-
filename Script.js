/* ==========================================
   JÃYBÕY PICKS — FUTUREVERSE JAVASCRIPT
   Interactive • Futuristic • Responsive
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. PAGE LOADING EFFECT
    document.body.classList.add("page-loaded");


    // 2. CREATE A NEON CURSOR TRAIL
    const cursorGlow = document.createElement("div");

    cursorGlow.style.cssText = `
        position: fixed;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(0, 229, 255, 0.13),
            rgba(22, 119, 255, 0.06),
            transparent 70%
        );
        pointer-events: none;
        z-index: 999;
        transform: translate(-50%, -50%);
        display: none;
    `;

    document.body.appendChild(cursorGlow);

    if (window.matchMedia("(pointer: fine)").matches) {
        cursorGlow.style.display = "block";

        document.addEventListener("mousemove", event => {
            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";
        });
    }


    // 3. ANIMATE ELEMENTS WHEN THEY ENTER THE SCREEN
    const revealElements = document.querySelectorAll(
        ".section, .service-card, .section-heading, .hero-content"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {
            element.classList.add("future-reveal");
            revealObserver.observe(element);
        });
    }


    // 4. ADD THE REVEAL ANIMATION CSS WITHOUT REPLACING YOUR CSS
    const animationStyles = document.createElement("style");

    animationStyles.textContent = `
        .future-reveal {
            opacity: 0;
            transform: translateY(24px);
            transition:
                opacity 0.8s ease,
                transform 0.8s cubic-bezier(.2,.8,.2,1);
        }

        .future-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .future-reveal,
            .future-reveal.is-visible {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(animationStyles);


    // 5. PREMIUM CARD TILT EFFECT ON DESKTOP
    const cards = document.querySelectorAll(".service-card");

    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateY = ((x / rect.width) - 0.5) * 8;
                const rotateX = (0.5 - (y / rect.height)) * 8;

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    // 6. BUTTON CLICK ENERGY EFFECT
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", event => {
            const ripple = document.createElement("span");
            const rect = button.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${event.clientX - rect.left - size / 2}px;
                top: ${event.clientY - rect.top - size / 2}px;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: buttonRipple 0.6s ease-out;
                pointer-events: none;
            `;

            const previousPosition = getComputedStyle(button).position;

            if (previousPosition === "static") {
                button.style.position = "relative";
            }

            button.style.overflow = "hidden";
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 650);
        });
    });

    const rippleStyle = document.createElement("style");

    rippleStyle.textContent = `
        @keyframes buttonRipple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(rippleStyle);


    // 7. SMOOTH SCROLLING FOR PAGE LINKS
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 8. LIVE SEARCH FOR AFFILIATE CARDS
    const searchInput = document.querySelector(
        "#affiliateSearch, #searchInput, [data-affiliate-search]"
    );

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value
                .trim()
                .toLowerCase();

            document.querySelectorAll(".service-card").forEach(card => {
                const cardText = card.textContent.toLowerCase();

                card.style.display =
                    cardText.includes(searchTerm) ? "" : "none";
            });
        });
    }


    // 9. ACTIVE NAVIGATION HIGHLIGHT
    const navigationLinks = document.querySelectorAll(
        'nav a[href^="#"]'
    );

    const pageSections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window && pageSections.length) {
        const navObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navigationLinks.forEach(link => {
                            const active =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle("active-link", active);
                        });
                    }
                });
            },
            { threshold: 0.35 }
        );

        pageSections.forEach(section => navObserver.observe(section));
    }


    // 10. BACK-TO-TOP BUTTON
    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";
    topButton.setAttribute("aria-label", "Back to top");

    topButton.style.cssText = `
        position: fixed;
        right: 18px;
        bottom: 20px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid rgba(0,229,255,.7);
        background: rgba(8,15,35,.88);
        color: #00e5ff;
        font-size: 26px;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: .3s ease;
        box-shadow: 0 0 18px rgba(0,229,255,.2);
    `;

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        const show = window.scrollY > 350;

        topButton.style.opacity = show ? "1" : "0";
        topButton.style.visibility = show ? "visible" : "hidden";
        topButton.style.transform =
            show ? "translateY(0)" : "translateY(10px)";
    }, { passive: true });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 11. LIVE YEAR IN FOOTER
    document.querySelectorAll("[data-current-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    // 12. WELCOME MESSAGE IN THE CONSOLE
    console.log(
        "%c JÃYBÕY PICKS ",
        "background:#07152d;color:#00e5ff;font-size:22px;font-weight:bold;padding:10px;"
    );

    console.log(
        "%c FUTUREVERSE ONLINE ⚡",
        "color:#8b5cff;font-size:14px;font-weight:bold;"
    );

});