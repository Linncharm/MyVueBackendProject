//const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow,globalShortcut,session} from 'electron'
import path from 'path'

import WinState from 'electron-window-state'

const createWindow = () => {
    const winState = new WinState({
        defaultWidth: 1000,
        defaultHeight: 800
    })
    const win = new BrowserWindow({
        ...winState,
    })

    win.loadURL('http://localhost:8888')
    winState.manage(win)
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