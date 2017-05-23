console.log("foo");
const $ = require('jQuery');
const fs = require("fs");
const markdown = require("markdown").markdown;
const options = require("./settings");
let content = $("#content");
let image = $("#image img");
let pos = {
    image : 0,
    content: 0,
};
console.log("bar");
let contentlist = fs.readdirSync("./content");
let imagelist = fs.readdirSync("./images");
console.log("bez");
const imageRefresh = function () {
    image.attr("src","./images/"+imagelist[pos.image]);
    pos.image++;
    if (pos.image >= imagelist.length) {pos.image = 0;}
};

const contentRefresh = function() {
    fs.readFile("./content/"+contentlist[pos.content],"utf8",(err,data)=>{
        if (err) {console.log(err);}
        content.html(markdown.toHTML(data));
    });
    pos.content++;
    if (pos.content >= contentlist.length) {pos.content = 0;}
};

console.log("bin");
imageRefresh();
contentRefresh();

while (true) {
    for (let i=0; i<options.content.spacing;i++) {
        setTimeout(imageRefresh,options.image.display_time);
    }
    contentRefresh();
    image.fadeOut(400);
    content.fadeIn(400);
    setTimeout(()=>{
        content.fadeOut(400);
        image.fadeIn(400);
    },options.content.display_time);
}










