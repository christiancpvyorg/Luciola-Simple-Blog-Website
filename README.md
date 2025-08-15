---

# Simple Blog Website

A lightweight blog platform built with **HTML**, **CSS**, and **JavaScript**, supporting **Markdown** for post content.
Posts can include local images from the `images/` folder or external image links.

---

## 📂 Project Structure

```
.
├── index.html          # Main HTML page
├── style.css           # Styles for the website
├── script.js           # Main JavaScript logic
├── posts.js            # List of posts and metadata
├── posts/              # Markdown files for blog posts
│   ├── post1.md
│   ├── post2.md
│   └── ...
├── images/             # Local images for posts
│   ├── example-image.jpeg
│   └── ...
└── README.md           # Project documentation
```

---

## ✨ Features

* **Markdown Support** – Easily create posts using `.md` files.
* **Local & External Images** – Use images stored in `/images` or link to external ones.
* **Simple & Responsive Design** – Clean HTML and CSS styling.
* **Dynamic Post Loading** – Posts are listed dynamically using `posts.js`.

---

## 🛠 How It Works

1. **`posts.js`** contains a list of available blog posts (title, date, and file path).
2. **`script.js`** dynamically loads posts into the homepage and fetches Markdown content when a post is opened.
3. **Markdown files** inside `/posts` hold the actual blog content.
4. **Images** can be placed in `/images` or referenced by URL directly in the Markdown file.

Example `posts.js` entry:

```javascript
const posts = [
  {
    title: "Creating Consistent Design Systems",
    date: "2025-08-15",
    file: "posts/design-systems.md",
    image: "images/example-image.jpeg"
  }
];
```

Example Markdown (`design-systems.md`):

```markdown
# Creating Consistent Design Systems for Web Applications

![](/images/example-image.jpeg)

A design system is more than just a style guide...
```

---

## 🚀 Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/christiancpvyorg/Luciola-Simple-Blog-Website.git
   cd Luciola-Simple-Blog-Website
   ```

2. **Open in Browser**

   * Simply open `index.html` in your browser.
   * No server required, but you can use a local server for better performance (e.g., `Live Server` in VS Code).

---

## 📄 Writing a New Post

1. Create a new `.md` file in `/posts`.
2. Add content in **Markdown** format.
3. Add an entry in `posts.js` with:

   * Title
   * Date
   * File path
   * Optional image (local or URL)

---

## 📌 Example Post with Image

Markdown:

```markdown
# My New Blog Post

![My Image](/images/my-photo.jpeg)

This is an example post with a local image.
```

Or with an external image:

```markdown
# My New Blog Post

![External Image](https://example.com/image.jpg)

This is an example post with an online image.
```

---

## 📜 License

This project is open-source and free to use for personal and educational purposes.

---