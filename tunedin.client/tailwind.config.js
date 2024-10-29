/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {},
  },
  plugins: [],
    safelist: [
    // Base text sizes
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
    'text-7xl', 'text-8xl', 'text-9xl',
    
    // XS breakpoint
    'xs:text-xs', 'xs:text-sm', 'xs:text-base', 'xs:text-lg', 'xs:text-xl',
    'xs:text-2xl', 'xs:text-3xl', 'xs:text-4xl', 'xs:text-5xl', 'xs:text-6xl',
    'xs:text-7xl', 'xs:text-8xl', 'xs:text-9xl',
    
    // SM breakpoint
    'sm:text-xs', 'sm:text-sm', 'sm:text-base', 'sm:text-lg', 'sm:text-xl',
    'sm:text-2xl', 'sm:text-3xl', 'sm:text-4xl', 'sm:text-5xl', 'sm:text-6xl',
    'sm:text-7xl', 'sm:text-8xl', 'sm:text-9xl',
    
    // MD breakpoint
    'md:text-xs', 'md:text-sm', 'md:text-base', 'md:text-lg', 'md:text-xl',
    'md:text-2xl', 'md:text-3xl', 'md:text-4xl', 'md:text-5xl', 'md:text-6xl',
    'md:text-7xl', 'md:text-8xl', 'md:text-9xl',
    
    // LG breakpoint
    'lg:text-xs', 'lg:text-sm', 'lg:text-base', 'lg:text-lg', 'lg:text-xl',
    'lg:text-2xl', 'lg:text-3xl', 'lg:text-4xl', 'lg:text-5xl', 'lg:text-6xl',
    'lg:text-7xl', 'lg:text-8xl', 'lg:text-9xl',
    
    // XL breakpoint
    'xl:text-xs', 'xl:text-sm', 'xl:text-base', 'xl:text-lg', 'xl:text-xl',
    'xl:text-2xl', 'xl:text-3xl', 'xl:text-4xl', 'xl:text-5xl', 'xl:text-6xl',
    'xl:text-7xl', 'xl:text-8xl', 'xl:text-9xl',
    
    // 2XL breakpoint
    '2xl:text-xs', '2xl:text-sm', '2xl:text-base', '2xl:text-lg', '2xl:text-xl',
    '2xl:text-2xl', '2xl:text-3xl', '2xl:text-4xl', '2xl:text-5xl', '2xl:text-6xl',
    '2xl:text-7xl', '2xl:text-8xl', '2xl:text-9xl',
    
    // Font weights
    'font-bold', 'font-semibold', 'italic', 'underline',

    // Alignments
    'text-center', 'text-left', 'text-right',
  ],
}