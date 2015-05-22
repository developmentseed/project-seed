var Reflux = require('reflux');
var url = require('url');
var nets = require('nets');
var apiUrl = require('../config').apiUrl;

module.exports = Reflux.createStore({
  onChooseRegion ({interval, state, district}) {
    var path = ['months', interval];
    if (state && district) {
      path.push('districts', state + '-' + district, 'villages');
    } else if (state) {
      path.push('states', state, 'districts');
    } else {
      path.push('states');
    }

    var self = this;
    nets({
      url: url.resolve(apiUrl, path.join('/'))
    }, function (err, resp, body) {
      console.log('api response', err, resp, body.toString('utf8'));
      if (err) {
        return self.trigger({error: err, statusCode: null, results: []});
      }

      try {
        body = JSON.parse(body);
        if (body.error) {
          body.results = [];
        } else {
          body = { results: body };
        }
        self.trigger(body);
      } catch (e) {
        self.trigger({
          error: 'Error parsing API response',
          results: [],
          rawResponse: body.toString('utf8')
        });
      }
    });
  }
});
