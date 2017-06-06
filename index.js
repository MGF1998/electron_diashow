const $ = require('jQuery');
const fs = require("fs");
const markdown = require("markdown").markdown;
const options = require("./settings");
let content = $("#content");
let image = $("#image img");
let nextimage = $("#nextimage img");
let pos = {
    image : 0,
    nextimage: 0,
    content: 0,
    cycle: 0,
};
let contentlist = fs.readdirSync("./content");
let imagelist = fs.readdirSync("./images");

const imageRefresh = function () {
    pos.nextimage = pos.image+1;
    if (pos.nextimage >= imagelist.length) {pos.nextimage = 0;}
    nextimage.show();
    nextimage.attr("src","./images/"+imagelist[pos.nextimage]);
    image.fadeOut(options.image.fade_time,()=>{
        image.attr("src","./images/"+imagelist[pos.image]);
        image.show();
        nextimage.hide();
    });
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
    $(image).fadeOut(options.content.fade_time);
    $(content).fadeIn(options.content.fade_time);
    setTimeout(()=>{
        $(image).fadeIn(options.content.fade_time);
        $(content).fadeOut(options.content.fade_time);
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