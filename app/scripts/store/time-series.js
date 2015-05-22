let Reflux = require('reflux');
let url = require('url');
let ajax = require('../lib/ajax');
let Actions = require('../actions');
let apiUrl = require('../config').apiUrl;

module.exports = Reflux.createStore({
  init () {
    this.listenTo(Actions.emphasize, this.onEmphasize.bind(this));
    this.listenTo(Actions.deemphasize, this.onDeemphasize.bind(this));
  },

  onEmphasize (key) {
    this.trigger({ emphasis: { [key]: true } });
  },

  onDeemphasize (key) {
    this.trigger({ emphasis: { [key]: false } });
  },

  onChooseRegion ({interval, state, district}) {
    // setup the appropriate endpoint url
    let path = ['months', interval];
    if (state && district) {
      path.push('districts', state + '-' + district, 'villages');
    } else if (state) {
      path.push('states', state, 'districts');
    } else {
      path.push('states');
    }
    let api = url.resolve(apiUrl, path.join('/'));

    // make the ajax call, emitting the result with this.trigger
    let self = this;
    ajax({ url: api }, function (err, result) {
      if (err) {
        return self.trigger(err);
      }

      self.trigger({
        error: null,
        results: result,
        emphasis: {}
      });
    });
  }
});
