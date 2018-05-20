const treeData = require("./treeView1.json");

function buildList(data, isSub){
    var html = '';
    html += '<ul>';
    for(item in data){
        html += '<li>';
        if(data[item].type == 'folder'){ // An array will return 'object'
            if(isSub){
                html += '<a href="' + data[item].name + '">' + data[item].name + '</a>';
            } else {
                html += '<a href="#">'+ data[item].name+'</a>'; // Submenu found, but top level list item.
            }
            html += buildList(data[item].children, true); // Submenu found. Calling recursively same method (and wrapping it in a div)
        } else {
            html += '<a href="#">'+ data[item].name+'</a>' // No submenu
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
}
console.log(` <ul>
<li>
    <a href="#">Parent</a>${buildList(treeData )} </li> </ul>`)