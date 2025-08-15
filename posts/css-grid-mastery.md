# Mastering CSS Grid: From Basics to Advanced Layouts

![CSS Grid Layout](https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200)

CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. Let's explore everything from basics to advanced techniques.

## Grid Basics

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}
```

## Grid Areas

```css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

![Grid Layout Example](https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800)

## Responsive Grid

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Advanced Techniques

### Overlapping Grid Items
```css
.overlap {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
}
```

### Grid Auto-Placement
```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
  gap: 1rem;
}
```

### Subgrid (when supported)
```css
.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}
```

## Practical Examples

### Card Layout
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Magazine Layout
```css
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 100px);
  gap: 1rem;
}

.feature-article {
  grid-column: 1 / 8;
  grid-row: 1 / 5;
}

.sidebar-article {
  grid-column: 8 / 13;
  grid-row: 1 / 3;
}
```

![Magazine Layout](https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800)

## Grid vs Flexbox

| Use Case | Grid | Flexbox |
|----------|------|---------|
| 2D Layout | ✅ | ❌ |
| 1D Layout | ✅ | ✅ |
| Content-driven | ❌ | ✅ |
| Layout-driven | ✅ | ❌ |
## Browser Support

CSS Grid has excellent browser support:
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

## Performance Tips

1. **Use `grid-template-areas` for readability**
2. **Prefer `fr` units over percentages**
3. **Use `minmax()` for responsive designs**
4. **Avoid unnecessary nesting**

CSS Grid opens up endless possibilities for creating beautiful, maintainable layouts. Practice these techniques to become a Grid master!