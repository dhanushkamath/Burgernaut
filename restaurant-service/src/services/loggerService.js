var winston = require('winston');

logLevels = {
    fatal: 0,
    crit: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
}

// set default log level. Logs with log level below this won't be printed (as per logLevels defined above)
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

var customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'blue',
    fatal: 'red'
};



var logger = winston.createLogger({
    level: LOG_LEVEL,
    levels: logLevels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.timestamp({
        format: 'DD-MM-YYYY hh:mm:ss A'
      }),
      winston.format.printf(nfo => {
        return `${nfo.timestamp} - ${nfo.level}: ${nfo.message}`
      })
    ),
    transports: [
      new winston.transports.Console()
    ]
  })

winston.addColors(customColors);

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
};

// Extend logger object to properly log 'Error' types
var origLog = logger.log;

logger.log = function (level, msg) {
  var objType = Object.prototype.toString.call(msg);
  if (objType === '[object Error]') {
    origLog.call(logger, level, msg.toString());
  } else {
    origLog.call(logger, level, msg);
  }
};

module.exports = {
    logger: logger
}