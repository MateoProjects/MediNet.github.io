# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MedNet is a static documentation website for a federated learning platform designed for healthcare institutions. The site is built as a GitHub Pages-compatible static site using modern HTML5, CSS3, and vanilla JavaScript.

## Architecture & Structure

### Static Site Architecture
- **Frontend-only**: Pure HTML/CSS/JavaScript static site
- **GitHub Pages**: Configured for automatic deployment via Jekyll
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Modern Web Standards**: Semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript

### Core Technologies
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Custom properties (CSS variables), modern layout techniques
- **JavaScript**: Modern ES6+ features, vanilla JS (no frameworks)
- **Jekyll**: GitHub Pages static site generator with minimal configuration
- **Google Fonts**: Inter typography and Material Icons

### File Organization
```
├── index.html                 # Main landing page
├── features.html             # Platform features overview
├── installation.html         # Installation guide
├── security.html            # Security implementation status
├── user-guide.html          # Complete user tutorial
├── use-cases.html           # Medical use cases
├── assets/
│   ├── css/style.css        # Main stylesheet with CSS variables
│   └── js/main.js           # Interactive functionality
├── images/                  # Screenshots and diagrams (see images/README.md)
├── presentation/            # Markdown presentation files
├── _config.yml             # Jekyll/GitHub Pages configuration
└── medinet_platform_guide.md # Comprehensive platform documentation
```

## Development Commands

### Local Development
```bash
# Serve locally using Python (for testing)
python -m http.server 8000

# Or using Node.js
npx http-server
```

### GitHub Pages Deployment
- **Automatic**: Push to main branch triggers GitHub Pages build
- **Manual**: Via repository Settings → Pages configuration
- **Testing**: Use GitHub Actions workflow in `.github/workflows/pages.yml` if needed

## Key Design Patterns

### CSS Architecture
- **CSS Custom Properties**: All colors and spacing defined in `:root`
- **Component-based**: Styles organized by component sections
- **Responsive Design**: Uses `clamp()` for fluid typography and spacing
- **Modern Layout**: CSS Grid for complex layouts, Flexbox for components

### JavaScript Patterns
- **Progressive Enhancement**: Site works without JavaScript
- **Event Delegation**: Efficient event handling for dynamic content
- **Module Pattern**: Functions organized in logical groups
- **Vanilla JS**: No dependencies, modern browser APIs

### Content Structure
- **Bilingual Content**: Mixed Spanish/English content throughout
- **Technical Documentation**: Comprehensive platform guides in Markdown
- **Visual Hierarchy**: Consistent heading structure and navigation

## CSS Variable System

The design system uses CSS custom properties for consistency:

```css
:root {
    --primary-color: #1976d2;      /* Primary blue */
    --secondary-color: #0d47a1;    /* Darker blue */
    --success-color: #4caf50;      /* Green for success states */
    --warning-color: #ff9800;      /* Orange for warnings */
    --error-color: #f44336;        /* Red for errors */
    
    /* Typography scale */
    --font-size-xs: clamp(0.75rem, 0.69rem + 0.31vw, 0.96rem);
    --font-size-sm: clamp(0.88rem, 0.81rem + 0.31vw, 1.06rem);
    /* ... etc */
}
```

## Content Management

### Image Requirements
- **Location**: All images must be placed in `/images/` directory
- **Naming**: Exact names specified in `images/README.md`
- **Format**: PNG or JPG, optimized for web (<500KB)
- **Dimensions**: Minimum 1200px width for screenshots

### Navigation Consistency
- **Fixed Header**: Consistent navigation across all pages
- **Active States**: Current page highlighted in navigation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **External Links**: GitHub links open in new tabs

### Content Localization
- **Mixed Languages**: Spanish and English content
- **Medical Terminology**: Consistent use of medical/technical terms
- **Cultural Adaptation**: Content adapted for healthcare professionals

## GitHub Pages Configuration

### Jekyll Settings
- **Theme**: Minimal theme with custom overrides
- **Plugins**: SEO tag, sitemap generation, feed generation
- **Collections**: Configured for future expansion
- **Markdown**: Kramdown processor with Rouge syntax highlighting

### SEO Optimization
- **Meta Tags**: Comprehensive meta descriptions and titles
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Automatic generation via Jekyll
- **Social Media**: Twitter Card and Open Graph meta tags

## Performance Considerations

### Optimization Strategies
- **Font Loading**: Preconnect to Google Fonts with display=swap
- **Image Optimization**: Responsive images with proper alt text
- **CSS Optimization**: Minification in production via Jekyll
- **JavaScript**: Minimal vanilla JS, modern browser features only

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader friendly navigation
- **Color Contrast**: WCAG AA compliant color combinations
- **Keyboard Navigation**: Full keyboard accessibility

## Common Development Tasks

### Adding New Pages
1. Create HTML file with proper navigation structure
2. Include consistent header/footer markup
3. Add page to navigation menus in all existing pages
4. Update `_config.yml` header_pages if needed

### Modifying Styles
1. Use existing CSS custom properties when possible
2. Follow component-based organization in `style.css`
3. Test responsive behavior at multiple breakpoints
4. Maintain accessibility color contrast ratios

### Content Updates
1. Edit HTML files directly for page content
2. Update Markdown files in `/presentation/` for structured content
3. Follow existing content patterns and hierarchy
4. Ensure bilingual consistency where applicable

## Testing and Validation

### Cross-browser Testing
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: Responsive design validation
- **GitHub Pages**: Test deployment before production

### Performance Testing
- **Page Speed**: Optimize for fast loading
- **Mobile Performance**: Test on actual devices
- **SEO Validation**: Use SEO analysis tools

The codebase emphasizes maintainable, accessible, and performant static site development with a focus on healthcare documentation and user experience.