// Portfolio Application Manager
class PortfolioManager {
  constructor() {
      this.projects = [
          {
              name: 'DevConnect',
              description:
                  'A full-stack social networking platform for developers to share projects, collaborate, and network. Built with React, Node.js, Express, and MongoDB.',
              image: 'https://via.placeholder.com/300',
              link: '#',
          },
          {
              name: 'E-Commerce Hub',
              description:
                  'A scalable e-commerce web application featuring user authentication, product management, and payment integration using Next.js, Express, and PostgreSQL.',
              image: 'https://via.placeholder.com/300',
              link: '#',
          },
          {
              name: 'TaskFlow',
              description:
                  'A Kanban-style task management system with real-time collaboration, drag-and-drop functionality, and cloud storage, built using MERN stack and Firebase.',
              image: 'https://via.placeholder.com/300',
              link: '#',
          },
      ];

      this.typedOptions = {
          strings: [
              'Full Stack Developer',
              'Creative Developer',
              'Design Innovator',
              'Tech Enthusiast',
          ],
          typeSpeed: 100,
          backSpeed: 50,
          loop: true,
          onStart: () => this.updateTypedColor('#4C9FFF'),
          onStringTyped: () => this.updateTypedColor('#E1E1E1'),
      };

      this.init();
  }

  init() {
      document.addEventListener('DOMContentLoaded', () => {
          this.initializeAOS();
          this.loadProjects();
          this.setupMobileMenu();
          this.setupSmoothScroll();
          this.initializeTyped();
          this.handleDynamicBadge();
          this.setupFormSubmission();
      });
  }

  initializeAOS() {
      if (typeof AOS === 'undefined') {
          console.warn('AOS library not loaded');
          return;
      }

      AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
      });

      setTimeout(() => AOS.refresh(), 100);
  }

  createProjectCard(project, index) {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.aos = index % 2 === 0 ? 'fade-up' : 'fade-down'; // Alternating animations
      card.dataset.aosDelay = index * 200;

      const projectContent = `
        <img src="${project.image}" alt="${project.name}">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <button class="btn-github">
            <i class="fab fa-github"></i> View Project
        </button>
    `;

      card.innerHTML = projectContent;

      const button = card.querySelector('.btn-github');
      if (button) {
          this.setupProjectButton(button, project.link);
      }

      return card;
  }

  setupProjectButton(button, link) {
      button.addEventListener('click', () => {
          if (link && link !== '#') {
              window.open(link, '_blank');
          } else {
              button.style.display = 'none';
          }
      });
  }

  loadProjects() {
      const projectList = document.getElementById('project-list');
      if (!projectList) return;

      const fragment = document.createDocumentFragment();
      this.projects.forEach((project, index) => {
          fragment.appendChild(this.createProjectCard(project, index));
      });

      projectList.innerHTML = '';
      projectList.appendChild(fragment);
      AOS?.refresh();
  }

  setupMobileMenu() {
      const menuIcon = document.querySelector('.hamburger-menu');
      const mobileMenu = document.querySelector('#navbar ul');
      const body = document.body;

      if (!menuIcon || !mobileMenu) return;

      const toggleMenu = (isOpen) => {
          mobileMenu.classList.toggle('active', isOpen);
          body.classList.toggle('menu-open', isOpen);
      };

      menuIcon.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleMenu(!mobileMenu.classList.contains('active'));
      });

      document.addEventListener('click', (e) => {
          if (
              mobileMenu.classList.contains('active') &&
              !menuIcon.contains(e.target) &&
              !mobileMenu.contains(e.target)
          ) {
              toggleMenu(false);
          }
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
          link.addEventListener('click', () => toggleMenu(false));
      });
  }

  setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              const offset = 80; // Adjust according to navbar height
              const targetPosition = target.offsetTop - offset;
              window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          });
      });
  }

  updateTypedColor(color) {
      const typedElement = document.getElementById('typed-output');
      if (typedElement) {
          typedElement.style.color = color;
      }
  }

  initializeTyped() {
      const typedElement = document.getElementById('typed-output');
      if (!typedElement) return;

      if (typeof Typed !== 'undefined') {
          new Typed('#typed-output', this.typedOptions);
      } else {
          typedElement.textContent = 'Full Stack Developer';
      }
  }

  handleDynamicBadge() {
      if (typeof addBadge === 'function') {
          setTimeout(() => {
              addBadge('frontend-badges', 'fab fa-bootstrap', 'Bootstrap');
          }, 2000);
      }
  }

  setupFormSubmission() {
      const form = document.getElementById('contact-form');
      if (!form) return;

      form.addEventListener('submit', (event) => {
          event.preventDefault();

          const success = Math.random() > 0.3;

          if (success) {
              form.reset();
          }

          this.showMessage(
              success
                  ? 'Message Sent Successfully! ✅'
                  : 'Failed to Send Message ❌',
              success
          );
      });
  }

  showMessage(message, isSuccess) {
      const messageBox = document.createElement('div');
      messageBox.className = `form-message ${
          isSuccess ? 'success' : 'error'
      }`;
      messageBox.textContent = message;

      document.body.appendChild(messageBox);

      setTimeout(() => {
          messageBox.classList.add('fade-out');
          setTimeout(() => messageBox.remove(), 500);
      }, 3000);
  }
}

// Initialize the portfolio application
new PortfolioManager();
