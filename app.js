import express from 'express';
import nunjucks from 'nunjucks';

const app = express();

// Setup nunjucks templating engine


app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });

  // Sets Nunjucks as the Express template engine
  app.set('engine', env);

  const randomHash = () => Math.random() * 0xffffffff | 0;
  const counter = () => {
    let count = 0;
    return {
      increment: () => { count++; },
      print: () => { return count; },
      reset: () => { count = 0; },
    };
  };

  const storage = () => {
    let store = {};
    return {
      getItem: (key) => store[key],
      setItem: (key, value) => { store[key] = value; },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; },
    };
  };
  env.addGlobal('counter', counter());
  env.addGlobal('randomHash', randomHash);
  env.addGlobal('storage', storage());

  next();
});

// Home page
app.get('/', (req, res) => {
  res.render('Home/home.html', {
    page: 'home',
    port: app.get('port'),
  });
});

// tour dates
app.get('/tour', (req, res) => {
    res.render('Tour/tour.html', {
        page: 'tour',
        port: app.get('port'),
    });
});

// specials
app.get('/specials', (req, res) => {
  res.render('Specials/specials.html', {
    page: 'specials',
    port: app.get('port'),
  });
});

// submit videos
app.get('/submit', (req, res) => {
    res.render('Submit/submit.html', {
        page: 'submit',
        port: app.get('port'),
    });
});

// watch trailers
app.get('/watch', (req, res) => {
    res.render('Watch/watch.html', {
        page: 'watch',
        port: app.get('port'),
    });
});

// shop
app.get('/shop', (req, res) => {
    res.render('Shop/shop.html', {
        page: 'shop',
        port: app.get('port'),
    });
});

// Kick start our server
app.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});
