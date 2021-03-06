const fs = require('fs');
const path = require('path');
const { checkFolderExists } = require('./copyFiles');

const diretoryTreeToObj = function(dir, done) {
  let results = [];

  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    let pending = list.length;

    if (!pending)
      return done(null, {
        name: path.basename(dir),
        type: 'folder',
        children: results
      });

    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, function(err, res) {
            results.push({
              name: path.basename(file),
              type: 'folder',
              children: res
            });
            if (!--pending) done(null, results);
          });
        } else {
          results.push({
            type: 'file',
            name: path.basename(file)
          });
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const dirTree = process.cwd() || __dirname;

const init = () => {
  diretoryTreeToObj(dirTree, function(err, res) {
    if (err) console.error(err);
    let output = {
      name: 'Parent',
      children: []
    };
    if (res) {
      output.children = res;
    }
    checkFolderExists().then((resp) => {
      fs.writeFile(
        `${dirTree}/output/output.js`,
        `var outputTreeData = ${JSON.stringify(output)}`,
        function(err) {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        }
      );
    });
  });
};

module.exports = { generateTree: init };
