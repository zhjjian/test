 var snakePosArr = [];
var changeMove="right";
var loop;
var foodPos=[180,20];
var value=0;
var addValue;

// 初始化一个 WebSocket 对象
var ws = new WebSocket("ws://localhost:3001");

// 建立 web socket 连接成功触发事件
ws.onopen = function () {
  // 使用 send() 方法发送数据
  ws.send("game");
  addValue=function(){
	 ws.send("game_"+value);
  }
  console.log("数据发送中...");
};

// 接收服务端数据时触发事件
ws.onmessage = function (evt) {
  var msg = evt.data;
  console.log(msg);
   if(msg!='game'&&msg!='control'){
	changeMove = msg; 
	 console.log("数据已接收..."+msg);
   }
  
};

// 断开 web socket 连接成功触发事件
ws.onclose = function () {
  console.log("连接已关闭...");
};







 function keyDown(event) {
   
   //console.log(event.keyCode);
        if (event.keyCode == "87" ) {
            //按下W键
            
            if(!(changeMove == "down")){
                changeMove = "up";
            }
            
        } else if (event.keyCode == "68") {
            //按下D键
            
             if(!(changeMove == "left")){
                changeMove = "right";
                }
        } else if (event.keyCode == "83") {
            //按下S键
             
             if(!(changeMove == "up")){
            changeMove = "down";}
        } else if (event.keyCode == "65") {
            //按下A键
            
             if(!(changeMove == "right")){
            changeMove = "left";}
        } else if (event.keyCode == "38") {
            //按下w键
            
           if(!(changeMove == "down")){
                changeMove = "up";
            }
        } else if (event.keyCode == "39") {
            //按下d键
            
           if(!(changeMove == "left")){
                changeMove = "right";
                }
        } else if (event.keyCode == "40") {
            //按下s键
            
            if(!(changeMove == "up")){
            changeMove = "down";}
        } else if (event.keyCode == "37") {
            //按下A键
            
             if(!(changeMove == "right")){
            changeMove = "left";}
        }else if (96<Number(event.keyCode)&&Number(event.keyCode)<106 ) {
            //速度控制
            let level = (Number(event.keyCode)-96)*100;
            //console.log(event.keyCode);
            change(level);
        }
    }
    document.onkeydown = keyDown;
    document.getElementById('canvas').onmousedown=keyDown;


    // 改变canvas的默认大小

    function canvasHeightWidth(){
     var canvas = document.getElementById('canvas');
     var c = document.getElementById('c');   
    canvas.width=c.clientWidth;//注意：没有单位
    canvas.height=c.clientHeight;//注意：没有单位

    }

// 创建蛇
   function createSnake(x,y){
    var canvas = document.getElementById('canvas');
    var draw = canvas.getContext('2d');
    draw.beginPath();
    draw.fillStyle="#FF0000";


    draw.fillRect(x,y,20,20);
draw.fillStyle="#EEEE00";
    draw.fillRect(x-20,y,20,20);
    draw.fillRect(x-40,y,20,20);
    draw.closePath();
    snakePosArr[0]=[x+20,y];
    snakePosArr[1]=[x,y];
    snakePosArr[2]=[x-20,y];
    
    loop=setInterval("moveDirection()",500);
}

