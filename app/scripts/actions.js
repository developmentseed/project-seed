var Reflux = require('reflux');

module.exports = function Actions () {
  let actions = Reflux.createActions({
    'chooseRegion': {}
  });
  return actions;
};
