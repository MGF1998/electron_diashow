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

const imageRefresh = function () {
    image.attr("src","./images/"+imagelist[pos.image]);
    pos.image++; pos.cycle++;
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

const contentSequence = function(){
    contentRefresh();
    $(image).fadeOut(300);
    $(content).fadeIn(300);
    setTimeout(()=>{
        $(image).fadeIn(300);
        $(content).fadeOut(300);
        interval = setInterval(imageInterval,options.image.display_time);
    },options.content.display_time);
};
const imageInterval = function() {
    if (pos.cycle >= options.content.spacing) {
        pos.cycle = 0;
        clearInterval(interval);
        contentSequence();
    } else {
        imageRefresh();
    }
};

let interval = setInterval(imageInterval,options.image.display_time);