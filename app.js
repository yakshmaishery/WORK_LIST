const {app,BrowserWindow, ipcMain, webContents} = require("electron")
const path = require("path")

let root;

const AppWindow = () => {
    root = new BrowserWindow({
        webPreferences:{
            webSecurity:true,
            nodeIntegration:false,
            preload:path.join(app.getAppPath(),"Renderer.js")
        },
        minHeight:600,
        minWidth:700,
        frame:false
    })
    root.loadFile("index.html")
    root.on("ready-to-show", () => {root.maximize()})
}

// hardware accerlation
app.disableHardwareAcceleration()

// Initial App Start
app.on("ready", () => {AppWindow()})

// Min Action
ipcMain.on("minaction", () => {root.minimize()})

// Max Action
ipcMain.on("maxaction", (e,arr) => {
    if(root.isMaximized()){
        root.unmaximize()
        e.reply("max_action",{data:false})
    }
    else{
        root.maximize()
        e.reply("max_action",{data:true})
    }
})

// Close App
ipcMain.on("close_App", () => {app.quit()})