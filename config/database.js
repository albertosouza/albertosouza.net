
const isWin = process.platform === 'win32';

let configs = {
  port: process.env.PORT || 4040,
  database: {
    prod: {
      uri: process.env.DATABASE_URL || 'mysql://project:project@127.0.0.1:3906/project',
      dialect: 'mysql',
      protocol: 'mysql'
    },
    dev: {
      dialect: 'sqlite',
      storage: 'database.sqlite',
      // logging: console.log
    },
    test: {
      dialect: 'sqlite',
      storage: 'database-test.sqlite',
    }
  }
}

if (process.env.REDIS_URL) {
  const session = require('express-session');
  const RedisStore = require('connect-redis')(session);
  const redis = require('redis');

  // change host and port to your redis cfgs:

  //CREATE REDIS CLIENT
  const redisClient = redis.createClient({
    // [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
    url: process.env.REDIS_URL
  });

  // redis client error handler:
  redisClient.on('error', function (err) {
    console.log('REDIS Error > ' + err);
  });

  configs.session = {
    secret: process.env.REDIS_SECRET || '123810380sdapi090',
    cookie  : {
      maxAge  : 31536000000 // one year
    },
    store: new RedisStore({
      // pass the session store settings, see the session store docs
      client: redisClient,
      url: process.env.REDIS_URL,
      ttl: 31557600, // 1 year, this is set by secconds
      db: Number(process.env.REDIS_DB) || 10
    }),
    resave: false, // don't save session if unmodified
    saveUninitialized: false
  }
} else if (process.env.NODE_ENV != 'production') {
  const session = require('express-session');
  const SQLiteStore = require('connect-sqlite3')(session);

  configs.session = {
    secret: 'as8da0s9d8asd0',
    store: new SQLiteStore({
      table: 'ssessions',
      db: 'sessions.sqlite',
      dir: process.cwd()
    }),
    resave: false, // don't save session if unmodified
    saveUninitialized: false
  };
} else {
  if (!isWin) configs.session = null;
}

module.exports = configs;
