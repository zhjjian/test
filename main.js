
// 引入WebSocket模块

var ws = require('nodejs-websocket')

var PORT = 3001

 

// on就是addListener，添加一个监听事件调用回调函数

// Scream server example:"hi"->"HI!!!",服务器把字母大写
var page1,page2;
var server = ws.createServer(function(conn){

    

    conn.on("text",function(str){
		
        console.log(str)
		if(str === "control"){
			page1=conn;
			
		}
		if(str === "game"){
				page2=conn;
			}
		var arr=str.split('_')
		if(arr.length>1){
			if(arr[0]=== "control" && page2){
				page2.sendText(arr[1])
			}else if(arr[0]=== "game" && page1){
				page1.sendText(arr[1])
			}
		}else{
			conn.sendText(str)  
		}
        

        

    })

    conn.on("close",function(code,reason){

        console.log("connection closed")

    })

    conn.on("error",function(err){

        console.log("handle err")

        

    })

}).listen(PORT)

 

console.log('websocket server listening on port ' + PORT)
module.exports = server;