//  清空画布，重新绘制，达到移动蛇效果
function loopCanvas(){
    var c = document.getElementById('c');
    var canvas = document.getElementById('canvas'); 
    var draw = canvas.getContext('2d');
    draw.clearRect(0, 0, c.clientWidth, c.clientHeight);
    for(var i=0;i<snakePosArr.length;i++){
        let x1 = snakePosArr[i][0];
        let y1 = snakePosArr[i][1];
        if(i==0){
             draw.fillStyle="#FF0000";
         }else{
            draw.fillStyle="#EEEE00";
         }
        
        draw.fillRect(x1,y1,20,20);
    } 
    draw.fillStyle="#00ff00";

    draw.fillRect(foodPos[0],foodPos[1],20,20);

}
//判断移动方向
function moveDirection(){
    if(changeMove=="right"){
        let newPos=[];
        newPos[0]=snakePosArr[0][0]+20;
        newPos[1]=snakePosArr[0][1];
        snakePosArr.unshift(newPos);
        snakePosArr.pop();
    }else if(changeMove=="left"){
        let newPos=[];
        newPos[0]=snakePosArr[0][0]-20;
        newPos[1]=snakePosArr[0][1];
        snakePosArr.unshift(newPos);
        snakePosArr.pop();
    }else if(changeMove=="up"){
        let newPos=[];
        newPos[0]=snakePosArr[0][0];
        newPos[1]=snakePosArr[0][1]-20;
        snakePosArr.unshift(newPos);
        snakePosArr.pop();
    }else if(changeMove=="down"){
        let newPos=[];
        newPos[0]=snakePosArr[0][0];
        newPos[1]=snakePosArr[0][1]+20;
        snakePosArr.unshift(newPos);
        snakePosArr.pop();
    }
    loopCanvas();
    mainControl(); 
}

// 创建食物
function food(){
    
    var canvas = document.getElementById('canvas'); 
    var draw = canvas.getContext('2d');

    var c = document.getElementById('c');
    let x1 = Math.floor(Math.random()*100)*20;
    let y1 = Math.floor(Math.random()*100)*20;
    if(x1>=c.clientWidth-20 || y1>=c.clientHeight-20){
        food();
        return;
    }
    draw.beginPath();
    draw.fillStyle="#00ff00";
    draw.fillRect(x1,y1,20,20);
    draw.closePath();
    foodPos[0]=x1;
    foodPos[1]=y1;
}

// 主判断（是否吃到食物、是否碰到墙）
function mainControl(){
    var c = document.getElementById('c');
    var x=snakePosArr[0][0];
    var y=snakePosArr[0][1];
    // 是否吃到食物
    if(x==foodPos[0] && y==foodPos[1]){
        let pos=snakePosArr[snakePosArr.length-1];
        snakePosArr.push(pos);
        food();
        value++;
		document.getElementById('value').textContent=value;
		addValue();
        
    }
    // 是否碰到墙
     if(x < 0 || x >= c.clientWidth || y < 0 || y >= c.clientHeight){
        end("墙可吃不了！！！");
    }
    // 是否碰到自己身体
    for(var j=1;j<snakePosArr.length;j++){
        if(x==snakePosArr[j][0] && y==snakePosArr[j][1]){

            end("自己都吃啊！！！");
            return;
        }

    }
}
//结束
function end(str){

    alert(str);
    clearInterval(loop);
          snakePosArr = [];
 changeMove="right";
 value=0;
 
 foodPos=[180,20];
       
        canvasHeightWidth();
        createSnake(100,20);
        change(500);
    document.getElementById("button").textContent = "重来";
    return;
}
   canvasHeightWidth();
   
  // 开关
function sign(){
    var button=document.getElementById("button");
    if(button.textContent=="开始"){
        document.getElementById("button").textContent = "重来";
        canvasHeightWidth();
        createSnake(100,20);
    }else if(button.textContent=="重来"){
        clearInterval(loop);
          snakePosArr = [];
 changeMove="right";
 value=0;
 
 foodPos=[180,20];
       
        canvasHeightWidth();
        createSnake(100,20);
        change(500);
    }
    
} 


// 改变速度
function change(level){
    if(loop){
        clearInterval(loop);
     let time = Number(level);
    loop=setInterval("moveDirection()",time);
    let str = "当前速度："+(level/100)+"挡";
    document.getElementById('value').textContent=value;
    document.getElementById("level").textContent = str;
    document.getElementById("level1").textContent = "level"+(level/100);
    document.getElementById("level2").textContent = "level"+((level/100)+1);
    
    console.log(time)
    }
    
}
   

   
   