const {app, BrowserWindow} = require('electron');
const url = require("url");
const path = require("path");
let win; 
const createWindow = function (w,h,t) {
    win = new BrowserWindow({width:w,height:h});
    win.loadURL(url.format({
        pathname: path.join(__dirname, t),
        protocol: 'file:',
        slashes: true
    }));
    win.on("closed",()=>{win = null;});
}
app.on("ready",()=>{createWindow(800,600,"index.html")});
app.on("window-all-closed",()=>{
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate",()=>{
    if(win === null) {
        createWindow(800,600,"index.html");
    }
});