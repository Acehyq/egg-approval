'use strict';


const { Err } = require('../constant');
const { MyError } = Err;


exports.isError = function(err) {
  return (err instanceof Error);
};


exports.isObject = function(obj) {
  return (obj instanceof Object);
};


exports.isNumber = function(number) {
  return (typeof number === 'number');
};

exports.isNegativeNumber = function(number) {
  return (typeof number === 'number' && number < 0);
};


exports.isMyError = function(err) {
  return (err instanceof MyError);
};
