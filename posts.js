const blogPosts = [{
  'id': "building-modern-web-apps",
  'title': "Building Modern Web Applications with React and TypeScript",
  'excerpt': "Discover the power of combining React with TypeScript to create scalable, maintainable web applications that stand the test of time.",
  'image': "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
  'author': "Alex Chen",
  'contentFile': 'posts/building-modern-web-apps.md',
  'category': "Development",
  'date': "2025-01-15",
  'readTime': "8 min read",
  'featured': true
}, {
  'id': "design-systems-guide",
  'title': "Creating Consistent Design Systems for Web Applications",
  'excerpt': "Learn how to build and maintain design systems that ensure consistency and efficiency across your entire product ecosystem.",
  'image': "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  'author': "Alex Chen",
  'contentFile': 'posts/design-systems-guide.md',
  'category': "Design",
  'date': "2025-01-12",
  'readTime': "6 min read",
  'featured': true
}, {
  'id': 'javascript-performance-tips',
  'title': "10 JavaScript Performance Optimization Techniques",
  'excerpt': "Boost your JavaScript application performance with these proven optimization techniques and best practices.",
  'image': "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800",
  'author': "Alex Chen",
  'contentFile': "posts/javascript-performance-tips.md",
  'category': "JavaScript",
  'date': "2025-01-10",
  'readTime': "5 min read",
  'featured': false
}, {
  'id': "css-grid-mastery",
  'title': "Mastering CSS Grid: From Basics to Advanced Layouts",
  'excerpt': "Master CSS Grid with practical examples and learn to create complex, responsive layouts with ease.",
  'image': "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
  'author': "Alex Chen",
  'contentFile': "posts/css-grid-mastery.md",
  'category': "CSS",
  'date': "2025-01-08",
  'readTime': "7 min read",
  'featured': true
}, {
  'id': "web-accessibility-essentials",
  'title': "Web Accessibility: Building Inclusive Digital Experiences",
  'excerpt': "Learn the fundamentals of web accessibility and how to create digital experiences that work for everyone.",
  'image': "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
  'author': "Alex Chen",
  'contentFile': "posts/web-accessibility-essentials.md",
  'category': "Accessibility",
  'date': "2025-01-05",
  'readTime': "6 min read",
  'featured': false
}, {
  'id': "nodejs-backend-architecture",
  'title': "Scalable Node.js Backend Architecture Patterns",
  'excerpt': "Explore proven architectural patterns for building maintainable and scalable Node.js backend applications.",
  'image': "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
  'author': "Alex Chen",
  'contentFile': "posts/nodejs-backend-architecture.md",
  'category': "Node.js",
  'date': "2025-01-03",
  'readTime': "9 min read",
  'featured': false
}];
async function loadMarkdownContent(_0x173ec7) {
  try {
    const _0x507643 = await fetch(_0x173ec7);
    if (!_0x507643.ok) {
      throw new Error("Failed to load " + _0x173ec7);
    }
    return await _0x507643.text();
  } catch (_0x17045b) {
    console.error("Error loading markdown:", _0x17045b);
    return "Content not available";
  }
}
function getFeaturedPosts() {
  return blogPosts.filter(_0x312523 => _0x312523.featured);
}
function getLatestPosts() {
  return blogPosts.sort((_0x34e0fb, _0x3d2b6a) => new Date(_0x3d2b6a.date) - new Date(_0x34e0fb.date)).slice(0x0, 0x6);
}
function getPostById(_0x3b65d3) {
  return blogPosts.find(_0x4f46e4 => _0x4f46e4.id === _0x3b65d3);
}
function formatDate(_0x42c832) {
  const _0x52e035 = {
    'year': "numeric",
    'month': "long",
    'day': "numeric"
  };
  return new Date(_0x42c832).toLocaleDateString("en-US", _0x52e035);
}