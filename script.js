// Handle Blog Post Submission
const blogForm = document.getElementById('blog-form');
const blogInput = document.getElementById('blog-input');
const blogContainer = document.getElementById('blog-container');

blogForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newBlog = document.createElement('div');
  newBlog.classList.add('blog-post');
  newBlog.textContent = blogInput.value;

  blogContainer.appendChild(newBlog);
  blogInput.value = ''; // Clear input after submission
});

// Handle Contact Form Submission (Demo Purpose)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
  contactForm.reset();
});
