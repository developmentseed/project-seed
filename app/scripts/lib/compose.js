/**
 * `compose(f)(g)` yields a new function that will first apply g,
 * and then apply f.  In other words:
 * `compose(f)(g)` is equivalent to `(x,y,z...) => f(g(x,y,z...))`
 */
let compose = f => g => (...args) => f(g.apply(null, args));

module.exports = compose;
