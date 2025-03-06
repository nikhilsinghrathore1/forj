import dedent from 'dedent';

const DEPENDENCIES = {
  dependencies: {
    react: "^18.0.0",
    "react-dom": "^18.0.0",
    axios: "^1.7.9",
    arweave: "1.15.5",
    "arweave-wallet-kit": "1.1.0",
    "@permaweb/aoconnect": "^0.0.63",
    esbuild: "0.25.0",
    "esbuild-wasm": "0.25.0",
    "warp-arbundles": "^1.0.4",
    prettier: "3.1.0",
    "react-router-dom": "6.28.0",
    "react-tinder-card": "1.6.4",
    "@react-spring/web": "9.7.5",
    "styled-components": "6.1.15",
    "tw-to-css": "0.0.12",
    eslint: "^9.21.0",
    "eslint-config-prettier": "9.1.0",
    "eslint-plugin-import": "2.29.0",
    "eslint-plugin-prettier": "5.0.1",
    "eslint-plugin-react": "7.33.2",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "@vitejs/plugin-react": "^4.3.4",
    vite: "^6.2.0",
    typescript: "~5.7.2",
    "react-swipeable": "^6.1.0",
    'framer-motion': '^4.1.17',
    "react-toastify": "11.0.5"
  },
  devDependencies: {
    "@types/node": "20.12.13",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@eslint/js": "^9.21.0",
    "@typescript-eslint/eslint-plugin": "6.13.1",
    "@typescript-eslint/parser": "6.13.1",
    "typescript-eslint": "^8.24.1",
    "@vitejs/plugin-react-swc": "3.7.0"
  }
};

export default {

  DEFAULT_FILE:{
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="font-['Inter']">
    <div id="root"></div>
  </body>
</html>`,
    },
    '/App.css': {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.75rem;
  }
 
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

.animate-in {
  animation: animate-in 0.5s ease-out;
}

@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    },
    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`,
    },
    '/App.js': {
      code:"" ,
    },
  },
  DEPENDANCY: {
    postcss: '^8',
    tailwindcss: '^3.4.1',
    autoprefixer: '^10.0.0',
    uuid4: '^2.0.3',
    'tailwind-merge': '^2.4.0',
    'tailwindcss-animate': '^1.0.7',
    'lucide-react': '^0.469.0',
    'react-router-dom': '^7.1.1',
    'date-fns': '^4.1.0',
    'framer-motion': '^12.0.6',
    'locomotive-scroll': '^5.0.0-beta.21',
    '@permaweb/aoconnect': '^0.0.63',
    arweave: '^1.15.5',
    '@google/generative-ai': '^0.21.0',
    'react-chartjs-2': '^5.3.0',
    'chart.js': '^4.4.7',
    'axios':'^1.7.9',
    'class-variance-authority': '^0.7.0',
    'clsx': '^2.0.0',
    '@tailwindcss/typography': '^0.5.10',
  },
  
  
};


 