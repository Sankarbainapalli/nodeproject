var express=require('express');

 var saidulu=require('./app.js');
 var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var url='mongodb://localhost:27017/MongoDatabase';
mongoose.connect(url);
var app=express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended:true
}));


app.get('/home',function(req,res){
	res.send('Home page');
});

////////////Find the records from databse/////////

app.get('/getdata/:id', function(req, res) {
	saidulu.find({_id:req.params.id}).then(function(err,doc){
		if (err) {
			console.log(err);
		}
		// res.render({items:doc});
		 res.send({items:doc});
		 res.json(doc);
		 // console.log({items:doc})
    });
 });

///////Another way to use mongoose/////////////////////

// mongoose.model('saidulu',{name:String});

// app.get('/getdata1',function(req,res){
// 	mongoose.model('saidulu').find(function(err,users){
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.send(users);
// 	});
// })
/////////////////End here////////////////////
  

//////////insert into records//////////////////////

app.post('/insert', function(req, res) {
	var item=new saidulu();
	item.FirstName=req.body.FirstName;
	item.LastName=req.body.LastName;
	item.Email=req.body.Email;
	// 	console.log(req.body);	
    // console.log(item);
	  item.save(function(err,ite){
	    if (err) throw err;
	  		 res.send(ite);
	  		console.log('successfully inserted data');
	  	 

	 });
	});
////////////End here///////////////////


///////////updating the records////////////////

app.put('/update/:id',function(req,res){
	// var id=req.params.id;
	saidulu.findById({_id:req.params.id},function(err,data){
		if(err) throw err;
		data.FirstName='bainapalli';
		data.save(function(err,Data){
			if (err) throw err;
			res.send(Data);
		});
	});
});
////////////End here/////////////////

 /////////delete the records///////////////
 app.delete('/remove/:id',function(req,res){
 	saidulu.findOneAndRemove({_id:req.params.id},function(err,data){
      if(err) throw err;
      res.send(data); 		

 	});
 });
///////////////////////////////End here///////////

  


app.get('/about',function(req,res){
	res.send('about page');
});

app.get('/contact',function(req,res){
	res.send('Contact page');
});
app.listen(8667,function(){
	console.log('server started at port 8667');
});

