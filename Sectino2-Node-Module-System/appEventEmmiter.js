const EventEmitter = require('events');

const Logger = require('./loggerMODULE')
const logger = new Logger();

//Register a lsitener
logger.on('messageLogged', (arg) => { //e or eventArg
    console.log(`listener has been caled`, arg)
})

logger.log('message')