var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Commerce');

// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, '/Client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

var PetSchema = new mongoose.Schema({
 name: {required: true, type: String, minlength: [3, "Name must be min 3 charters"]},
 qty: {type: Number, default: 0},
 price: {type: Number, default: 0},
}, {timestamps: true})

mongoose.model('Product', PetSchema);
var Product = mongoose.model('Product');

// Use native promises
mongoose.Promise = global.Promise;

app.all('*', function(req, res, next){
  console.log(req.url);
  next();
})

app.post('/new', function(req, res) {
  console.log(req.body);
  let product = new Product({name: req.body.name, qty: req.body.qty, price: req.body.price});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  product.save(function(err, db_res) {
    if(err){
      res.json({error: err});
    } else { // else console.log that we did well and then redirect to the root route
      res.json({success: "successfully added a product!"});
    }
  })
})

app.get('/products/all', function(req, res) {
     // sorted by type
      Product.find().sort({_id: 1}).exec(function(err, db_res){
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({products: db_res});
      }
    });
});

app.get('/products/:id', function(req, res) {
      Product.find({_id: req.params.id}, function(err, db_res) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({products: db_res});
      }
    });
});

app.put("/products/edit/:id", function (req, res){
    Product.findByIdAndUpdate({_id: req.body._id}, {$set: {name: req.body.name, qty: req.body.qty, price: req.body.price}}, function(err, db_res){
    // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
        res.json({error: err});
      } else { // else console.log that we did well and then redirect to the root route
        res.json({success: "successfully updated a product"});
      }
    });
});


app.delete('/products/:id', function (req, res){
    Product.findByIdAndRemove({_id: req.params.id}, function(err, pet) {
      if(err){
        res.json({error: err});
      }else{
        res.json({success: "Delete successfully"});                                                                                         
      }
    });
});

app.all("*",(req,res,next) => {
  res.sendfile(path.resolve('./Client/dist/index.html'));
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000!");
})
