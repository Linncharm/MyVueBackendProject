//const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow,globalShortcut,session} from 'electron'
import path from 'path'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
    })

    win.loadURL('http://localhost:8888')

}

function registerShortcuts(){
    globalShortcut.register('ctrl+shift+x',()=> {
        BrowserWindow.getFocusedWindow()?.webContents?.openDevTools();
    })
}

app.whenReady().then(()=>{
    createWindow()
    registerShortcuts()

    const vueDevToolsPath = 'C:/Users/linnc/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/7.6.4_0'
    session.defaultSession.loadExtension(vueDevToolsPath)
        .then(() => console.log('Vue Devtools loaded'))
        .catch(err => console.log('An error occurred: ', err));
})