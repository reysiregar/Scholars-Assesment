export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '28px',
        'full': '9999px',
      },
      colors: {
        m3: {
          primary: '#0b57d0',
          'primary-hover': '#0842a0',
          'on-primary': '#ffffff',
          'primary-container': '#d3e3fd',
          'on-primary-container': '#041e49',

          secondary: '#00639b',
          'secondary-container': '#c2e7ff',
          'on-secondary-container': '#001d35',

          surface: '#f8fafd',
          'surface-container': '#f0f4f9',
          'surface-container-high': '#e9eef6',
          'surface-container-highest': '#e1e8f2',
          'surface-variant': '#dfe3eb',
          'on-surface': '#1f1f1f',
          'on-surface-variant': '#444746',

          outline: '#747775',
          'outline-variant': '#c4c7c5',

          green: '#146c2e',
          'green-container': '#c4eed0',
          'on-green-container': '#072100',

          yellow: '#8f4c00',
          'yellow-container': '#ffe08a',
          'on-yellow-container': '#2e1500',

          red: '#b3261e',
          'red-container': '#f9dedc',
          'on-red-container': '#410e0b',
        },
        google: {
          blue: '#1a73e8',
          'blue-dark': '#1557b0',
          'blue-light': '#e8f0fe',
          red: '#ea4335',
          'red-light': '#fce8e6',
          yellow: '#f9ab00',
          'yellow-light': '#fef7e0',
          green: '#34a853',
          'green-light': '#e6f4ea',
          gray: '#5f6368',
          'gray-light': '#f1f3f4',
        }
      },
      boxShadow: {
        'm3-1': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        'm3-2': '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
        'm3-3': '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
        'm3-4': '0 2px 3px 0 rgba(60, 64, 67, 0.3), 0 6px 10px 4px rgba(60, 64, 67, 0.15)',
      }
    },
  },
  plugins: [],
}
