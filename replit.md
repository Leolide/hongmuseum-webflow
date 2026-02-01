# Hong Museum Website

## Overview

This is a static website for Hong Museum (弘美术馆), a contemporary art museum located in Wenzhou, China. The site is built using Webflow and exported as static HTML, CSS, and JavaScript files. It serves as the museum's public-facing web presence, showcasing exhibitions, providing visitor information, and supporting bilingual content in Chinese and English.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Site Pattern**
- The website follows a static site architecture with pre-rendered HTML pages exported from Webflow
- No server-side rendering or dynamic content generation
- Pages are served directly via Python's built-in HTTP server (`python3 -m http.server 5000`)

**Page Structure**
- Bilingual support through duplicate page files (e.g., `index.html` for Chinese, `home-en.html` for English)
- Exhibition pages follow naming convention: `{exhibition-name}-cn.html` and `{exhibition-name}-en.html`
- Core pages include: home, about, guide, join, and individual exhibition pages
- Current exhibitions: 偏食/Digestive Ethics (2026), 妈妈/MAMA, 送流水/The Currents We Carry, 十一种床/Eleven Kinds of Beds, 训练祖宗/The Forebears Are Born
- Residency programs: 走归计划/Zou Gui Project, 在地回响/Situated Resonance (2025)

**Styling Approach**
- CSS is organized into three main files:
  - `normalize.css` - Browser reset and normalization
  - `webflow.css` - Webflow framework styles and icon fonts
  - `hongmuseum.webflow.css` - Custom museum-specific styles with custom fonts (Casta, Biotif, Chapter)
- Custom CSS effects include noise texture animations and visual effects embedded in HTML files

**JavaScript**
- Minimal JavaScript usage, primarily Webflow's runtime (`js/webflow.js`)
- jQuery 3.5.1 loaded from CDN for Webflow interactions
- Custom scripts for cursor effects and page transitions (from T.RICKS)

### Content Organization

**Navigation Structure**
- Logo-centered navbar with dropdown menus for exhibitions
- Language toggle between Chinese and English versions
- Navigation links: Guide/抵达, About/关于, Exhibitions/展览, Join/加入

**Asset Management**
- Images stored in `images/` directory with responsive srcset support
- Fonts stored in `fonts/` directory (referenced by CSS)
- Lottie animations stored as JSON in `documents/` directory

### Localization Strategy

- Full page duplication for each language rather than dynamic translation
- Chinese as primary language (index.html serves as main entry)
- English pages use `-en` suffix naming convention
- All content including navigation, metadata, and body text is translated per-page

## External Dependencies

**CDN Resources**
- Google Fonts API for web fonts (Droid Serif, Open Sans, PT Serif)
- Google WebFont Loader (v1.6.26)
- jQuery 3.5.1 from Cloudfront CDN
- Webflow assets from uploads-ssl.webflow.com

**Webflow Platform**
- Site originally built and designed in Webflow
- Exported as static files for self-hosting
- Webflow badge hidden via CSS

**No Backend Dependencies**
- No database required
- No server-side API integrations
- No authentication system
- Content is entirely static and managed through HTML files