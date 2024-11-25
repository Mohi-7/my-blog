// Get references
const blogContainer = document.getElementById('blog-container');
const addBlogBtn = document.getElementById('add-blog-btn');

// Load blogs from localStorage
function loadBlogs() {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  blogContainer.innerHTML = '';
  blogs.forEach(blog => {
    const blogPost = document.createElement('div');
    blogPost.className = 'blog-post';
    blogPost.textContent = blog;
    blogContainer.appendChild(blogPost);
  });
}

// Save a new blog
function addBlog() {
  const newBlog = prompt('Enter your blog content:');
  if (newBlog) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    loadBlogs();
  }
}

// Attach event listener
addBlogBtn.addEventListener('click', addBlog);

// Load blogs on page load
loadBlogs();
