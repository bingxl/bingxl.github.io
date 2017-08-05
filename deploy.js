var argv = process.argv;
let fs = require('fs');
let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();
let com = argv.splice(2);
var doex = require('child_process').exec; 
let eventList = [];
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
function exec (com, callback){
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

function log(str) {
    console.log(str);
}
// log(process);
event.on('exec', function() {
    if(hasEventDo){
        return -1;
    }
    if(eventList.length){
        let eventName = eventList.shift();
        exec(eventName);
        return;
    } else {
        log("exec EventList is empty");
    }
});