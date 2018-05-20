const treeData = require("./treeView.json");

const traverseData = (treeData, parent = "") => {
  // parent !== "" ? console.log("PArent ", parent) : false;
  console.log("</ul>");
  treeData.map(item => {
    if (item.type === "file") {
      console.log("<li> <a href=''>" + item.name + "</a></li>");
      // console.log(item);
    } else {
      //   console.log("DIR", item.name);
      console.log("<li> <a href=''>" + item.name + "</a></li>");
      console.log("<ul>");
      traverseData(item.children, parent + "/" + item.name);
    }
  });
};

const recursion = function(data, is_child) {
  var output = "";
  if (typeof is_child == "undefined") {
    is_child = false;
  }

  // start:ul (only one of these)
  if (is_child == false) {
    output += "<ul>\n";
  }

  // end:ul
  var len = data.length;
  for (var i = 0; i < len; i++) {
    // If this is a child loop, and its the first iteration, it
    // has a special case:
    // <ul>
    // <li>first</li>
    // <li>second<ul>
    var first_child_item = false;
    if (is_child == true && i == 0) {
      first_child_item = true;
    }

    // open:main wrapper
    if (first_child_item == true) {
      output += "<li>" + data[i].name + "</li>\n";
      output += "<ul>\n";

      continue;
    } else {
      if (is_child) {
        // When there is a child with another beside it
        output += "<li>" + data[i].name;
      } else {
        // the main low level call
        output += '<ul class="low_level">\n';
        output += "<li>" + data[i].name;
      }
    }

    // open:children seek

    if (data[i].type === "folder" && data[i].children.length > 0) {
      output += recursion(data[i].children, true);
    }

    // close pending tags
    if (typeof data[i + 1] == "undefined") {
      for (var j = 0; j < i; j++) {
        output += "</ul>\n";
        output += "</li>\n";
      }
    }
  }
  // end main:ul (only one of these)
  output += "</ul>\n";

  return output;
};
let output = traverseData(treeData);
console.log(output);
