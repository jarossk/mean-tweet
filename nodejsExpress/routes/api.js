var express = require('express');
var router = express.Router();

// Used for routes that must be authenticated 
function isAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  
  // allows all get request methods
  if(req.method === "GET") {
    return next();
  }
  if(isAuthenticated()) {
    return next();
  }
  
  // if the user is not authenticated then redirect hom to the login page
  return res.redirect('#/login');
};

router.use('/posts', isAuthenticated);

// api for all posts
router.route('/posts')

  // create a new post
  .post(function(req, res) {
    
    //TODO create a new post in the database
    res.send({message:"TODO creates a new post in the database"});
  })
  
  // get a posts
  .get(function(req, res) {
    
    //TODO get all the posts in the database
    res.send({message:"TODO get all the posts in the database"})
  })
  
router.route('/posts/:id')
  
  .put(function(req, res) {
   return res.send({message:'TODO modify an existing post by using param ' + req.param.id});
  })
  
  .get(function(req, res) {
    return res.send({message:'TODO get an existing post by using param ' + req.param.id});
  })
  
  .delete(function(req, res) {
    return res.send({message:'TODO delete an existing post by using param ' + req.param.id});
  });
  
module.exports = router;