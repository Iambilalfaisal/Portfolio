# Portfolio Website - M Bilal Faisal

Personal portfolio — AI Engineer & Full-Stack Developer | [portfolio-pi-peach-78.vercel.app](https://portfolio-pi-peach-78.vercel.app)

A modern, elegant, and highly professional portfolio website showcasing expertise in AI Engineering, Frontend Development, and Machine Learning.

## 🚀 Features

- **Modern Design**: Clean, minimalist design following world-class design standards
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **SEO Optimized**: Complete metadata, Open Graph, and Twitter card support
- **Performance**: Lightweight, fast, and optimized for production
- **Accessible**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Poppins (Google Fonts)

## 📦 Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

## 📁 Project Structure

```
Portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Testimonials.tsx
│   │   └── ThemeToggle.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Color Palette

**Palette A - Corporate Modern** (Currently Active):
- Primary: `#0A0F2C` (Deep Navy)
- Accent: `#4F9CFF` (Professional Blue)

The design uses only these two colors with various shades and opacity levels.

## 📝 Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Update name, title, and description

2. **About Section** (`src/components/About.tsx`):
   - Replace placeholder image
   - Update bio and skills

3. **Skills Section** (`src/components/Skills.tsx`):
   - Modify skill categories and technologies
   - Adjust skill levels

4. **Projects Section** (`src/components/Projects.tsx`):
   - Add your actual projects
   - Update images, descriptions, and links

5. **Experience Section** (`src/components/Experience.tsx`):
   - Add your work experience
   - Update roles, companies, and descriptions

6. **Contact Section** (`src/components/Contact.tsx`):
   - Update email, phone, and social links
   - Configure form submission endpoint

### Update CV Download

In `src/components/Hero.tsx`, update the CV download path:
```typescript
link.href = '/cv.pdf' // Replace with your actual CV path
```

### Change Color Palette

Edit `tailwind.config.js` to switch between palettes or create your own:

```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_PRIMARY_COLOR',
    // ... shades
  },
  accent: {
    DEFAULT: '#YOUR_ACCENT_COLOR',
    // ... shades
  },
}
```

## 🚀 Deployment

### Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   
   Or connect your GitHub repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Environment Variables** (if needed):
   - Add any environment variables in Vercel dashboard
   - Under Project Settings → Environment Variables

### Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```
   
   Or use Netlify's web interface:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

## 🔧 Configuration

### Form Submission

The contact form currently uses a placeholder submission. To integrate with a service:

1. **EmailJS**:
   - Sign up at [emailjs.com](https://www.emailjs.com)
   - Add your service ID and template ID
   - Update `Contact.tsx` with EmailJS integration

2. **Formspree**:
   - Sign up at [formspree.io](https://formspree.io)
   - Get your form endpoint
   - Update the form action in `Contact.tsx`

3. **Custom Backend**:
   - Create an API endpoint
   - Update the `handleSubmit` function in `Contact.tsx`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Performance Tips

- Images: Optimize all images before adding to the project
- Lazy Loading: Images are lazy-loaded by default
- Code Splitting: Vite handles code splitting automatically
- Minification: Production builds are automatically minified

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome!

## 📧 Contact

For questions or inquiries, please reach out through the contact form on the website.

---

**Built with ❤️ by M Bilal Faisal**

