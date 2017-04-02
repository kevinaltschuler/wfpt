import express from 'express';
import nunjucks from 'nunjucks';
import sass from 'node-sass';
import sassMiddleware from 'node-sass-middleware';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import Tour from './models/tourSchema';
import Trailer from './models/trailerSchema';
import Press from './models/pressSchema';
import submitBlocks from './submitBlocks';
import specialBlocks from './specialBlocks';
import homeBlocks from './homeBlocks';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

const ADMIN_NAME = 'admin';
const ADMIN_PASS = 'pass';

const authenticate = new BasicStrategy((user, pass, done) =>
    done(null, user === ADMIN_NAME && pass === ADMIN_PASS ? ADMIN_NAME : false)
);

passport.use(authenticate);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const models = require('./models/models');

app.use(passport.initialize());
app.use(passport.session());

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

// success page
app.get('/success', (req, res) => {
    res.render('Response/success.html', {
        page: 'success',
        port: app.get('port'),
    });
});

// failure page
app.get('/failure', (req, res) => {
    res.render('Response/failure.html', {
        page: 'failure',
        port: app.get('port'),
    });
});

app.post('/addTour', (req, res) => {
    var Tour = models.tour;

    var t = new Tour({
        event: req.body.event,
        location: req.body.location,
        date: req.body.date,
        ticketsAvailable: req.body.ticketsAvailable,
        ticketsSold: 0
    });

    t.save(function(err) {
        if (err) {
            console.log(err);
            res.redirect('/admin');
            return;
        }

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
        if (err) {
            console.log(err);
            res.redirect('/admin');
            return;
        }

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
        if (err) {
            console.log(err);
            res.redirect('/admin');
            return;
        }

        console.log('saved successfully!');
        res.redirect('/admin');
    });
});

app.post('/delete/tour/:id', (req, res) => {
    var Tour = models.tour;
    Tour.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/admin');
            return;
        }

        console.log('removed successfully!');
        res.redirect('/admin');
    });
});

app.post('/delete/trailer/:id', (req, res) => {
    var Trailer = models.trailer;
    Trailer.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/admin');
            return;
        }

        console.log('removed successfully!');
        res.redirect('/admin');
    });
});

app.post('/delete/press/:id', (req, res) => {
    var Press = models.press;
    Press.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/admin');
            return;
        }

        console.log('removed successfully!');
        res.redirect('/admin');
    });
});


// Admin tools
app.get('/admin', passport.authenticate('basic', { session: false }), (req, res) => {
    Tour.find( (err, tours) => {
        if(err) {
            console.log(err);
        }

        Trailer.find( (err, trailers) => {
            if(err) {
                console.log(err);
            }

            Press.find( (err, presses) => {
                if(err) {
                    console.log(err);
                }

                res.render('Admin/admin.html', {
                    page: 'admin',
                    port: app.get('port'),
                    tours: tours,
                    trailers: trailers,
                    presses: presses
                });
            });
        });
    });
});

app.get('/login', function(req, res) {
    res.render('Login/login.html', { user : req.user });
});

app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
});

app.use('/sendSubmission', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'wfptsubmissions@gmail.com', // Your email id
            pass: 'waterfowler1' // Your password
        }
    });

    const html = `
        <p>New submission from ${req.body.fullName}</p>
        <li>Email Address: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Personal Website: ${req.body.website}</li>
        <li>Submission Link: ${req.body.submissionLink}</li>
        <li>Password: ${req.body.password}</li>
   `;

    const mailOptions = {
        from: 'wfptsubmissions@gmail.com', // sender address
        to: 'max.j.rais@gmail.com', // list of receivers
        subject: 'New Submission from ' + req.body.fullName, // Subject line
        html: html // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/failure');
        }
        else{
            console.log('Message sent: ' + info.response);
            console.log('submission sent');
            res.redirect('/success');
        }
    });
});

app.use('/sendRequest', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'wfptsubmissions@gmail.com', // Your email id
            pass: 'waterfowler1' // Your password
        }
    });

    const html = `
        <p>New host request from ${req.body.fullName}</p>
        <li>Email Address: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Address: ${req.body.address}</li>
        <li>Organization: ${req.body.organization}</li>
   `;

    const mailOptions = {
        from: 'wfptsubmissions@gmail.com', // sender address
        to: 'max.j.rais@gmail.com', // list of receivers
        subject: 'New Hosting Request from ' + req.body.fullName, // Subject line
        html: html // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/failure')
        }
        else{
            console.log('Message sent: ' + info.response);
            console.log('submission sent');
            res.redirect('/success');
        }
    });
});


app.use('/vote/:id', (req, res) => {
    const Trailer = models.trailer;
    Trailer.findOneAndUpdate({_id: req.params.id}, {$inc: { votes: 1 }}, function(err) {
        if(err){
            console.log("Something wrong when updating data!");
            res.redirect('/failure');
        }

        console.log("vote successful!");
        res.redirect('/success');
    });
});

// 404 page
app.get('/*', (req, res) => {
    res.render('Response/404.html', {
        page: '404',
        port: app.get('port'),
    });
});

// Kick start our server
app.listen(app.get('port'), () => {
  console.log('Server started on port', app.get('port'));
});
