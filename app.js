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
            trailers: [{
                name: 'name',
                date: Date.now(),
                votes: 123123,
                link: 'https://www.youtube.com/watch?v=p9nqQuu4lmQ',
                category: {
                    type: 'Video',
                    enum: ['Photo', 'Video']
                }
            },{
                name: 'name',
                date: Date.now(),
                votes: 123123,
                link: 'https://www.youtube.com/watch?v=p9nqQuu4lmQ',
                category: {
                    type: 'Video',
                    enum: ['Photo', 'Video']
                }
            },{
                name: 'name',
                date: Date.now(),
                votes: 123123,
                link: 'https://www.youtube.com/watch?v=p9nqQuu4lmQ',
                category: {
                    type: 'Video',
                    enum: ['Photo', 'Video']
                }
            }]
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

const addTour = () => {
    console.log("tour");
    var location = document.forms["tourForm"]["tourLoc"].value;
    var date = document.forms["tourForm"]["tourDate"].value;
    var tickets = document.forms["tourForm"]["tickets"].value;

    console.log(location);
    console.log(date);
    console.log(tickets);
};

const addTrailer = () => {
    console.log("trailer");
    var name = document.forms["trailerForm"]["trailerName"].value;
    var date = document.forms["trailerForm"]["trailerDate"].value;
    var link = document.forms["trailerForm"]["trailerLink"].value;
    var type = document.forms["trailerForm"]["trailerType"].value;

    console.log(name);
    console.log(date);
    console.log(link);
    console.log(type);
};

const addPress = () => {
    console.log("press");
    var title = document.forms["pressForm"]["pressTitle"].value;
    var date = document.forms["pressForm"]["pressDate"].value;
    var description = document.forms["pressForm"]["pressDes"].value;
    var link = document.forms["pressForm"]["pressLink"].value;
    var thumbnail = document.forms["pressForm"]["pressThumb"].value;

    console.log(title);
    console.log(date);
    console.log(description);
    console.log(link);
    console.log(thumbnail);
};

app.post('/addTour', (req, res) => {
    console.log(req.body);
});

app.post('/addTrailer', (req, res) => {
    console.log(req.body)
});

app.post('/addPress', (req, res) => {
    console.log(req.body)
});

// Admin tools
app.get('/admin', (req, res) => {
    res.render('Admin/admin.html', {
        page: 'admin',
        port: app.get('port'),
        addTour: addTour,
        addTrailer: addTrailer,
        addPress: addPress
    });
});

// Kick start our server
app.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});
