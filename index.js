const fs = require("fs");
const markdown = require("markdown").markdown;
const options = require("./settings");
//Example: console.log(markdown.toHTML("Hello *World*!"));
let content = document.getElementById("content");
let image = document.getElementById("image");
let imagelist, contentlist;
fs.readdir("./images",(err,data)=>{
    if (err) {console.log(err);}
    imagelist = data;
});
fs.readdir("./content",(err,data)=>{
    if (err) {console.log(err);}
    contentlist = data;
});
fs.readFile("./content/test.md","utf8",(err,data)=>{
    if (err) {console.log(err);}
    content.innerHTML = markdown.toHTML(data);
});
