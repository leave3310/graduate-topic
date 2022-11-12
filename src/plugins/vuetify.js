// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#2F6690',
            'primary-darken-1': '#16425B',
            secondary: '#81C3D7',
            'secondary-darken-1': '#3A7CA5',
            background: '#D9DCD6',
          }
        },
      },
    },
  })
