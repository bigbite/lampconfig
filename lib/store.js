const fs = require('fs');

const writeFile = (path, data) => {
  fs.writeFile(path, JSON.stringify(data), 'utf8', (err) => {
    if (err) throw err;
  });
};

module.exports = (dir, filename) => {
  const store = {};
  store.path = `${dir}/${filename}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    writeFile(store.path, {});
  }

  store.save = (key, value) => {
    fs.readFile(store.path, 'utf8', (err, data) => {
      if (err) throw err;
      obj = JSON.parse(data);
      obj[key] = value;
      writeFile(store.path, obj)
    });
  };

  store.get = (key, callback) => {
    return fs.readFile(store.path, 'utf8', (err, data) => {
      obj = JSON.parse(data);
      callback(obj[key]);
    });
  };

  return store;
};
