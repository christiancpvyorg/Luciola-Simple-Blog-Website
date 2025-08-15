# Web Accessibility: Building Inclusive Digital Experiences

![Web Accessibility](https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200)

Web accessibility isn't just a nice-to-have—it's essential for creating inclusive digital experiences that work for everyone.

## The POUR Principles

### Perceivable
- Provide text alternatives for images
- Offer captions for videos
- Ensure sufficient color contrast

```html
<img src="chart.png" alt="Sales increased 40% from Q1 to Q2 2024">
```

### Operable
- Make all functionality keyboard accessible
- Give users enough time to read content
- Don't use content that causes seizures

```css
.focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### Understandable
- Make text readable and understandable
- Make content appear and operate predictably

### Robust
- Maximize compatibility with assistive technologies

![Accessibility Tools](https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800)

## Semantic HTML

```html
<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <time datetime="2025-01-15">January 15, 2025</time>
    </header>
    <section>
      <h2>Section Heading</h2>
      <p>Content goes here...</p>
    </section>
  </article>
</main>
```

## ARIA Labels and Roles

```html
<button aria-label="Close dialog" aria-expanded="false">
  <span aria-hidden="true">&times;</span>
</button>

<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="menuitem"><a href="/">Home</a></li>
    <li role="menuitem"><a href="/about">About</a></li>
  </ul>
</nav>
```

## Color and Contrast

```css
/* Ensure sufficient contrast ratios */
.text-primary {
  color: #1a202c; /* 4.5:1 ratio on white */
}

.text-secondary {
  color: #4a5568; /* 3:1 ratio on white */
}

/* Don't rely solely on color */
.error {
  color: #e53e3e;
  border-left: 4px solid #e53e3e;
}

.error::before {
  content: "⚠️ ";
}
```

## Keyboard Navigation

```javascript
// Trap focus in modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}
```

## Testing for Accessibility

1. **Keyboard Navigation**: Tab through your site
2. **Screen Reader Testing**: Use NVDA, JAWS, or VoiceOver
3. **Color Contrast**: Use tools like WebAIM's contrast checker
4. **Automated Testing**: Implement tools like axe-core

```javascript
// Example automated testing with axe-core
import axe from 'axe-core';

axe.run(document, (err, results) => {
  if (err) throw err;
  console.log(results.violations);
});
```

![Screen Reader](https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800)

## Common Accessibility Issues

### Missing Alt Text
```html
<!-- Bad -->
<img src="graph.png">

<!-- Good -->
<img src="graph.png" alt="Revenue increased 25% from 2023 to 2024">
```

### Poor Form Labels
```html
<!-- Bad -->
<input type="email" placeholder="Email">

<!-- Good -->
<label for="email">Email Address</label>
<input type="email" id="email" required>
```

### Insufficient Color Contrast
```css
/* Bad - 2.1:1 ratio */
.low-contrast {
  color: #999;
  background: #fff;
}

/* Good - 4.5:1 ratio */
.good-contrast {
  color: #333;
  background: #fff;
}
```

## Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Color contrast meets WCAG standards
- [ ] Site is fully keyboard navigable
- [ ] Focus indicators are visible
- [ ] Headings follow logical hierarchy
- [ ] ARIA labels are used appropriately
- [ ] Error messages are descriptive
- [ ] Content is structured semantically

Remember: accessibility benefits everyone, not just people with disabilities. It improves usability, SEO, and overall user experience.