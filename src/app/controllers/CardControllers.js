class CardControllers {

    // [GET] /courses
    index(req, res, next) {
        res.redirect('/api')
      };
    
    api(req, res, next) {
        res.render('home')
    }
}

module.exports = new CardControllers;
