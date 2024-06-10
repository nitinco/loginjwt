import { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#ffffff',
          secondary: '#f0f0f0',
        },
        dark: {
          primary: '#000000',
          secondary: '#1a1a1a',
        },
      },
    },
  },
  // Add other Tailwind CSS configurations here
};

export default config;
