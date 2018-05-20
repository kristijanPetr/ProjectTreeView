// // List all files in a directory in Node.js recursively in a synchronous fashion
// var tree = {};
// var walkSync = function(dir, filelist) {
//   var fs = fs || require("fs"),
//     files = fs.readdirSync(dir);
//   filelist = filelist || [];
//   files.forEach(function(file) {
//     if (fs.statSync(dir + file).isDirectory()) {
//       //   console.log("DIR", dir + file + "/");
//       tree[dir + file + "/"] = [];
//       filelist = walkSync(dir + file + "/", filelist);
//     } else {
//       // tree[dir + file + "/"].push(file);
//       filelist.push(file);
//     }
//   });
//   //   console.log(filelist);
//   return filelist;
// };

// walkSync("./src/");
// console.log(tree);

var fs = require("fs");
var path = require("path");

var diretoryTreeToObj = function(dir, done) {
  var results = [];

  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    var pending = list.length;

    if (!pending)
      return done(null, {
        name: path.basename(dir),
        type: "folder",
        children: results
      });

    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, function(err, res) {
            results.push({
              name: path.basename(file),
              type: "folder",
              children: res
            });
            if (!--pending) done(null, results);
          });
        } else {
          results.push({
            type: "file",
            name: path.basename(file)
          });
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

var dirTree = "../";

diretoryTreeToObj(dirTree, function(err, res) {
  if (err) console.error(err);

  console.log();

  fs.writeFile("./treeView.json", JSON.stringify(res), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});
