/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'sjsu': "URL('https://bpb-us-w2.wpmucdn.com/blogs.sjsu.edu/dist/f/94/files/2022/01/ADJ_sjsu-gate-dschmitz-111417-3154_flat-2.jpg')",
      }
    },
  },
  plugins: [],
}

