var http=require('http');

function onRequest(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('server created');
	res.end();
}
http.createServer(onRequest).listen(9999);
console.log('server started at port 6666');