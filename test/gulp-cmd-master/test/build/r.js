define('s_gulp-cmd_2',function(){
    return 's2';
});

define('s',function(){
    return 's';
});

define('r',['s','s_gulp-cmd_2'],function( require ){
    var s = require('s'),
        s2 = require('s_gulp-cmd_2');

    return s + ', ' + s2 + ' is done';
});

