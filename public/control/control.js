// 初始化一个 WebSocket 对象
var ws = new WebSocket("ws://192.168.31.29:3001");

// 建立 web socket 连接成功触发事件
ws.onopen = function () {
  // 使用 send() 方法发送数据
  ws.send("control");
  $('.control').click(function(){
	  console.log(this.id);
	  ws.send("control_"+this.id);
	})
  console.log("数据发送中...");
};

// 接收服务端数据时触发事件
ws.onmessage = function (evt) {
  var msg = evt.data;
  console.log(msg);
  if(msg!='game'&&msg!='control'){
	$('#value').html(msg); 
	 console.log("数据已接收..."+msg);
   }
};

// 断开 web socket 连接成功触发事件
ws.onclose = function () {
  console.log("连接已关闭...");
};
