// Portfolio Application Manager
class PortfolioManager {
  constructor() {
      this.projects = [
          {
              name: 'DevConnect',
              description: 'A full-stack social networking platform for developers to share projects, collaborate, and network. Built with React, Node.js, Express, and MongoDB.',
              image: 'https://via.placeholder.com/300',
              link: '#'
          },
          {
              name: 'E-Commerce Hub',
              description: 'A scalable e-commerce web application featuring user authentication, product management, and payment integration using Next.js, Express, and PostgreSQL.',
              image: 'https://via.placeholder.com/300',
              link: '#'
          },
          {
              name: 'TaskFlow',
              description: 'A Kanban-style task management system with real-time collaboration, drag-and-drop functionality, and cloud storage, built using MERN stack and Firebase.',
              image: 'https://via.placeholder.com/300',
              link: '#'
          }
      ];

      this.typedOptions = {
          strings: [
              'Full Stack Developer',
              'Creative Developer',
              'Design Innovator',
              'Tech Enthusiast'
          ],
          typeSpeed: 100,
          backSpeed: 50,
          loop: true,
          onStart: (self) => this.updateTypedColor('#4C9FFF'),
          onStringTyped: (self) => this.updateTypedColor('#E1E1E1')
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
          once: true
      });

      setTimeout(() => AOS.refresh(), 100);
  }

  createProjectCard(project, index) {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.aos = 'fade-up';
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
          if (mobileMenu.classList.contains('active') &&
              !menuIcon.contains(e.target) &&
              !mobileMenu.contains(e.target)) {
              toggleMenu(false);
          }
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => toggleMenu(false));
      });
  }

  setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e) => {
              e.preventDefault();
              const target = document.querySelector(anchor.getAttribute('href'));
              target?.scrollIntoView({ behavior: 'smooth' });
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
}

// Initialize the portfolio application
new PortfolioManager();