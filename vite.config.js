const path = require('path')

const root = resolve(__dirname, 'src')


export default {
  root,
  base: '/cookieClicker/',
    root,
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
  build: {
    outDir: '../dist'
  },
  server: {
    port: 8080
  }
}