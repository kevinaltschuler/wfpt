import express from 'express';
import nunjucks from 'nunjucks';
import sass from 'node-sass';
import sassMiddleware from 'node-sass-middleware';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Tour from './models/tourSchema';
import Trailer from './models/trailerSchema';
import Press from './models/pressSchema';
import submitBlocks from './submitBlocks';
import specialBlocks from './specialBlocks';
import homeBlocks from './homeBlocks';


const app = express();
const models = require('./models/models');

app.use(bodyParser.urlencoded({extended: true}));

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

app.use(sassMiddleware({
  src: './views',
  dest: './public',
  debug: true,
  outputStyle: 'compressed'
}),
express.static('./public'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

// Home page
app.get('/home', (req, res) => {
    Press.find( (err, presses) => {
        if(err) {
            console.log(err);
        }

        res.render('Home/home.html', {
            page: 'home',
            port: app.get('port'),
            presses: presses,
            blocks: homeBlocks,
        });
    });
});

// specials
app.get('/specials', (req, res) => {
  res.render('Specials/specials.html', {
    page: 'specials',
    port: app.get('port'),
    blocks: specialBlocks
  });
});

// submit videos
app.get('/submit', (req, res) => {
    res.render('Submit/submit.html', {
        page: 'submit',
        port: app.get('port'),
        blocks: submitBlocks
    });
});

// tour
app.get('/tour', (req, res) => {
    Tour.find( (err, tours) => {
        if(err) {
            console.log(err);
        }

        res.render('Tour/tour.html', {
            page: 'tour',
            port: app.get('port'),
            tours: tours
        });
    });
});

// watch trailers
app.get('/watch', (req, res) => {
    Trailer.find( (err, trailers) => {
        if(err) {
            console.log(err);
        }

        res.render('Watch/watch.html', {
            page: 'watch',
            port: app.get('port'),
            trailers: trailers
        });
    });
});

// shop
app.get('/shop', (req, res) => {
    res.render('Shop/shop.html', {
        page: 'shop',
        port: app.get('port'),
    });
});

app.post('/addTour', (req, res) => {
    var Tour = models.tour;

    var t = new Tour({
        location: req.body.location,
        date: req.body.date,
        ticketsAvailable: req.body.ticketsAvailable,
        ticketsSold: 0
    });

    t.save(function(err) {
        if (err) throw err;

        console.log('saved successfully!');
        res.redirect('/admin');
    });
});

app.post('/addTrailer', (req, res) => {
    var Trailer = models.trailer;

    var t = new Trailer({
        name: req.body.name,
        date: req.body.date,
        votes: 0,
        link: req.body.link,
        description: req.body.description,
        category: req.body.category
    });

    t.save(function(err) {
        if (err) throw err;

        console.log('saved successfully!');
        res.redirect('/admin');
    });
});

app.post('/addPress', (req, res) => {
    var Press = models.press;

    var p = new Press({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        link: req.body.link,
        thumb: req.body.thumb
    });

    p.save(function(err) {
        if (err) throw err;

        console.log('saved successfully!');
        res.redirect('/admin');
    });
});

// Admin tools
app.get('/admin', (req, res) => {
    res.render('Admin/admin.html', {
        page: 'admin',
        port: app.get('port'),
    });
});

// Kick start our server
app.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});
