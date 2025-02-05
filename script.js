// Sample project data
const projects = [
  {
    title: "Project 1",
    description: "A web application built with React",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Project 2",
    description: "An e-commerce site using Node.js and MongoDB",
    image: "https://via.placeholder.com/300x200",
  },
  { title: "Project 3", description: "A responsive portfolio website", image: "https://via.placeholder.com/300x200" },
]

// Function to create project cards
function createProjectCard(project) {
  return `
        <div class="col-md-4 mb-4">
            <div class="card project-card">
                <img src="${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        </div>
    `
}

// Load projects
document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById("project-list")
  projectList.innerHTML = projects.map(createProjectCard).join("")

  // Handle form submission
  const contactForm = document.getElementById("contact-form")
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(contactForm)
    const formValues = Object.fromEntries(formData.entries())
    console.log("Form submitted:", formValues)
    // Here you would typically send this data to a server
    alert("Thank you for your message! I will get back to you soon.")
    contactForm.reset()
  })
})

