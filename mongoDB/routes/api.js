var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

// Used for routes that must be authenticated 
function isAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  
  // allows all get request methods
  if(req.method === "GET") {
    return next();
  }
  if(req.isAuthenticated()) {
    return next();
  }
  
  // if the user is not authenticated then redirect hom to the login page
  return res.redirect('/#login');
};

router.use('/posts', isAuthenticated);
// api for all posts
router.route('/posts')

// create a new post
  .post(function(req, res) {
    var post = new Post();
    post.text = req.body.text;
    post.created_by = req.body.created_by;
    post.save(function(err, post) {
      if(err) {
        return res.send(500, err);
      }
      return res.json(post);
    });
  })
// get a posts
  .get(function(req, res) {
    Post.find(function(err, posts) {
      if(err) {
        return res.send(500, err);
      }
      return res.send(posts);
    });
  });
  
router.route('/posts/:id')
// get specified post
  .get(function(req, res) {
     Post.findById(req.params.id, function(err, post) {
       if(err)
         res.send(err);
       res.json(post);
     });   
  })
// updates specified post
  .put(function(req, res) {
     Post.findById(req.params.id, function(err, post) {
       if(err)
         res.send(err);
       
       post.created_by = req.body.created_by;
       post.text = req.body.text;
       
       post.save(function(err, post) {
         if(err)
           res.send(err);
         res.json(post);
       }); 
     });
  })
//deletes the post 
  .delete(function(req, res) {
    Post.remove({ _id: req.params.id}, function(err) {
      if(err)
        res.send(err);
      res.json("deleted :(");
    });
  });
  
module.exports = router;