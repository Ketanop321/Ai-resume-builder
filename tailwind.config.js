module.exports = {
    darkMode: ['class'],
    content: [
    './index.html',  // Make sure your HTML entry file is included
    './src/**/*.{js,jsx,ts,tsx}',  // This should cover all your JavaScript/TypeScript files
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
