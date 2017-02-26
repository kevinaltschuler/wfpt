
// tour dates
app.get('/tour', (req, res) => {

    res.render('Tour/tour.html', {
        page: 'tour',
        port: app.get('port'),
    });
});
