var bunyan = require('bunyan'),
    bunyanLogentries = require('bunyan-logentries');

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers
  };
}
    
module.exports = bunyan.createLogger({
  name: 'sedimentary',
  streams: [
    {
      level: 'info',
      stream: bunyanLogentries.createStream({token: process.env.BUNYAN_TOKEN}),  // log INFO and above to bunyanLogentries
      type: 'raw'
    },
    {
      level: 'error',
      path: '../error.log'  // log ERROR and above to a file
    }
  ],
  serializers: {
    req: reqSerializer
  },
});