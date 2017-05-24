const $ = require('jQuery');
const fs = require("fs");
const markdown = require("markdown").markdown;
const options = require("./settings");
let content = $("#content");
let image = $("#image img");
let pos = {
    image : 0,
    content: 0,
    cycle: 0,
};
let contentlist = fs.readdirSync("./content");
let imagelist = fs.readdirSync("./images");
let timer;

const imageRefresh = function () {
    image.attr("src","./images/"+imagelist[pos.image]);
    pos.image++; pos.cycle++;
    if (pos.image >= imagelist.length) {pos.image = 0;}
    if (pos.cycle >= options.content.spacing) {clearInterval(timer)}
};

const contentRefresh = function() {
    fs.readFile("./content/"+contentlist[pos.content],"utf8",(err,data)=>{
        if (err) {console.log(err);}
        content.html(markdown.toHTML(data));
    });
    pos.content++;
    if (pos.content >= contentlist.length) {pos.content = 0;}
};

imageRefresh();
contentRefresh();

let nextContent = new Promise(function(resolve,reject){
    timer = setInterval(imageRefresh,options.image.display_time);
});


/* for (let i=0; i<options.content.spacing;i++) {
    setTimeout(imageRefresh,options.image.display_time);
}
console.log("bar");
contentRefresh();
image.fadeOut(400);
content.fadeIn(400);
setTimeout(()=>{
    console.log("bez");
    content.fadeOut(400);
    image.fadeIn(400);
},options.content.display_time);
*/









