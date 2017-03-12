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
        title: 'Articles from Alberto Souza site - The coder!', // title of your xml file
        description: 'My newest site articles', // description for your xml file
        item: {
          title: 'title', // model attribute to get title
          description: 'about'  // model attribute to get description
        }
      }
    }
  }
}