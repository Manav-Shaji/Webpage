document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true
  });

  setTimeout(() => {
     AOS.refresh();
  },  100);

  // Array of projects
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
        alert("Project link is not available!");
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

  function setupMobileMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const mobileMenu = document.querySelector("#navbar ul");

    if (!menuIcon || !mobileMenu) return;

    menuIcon.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!menuIcon.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove("active");
      }
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => mobileMenu.classList.remove("active"));
    });
  }

  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  function setupTypedJS() {
    const typedElement = document.getElementById("typed-output");
    if (!typedElement || typeof Typed === "undefined") return;

    new Typed("#typed-output", {
      strings: ["Full Stack Developer", "Creative Developer", "Design Innovator", "Tech Enthusiast"],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      onStart: () => (typedElement.style.color = "#4C9FFF"),
      onStringTyped: () => (typedElement.style.color = "#E1E1E1"),
    });
  }

  // Load all features on DOMContentLoaded
  loadProjects();
  setupMobileMenu();
  setupSmoothScroll();
  setupTypedJS();
});
