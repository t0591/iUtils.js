define("a",["require","exports","module"],function(e,t,n){console.log("这里是模块a"),n.exports={color:"这里是a的color"}}),define("b",["require","exports","module","a"],function(e,t,n){console.log("这里是模块b,依赖了模块a");var r=e("a");n.exports={color:"这里是b的颜色"}});