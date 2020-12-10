const types = {
  Object: '[object Object]',
  Array: '[object Array]',
  String: '[object String]'
}

var objString = Object.prototype.toString;

let paths = [];
let path = [];
let nivel = 1;

const recursive = (obj) => {
  Object.keys(obj).forEach((k) => {
    const property = obj[k];
    const type = objString.call(property);

    if (type === types.Object) {
      nivel++;
      path.push(k);
      return recursive(property);
    }

    const temp = path.slice();
    temp.push(k);
    paths.push({
      path: temp,
      value: property
    });
  });
  for (let i = 1; i < nivel; i++) {
    nivel--;
    path.pop();
  }
}

module.exports = (properties) => {
  if (!properties && objString.call(properties) !== types.Object) {
    throw new TypeError('Not params provided or not a object');
  }

  paths = [];
  path = [];
  nivel = 1;
  recursive(properties);
  return paths;
};
