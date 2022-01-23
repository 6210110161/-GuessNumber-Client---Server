var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

var db = {}

net.createServer(function (sock) {
    var state = 0
    var current_key = null
    sock.on('data', function (data)  {
        switch(state){
            case 0:
                if(data == 'HELLO'){
                    sock.write('HELLO')
                    srare = 1
                }
                break
            case 1:
                currebt_key = data
                sock.write("" + (db[current_key] || 0))
                state = 2
                break
            case 2:
                if(data == 'BYE'){
                    sock.close()
                    state = 3
                }else{
                    try{
                        let v = parseInt(data)
                        if(!db[current_key])                      
                            db[current_key] = 0
                        db[current_key] += v
                        sock.write("" + db[current_key])
                    }catch(e){
                        sock.write('INVALID')
                    }
                }
                break
            
        }
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);