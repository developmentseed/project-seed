let nets = require('nets');

/**
 * Make an API request, and call back with error or a successful
 * API response.
 * @param options - A `request`-like options object.
 * @param cb - An (error, result) callback, called with error either for
 * network error or API error response, otherwise with parsed JSON response
 * body.
 */
module.exports = function ajax (options, cb) {
  nets(options, function (err, resp, body) {
    if (err) {
      return cb({error: err});
    }

    try {
      body = JSON.parse(body);
      if (body.error) {
        return cb(body);
      }
      return cb(null, body);
    } catch (e) {
      cb({
        error: 'Error parsing API response',
        results: [],
        rawResponse: body.toString('utf8')
      });
    }
  });
};
