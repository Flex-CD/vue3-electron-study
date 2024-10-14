import { app, BrowserWindow } from 'electron'

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadURL('http://localhost:5173/')
}

app.on('ready', createWindow)
