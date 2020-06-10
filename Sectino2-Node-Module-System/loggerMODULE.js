const EventEmitter = require('events');

var url = 'http://mylogger.io/log'

class Logger extends EventEmitter {
    log(message) {
        // send http request
        console.log(message)
    
        // Making a noise, produce - signaling
        this.emit('messageLogged', {id: 1, url: 'http://www.google.com'});    
    }
}



module.exports = Logger;