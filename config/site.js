var path = require('path');
module.exports = {
  appName: 'Site do Alberto Souza',
  subtitle: ' ',

  // default favicon, change in your project config/local.js
  favicon: path.resolve(__dirname, '..', 'files/public/favicon.png'),
  // logo public url path
  appLogo: '/public/project/logo.jpg',

  site: {
    homeBg :'/public/project/home-bg.jpg'
  },

  rss: {
    models: {
      article: { // model name
        // title of your xml file
        title: 'Posts - Alberto Souza',
        // description for your xml file
        description: 'RSS com meus ultimos posts sobre tecnologia e assuntos que gosto.',
        item: {
          title: 'title', // model attribute to get title
          description: 'about'  // model attribute to get description
        }
      }
    }
  }
}