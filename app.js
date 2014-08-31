var express = require('express')
	, expressLayout = require('express-ejs-layouts')
	, path = require('path')
	, http = require('http')
	, mongoose = require('mongoose')

var app = express();



mongoose.connect('mongodb://localhost/lojavirtual');

var Schema = mongoose.Schema;
	// , ObjectId = Schema.ObjectId;

var ProdutosSchema = new Schema({
	name : String
  , price : Number
  , description: String
  , status : Boolean
  , ref : Number
});


var ProdutosModel = mongoose.model('Produtos', ProdutosSchema);


app.set('port', process.env.PORT || 1337);
app.use(express.static(path.join(__dirname + "/public")));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.set('layout', 'default');


app.use(expressLayout);
// app.use(express.urlencoded);




app.get('/', function(req, res){

	return ProdutosModel.find(function(err, produtos){
		if (! err) {
			res.render('index', {produtos: produtos});
		} else {
			return console.log(err);
		}
	});

	//res.render('index');
});


app.get('/product/:id', function(req, res){

	return ProdutosModel.find({ref: req.param('id')}, function(err, produto) {
		if (! err) {
			res.render('details', {produtos: produto, layout: "layout-detail"});
		} else {
			return console.log(err);
		}
	});

});

app.get('/search', function(req, res){
	res.render('search', {search: req.param('s')});
});



app.listen(app.get('port'), function() {
	console.log("Listen application on port: "+ app.get('port'));
});