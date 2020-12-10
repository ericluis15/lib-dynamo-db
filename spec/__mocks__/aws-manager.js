'use strict';

const awsManager = jest.genMockFromModule('../../src/managers/aws-manager');

let _value = {
  someProperty: 'some-value'
};

awsManager.prototype.create = async () => {
  return _value;
};

awsManager.prototype.update = async () => {
  return _value;
};

awsManager.prototype.delete = async () => {
  return _value;
};

awsManager.prototype.get = async () => {
  return _value;
};

awsManager.prototype.scan = async () => {
  return _value;
};

awsManager.__setValue = (value) => {
  _value = value;
};

module.exports = awsManager;
