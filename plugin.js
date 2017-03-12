/**
 * We.js plugin file, use to load routes and configs
 *
 * @param  {[type]} projectPath current project path
 * @param  {Object} Plugin      we.js Plugin class
 * @return {Object}             intance of we.js Plugin class
 */

var homeMetatagCache = '',
  defaultMetatagForAllRoutes = '';

function setHomeMetadaTagCache (req) {
  var hostname = req.we.config.hostname,
    image = 'http://albertosouza.net/api/v1/image/large/'+
      '1446602432171_d48337b0-8297-11e5-8c5c-990af0c4a238.jpg',
    description = 'Site sobre desenvolvimento de sistemas, Node.js, Javascript, '+
      'internet das coisas, links para as redes sociais e outros conteúdos do Alberto Souza';

  homeMetatagCache +=
    // Default tags:
    '<meta name="description" content="'+description+'">'+
    '<meta name="keywords" '+
      'content="Node.js,JavaScript,IoT,Beacon,Internet das Coisas,desenvolvimento de sistemas,Alberto Souza">'+
    // OG tags:
    '<meta property="og:url" content="'+hostname+'" />'+
    '<meta property="og:title" content="Site do Alberto Souza" />' +
    '<meta property="og:description" '+
      'content="'+description+'" />'+
    '<meta property="og:type" content="website" />'+
    // Schema.org markup for Google+
    '<meta itemprop="name" content="Site de Alberto Souza">'+
    '<meta itemprop="description" content="'+description+'">'+
    '<meta itemprop="image" content="'+image+'">'+
    // Twitter Card data
    '<meta name="twitter:title" content="Site do Alberto Souza">'+
    '<meta name="twitter:description" content="'+description+'">'+
    // Twitter Summary card images must be at least 120x120px
    '<meta name="twitter:image" content="'+image+'">'+
    // image metatag
    '<meta property="og:image" content="'+image+'">'+
    '<meta property="og:image:type" content="image/jpeg">'+
    '<meta property="og:image:width" content="640">'+
    '<meta property="og:image:height" content="640">';
}

function setDefaultMetatagsForAllRoutes() {
        // OG
  defaultMetatagForAllRoutes =
  '<meta property="og:locale" content="pt_BR">'+
  '<meta property="og:site_name" content="Site do Alberto Souza" />'+
  '<meta name="author" content="Alberto Souza">'+
  // Twitter
  '<meta name="twitter:card" content="summary">'+
  '<meta name="twitter:site" content="@albertosouza_js">'+
  '<meta name="twitter:creator" content="@albertosouza_js">'+
  // Facebook
  '<meta property="fb:app_id" content="469050989784203" />'+
  '<meta property="fb:admins" content="100001859791004" />';
}

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);

  plugin.setRoutes({
    'get /': {
      name: 'main.index',
      controller: 'article',
      model: 'article',
      action: 'find',
      template: 'article/find',
      title: 'Alberto Souza',
      /**
       * Home metadata tag handler
       */
      metatagHandler: function homeMetatagHandler(req, res, next) {

        if (!homeMetatagCache) {
          setHomeMetadaTagCache(req);
        }

        res.locals.metatag += homeMetatagCache;

        next();
      }
      // layoutName: 'default'
      // titleHandler  : 'i18n',
      // titleI18n: 'main.index',
    }
  });

  plugin.events.on('we:after:load:express', function(we) {
    we.express.use(function defaultMetatagsForAllRoutes(req, res, next) {
      if (!defaultMetatagForAllRoutes) {
        setDefaultMetatagsForAllRoutes(req);
      }

      res.locals.metatag += defaultMetatagForAllRoutes;

      next();
    })
  });

  return plugin;
};