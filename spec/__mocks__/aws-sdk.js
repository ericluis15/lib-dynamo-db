'use strict';

const aws = {
  DynamoDB: {
    DocumentClient: class DocumentClient {}
  }
};

aws.__setValue = (error, data) => {
  const mock = (params, callback) => {
    return callback(error, data);
  };

  aws.DynamoDB.DocumentClient.prototype.put = mock;
  aws.DynamoDB.DocumentClient.prototype.update = mock;
  aws.DynamoDB.DocumentClient.prototype.update_item = mock;
  aws.DynamoDB.DocumentClient.prototype.delete = mock;
  aws.DynamoDB.DocumentClient.prototype.get = mock;
  aws.DynamoDB.DocumentClient.prototype.scan = mock;
};

module.exports = aws;
