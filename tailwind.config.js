// /* eslint-env node */

// module.exports = {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
//   darkMode: "class", // or 'media' or 'class'
//   theme: {

//     extend: {

//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/aspect-ratio'),
//     require('@tailwindcss/typography'),
//     require('daisyui')
//   ],
// };

// tailwind.config.mjs
import forms from '@tailwindcss/forms'

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        // 🎨 Palette G-mony Blue
        primary: '#2563EB',      // Bouton principal
        secondary: '#93B6FE',    // Bouton secondaire
        background: '#F4F6FA',   // Fond clair
        heading: '#1E3A8A',      // Titres
        text: '#374151',         // Texte standard
        danger: '#EF4444',       // Erreur / alerte
        success: '#10B981',      // Succès
      },

      fontFamily: {
        // 🖋 Typographie principale
        sans: ['Poppins', 'sans-serif'], // ou 'Inter'
      },

      fontSize: {
        // 📏 Tailles fixes (optionnel si tu préfères clamp)
        h1: ['2rem', { lineHeight: '2.5rem' }],      // 32px
        h2: ['1.5rem', { lineHeight: '2rem' }],      // 24px
        h3: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        small: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        micro: ['0.8125rem', { lineHeight: '1.125rem' }], // 13px
      },

      boxShadow: {
        // ✨ Hover sur boutons
        soft: '0 2px 6px rgba(37, 99, 235, 0.25)', // pour hover
      },

      animation: {
        // 🔄 Animation loader
        spinSlow: 'spin 2s linear infinite',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        scaleIn: 'scaleIn 0.3s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    forms
  ]
}
