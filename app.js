var express = require('express')
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
});


var ProdutosModel = mongoose.model('Produtos', ProdutosSchema);


app.set('port', process.env.PORT || 1337);
app.use(express.static(path.join(__dirname + "/public")));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');




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


app.listen(app.get('port'), function() {
	console.log("Listen application on port: "+ app.get('port'));
});