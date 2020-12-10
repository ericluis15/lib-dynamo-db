const path = require('path');
const fs = require('fs');

const directorySrc = path.join(__dirname, 'src');
const directoryMocks = path.join(__dirname, 'spec/__mocks__');

const getFileList = (directory, fileList = []) => {
  fs.readdirSync(directory).forEach((file) => {
    if (fs.statSync(path.join(directory, file)).isDirectory()) {
      return getFileList(path.join(directory, file), fileList);
    }
    fileList.push({ name: file, directory });
  });
  return fileList;
};

getFileList(directorySrc).forEach((file) => {
  if (file.name.search('.js') >= 0 && fs.existsSync(path.join(directoryMocks, file.name))) {
    // The module factory of `jest.mock()` is not allowed to reference any out-of-scope variables.
    // variable names prefixed with `mock` (case insensitive) are permitted.
    const mockPath = path.join(directoryMocks, file.name);
    jest.mock(path.join(file.directory, file.name), () => jest.requireActual(mockPath));
  }
});
