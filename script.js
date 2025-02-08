document.addEventListener("DOMContentLoaded", () => {
  // ✅ Initialize AOS for animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true
  });

  setTimeout(() => {
    AOS.refresh();
  }, 100);

  // ✅ Array of projects (sample data)
  const projects = [
    {
      name: "DevConnect",
      description: "A full-stack social networking platform for developers to share projects, collaborate, and network. Built with React, Node.js, Express, and MongoDB.",
      image: "https://via.placeholder.com/300",
      link: "#"
    },
    {
      name: "E-Commerce Hub",
      description: "A scalable e-commerce web application featuring user authentication, product management, and payment integration using Next.js, Express, and PostgreSQL.",
      image: "https://via.placeholder.com/300",
      link: "#"
    },
    {
      name: "TaskFlow",
      description: "A Kanban-style task management system with real-time collaboration, drag-and-drop functionality, and cloud storage, built using MERN stack and Firebase.",
      image: "https://via.placeholder.com/300",
      link: "#"
    }
  ];

  function createProjectCard(project, index) {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", index * 200);

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.name;

    const title = document.createElement("h3");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.textContent = project.description;

    const button = document.createElement("button");
    button.classList.add("btn-github");
    button.innerHTML = `<i class="fab fa-github"></i> View Project`;

    button.addEventListener("click", () => {
      if (project.link && project.link !== "#") {
        window.open(project.link, "_blank");
      } else {
        button.style.display = "none"; // Hide if no valid link
      }
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(button);

    return card;
  }

  function loadProjects() {
    const projectList = document.getElementById("project-list");
    if (!projectList) return;

    projectList.innerHTML = "";

    projects.forEach((project, index) => {
      projectList.appendChild(createProjectCard(project, index));
    });

    AOS.refresh();
  }
// ✅ Function to manage mobile menu toggle
function setupMobileMenu() {
  const menuIcon = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector("#navbar ul");
  const body = document.body;

  if (!menuIcon || !mobileMenu) return;

  // Function to toggle menu
  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    body.classList.toggle("menu-open");

    // Prevent scrolling when menu is open
    if (mobileMenu.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  // Click or touch event for opening menu
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !menuIcon.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open");
      body.style.overflow = ""; // Restore scrolling
    }
  });

  // Close menu when clicking on a link inside it
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open");
      body.style.overflow = ""; // Restore scrolling
    });
  });

  // Ensure smooth experience on touch devices
  document.addEventListener("touchstart", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !menuIcon.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
      body.classList.remove("menu-open");
      body.style.overflow = ""; // Restore scrolling
    }
  });
}

  // ✅ Smooth scrolling function
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));

        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const currentPosition = window.scrollY;

          if (Math.abs(targetPosition - currentPosition) > 5) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  // ✅ Typed.js function with fallback text
  function setupTypedJS() {
    const typedElement = document.getElementById("typed-output");
    if (!typedElement) return;

    if (typeof Typed !== "undefined") {
      new Typed("#typed-output", {
        strings: ["Full Stack Developer", "Creative Developer", "Design Innovator", "Tech Enthusiast"],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
        onStart: () => (typedElement.style.color = "#4C9FFF"),
        onStringTyped: () => (typedElement.style.color = "#E1E1E1"),
      });
    } else {
      typedElement.textContent = "Full Stack Developer"; // Fallback text
    }
  }

  // ✅ Run the functions on page load
  loadProjects();
  setupMobileMenu();
  setupSmoothScroll();
  setupTypedJS();
  arrangeBadges(); // Arrange badges initially

  // ✅ Example: Add a new badge dynamically after 3 seconds
  setTimeout(() => {
    addBadge("frontend-badges", "fab fa-bootstrap", "Bootstrap");
  }, 2000);
});
