//鼠标滑轮
var old_mouse_pos=[],new_mouse_pos=[],x_rotate=0,z_rotate=0,move_speen=0.5;
function mousewheel(e) {
    var fov = camera.fov,near=1;
    e.preventDefault();
    //e.stopPropagation();
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            fov -= (15 < fov ? 1 : 0);
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            fov += (fov < 75 ? 1 : 0);
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail > 0) { //当滑轮向上滚动时
            fov -= 1;
        }
        if (e.detail < 0) { //当滑轮向下滚动时
            fov += 1;
        }
    }
    camera.fov = fov;
    camera.updateProjectionMatrix();
    //renderer.render(scene, camera);
    //updateinfo();
}
//鼠标点击开始
function mousedown(event) {
old_mouse_pos=[event.screenX,event.screenY]
 }
//鼠标点击停止
function mouseup(event) {

    new_mouse_pos=[event.screenX,event.screenY]
    //console.log(new_mouse_pos)
    var horizontal_value=new_mouse_pos[0]-old_mouse_pos[0]
    var vertical_value=new_mouse_pos[1]-old_mouse_pos[1]
    if(Math.abs(vertical_value)<Math.abs(horizontal_value)){
        if(horizontal_value>0){
            z_rotate=obj.rotation.z-move_speen
        }if(horizontal_value<0){
            z_rotate=obj.rotation.z+move_speen
        }
    }if(Math.abs(horizontal_value)<Math.abs(vertical_value)){
        if(vertical_value>0){
            x_rotate=obj.rotation.x+move_speen
        }if(vertical_value<0){
            x_rotate=obj.rotation.x-move_speen
        }
    }
    //鼠标右键重置旋转
    if(event.button==2){
        rotation_animation(0,0);
        //取消右键点击的默认事件
        document.oncontextmenu = function(e){
               return false;
         }
    //     左键旋转
    }if(event.button==0){
        rotation_animation(x_rotate,z_rotate)
    }


}
//鼠标旋转动画
function rotation_animation(value1,value2){
    var animation = new TWEEN.Tween(obj.rotation)
    animation.to({z:value2,x:value1},500)
     animation.easing(TWEEN.Easing.Sinusoidal.InOut)
    animation.start()
}