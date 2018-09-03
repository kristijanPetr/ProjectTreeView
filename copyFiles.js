const copydir = require("copy-dir");
const fs = require("fs");

const checkFolderExists = () => {
  let resourcePath = `${__dirname}/html/`;
  console.log("dirname", __dirname);
  let outputPath = `${process.cwd()}/output`;
  return new Promise((resolve, reject) => {
    fs.exists(outputPath, async exists => {
      if (!exists) {
        fs.mkdirSync(outputPath);
        copydir.sync(resourcePath, outputPath);
      }
      resolve(true);
    });
  });
};

module.exports = {
  checkFolderExists
};
