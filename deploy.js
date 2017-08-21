/**
 * @type {array} 命令行输入命令数组
 */
var argv = process.argv;
let fs = require('fs');
let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();

/**
 * @type {Array} 获取命令行输入参数
 */
let com = argv.splice(2);
var doex = require('child_process').exec; 

/**
 * @type {Array} 事件队列
 */
let eventList = [];

/**
 * @type {Boolean} 事件执行标志
 */
let hasEventDo = false;

if(com.toString()){
    com.forEach(function (str){
        eventList.push(str);
    })
}else{
    ['hexo clean', 'hexo generate', 'gulp', 'hexo deploy'].forEach(
        function(str){
             eventList.push(str);
        }
    )
}

event.emit('exec');

/**
 * 执行命令行
 * @param {string} com 执行的命令参数
 */
function exec (com){
    hasEventDo = true;
    doex(com, function(err,stdout,stderr){
        if(err) {
            log('! has some error:'+stderr);
        } else {
            log(stdout);
            hasEventDo = false;
            event.emit('exec');
        }
    });
}

/**
 * 将数据打印到控制台
 * @param {*} str 打印数据
 */
function log() {
    console.log.apply(null, arguments);
}
// log(process);
event.on('exec', function(delayNnm = 0) {
    if(hasEventDo){
        // 如果已有事物执行则延迟五秒
        if(delayNum > 1){
            // 已循环一次后则认为有问题，结束调用
            log("已有事件占用太长时间");
            return -1;
        }
        setTimeout(function(){
            event.emit('exec', delayNum++);
        },5000);
    }
    if(eventList.length){
        let eventName = eventList.shift();
        exec(eventName);
        return;
    } else {
        log("exec EventList is empty");
    }
});