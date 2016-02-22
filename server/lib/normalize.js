// Normalize port
/**
 * Normalize port
 * @param port {Number String} Port to normalize
*/
const debug = require('debug')('lib:normalize');
module.exports = (port) => {
  debug('Normalizing port %o...', port)
  if (typeof port === 'string') {
    debug("Typeof port: string");
    debug('Coverting to number & returning...');
    return parseInt(port);
  } else if (typeof port === 'number') {
    debug("Typeof port: number");
    debug('Returning it...')
    return port;
  } else {
    debug('Port given is not a number or a string!')
    throw new TypeError('Port given is not a number or a string!');
  }

}
