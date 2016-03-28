var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets;

// connect to the chat database
mongo.connect('mongodb://127.0.0.1/chat',function(err,db){
	if(err) throw err;

	client.on('connection', function(socket){
	// wait for input
	var col = db.collection('messages'),
		sendStatus = function(s) {
			socket.emit('status', s);
		};
	socket.on('input',function(data){
		var name = data.name;
		var message = data.message;
		var whitespacePattern = /^\s*$/;

		if(whitespacePattern.test(name) || whitespacePattern.test(message)){
			sendStatus('Name and Message both are required fields');
		}
		else{
			col.insert({name: name,message: message}, function(){
				sendStatus({
					message: "Message sent!",
					clear: true
				});
			
			});
		}


		




	});

	
});

});

