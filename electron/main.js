/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path')
const { app, BrowserWindow, ipcMain, globalShortcut, clipboard, nativeImage } = require('electron')
const screenshot = require('screenshot-desktop')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.loadFile(path.join(__dirname, '../dist/index.html'))
  win.loadURL('http://localhost:5173')
}

app.whenReady().then(() => {
  globalShortcut.unregisterAll()

  createWindow()

  ipcMain.handle('setkey', (event, v) => {
    const value = JSON.parse(v)

    if (value.old.length) {
      removeKeyListener(value.old.map((i) => i.v).join('+'))
    }

    if (value.new.length) {
      return addKeyListener(value.new.map((i) => i.v).join('+'), () => {
        if (value.type === 'shot') {
          doScreenshot()
        } else if (value.type === 'left' || value.type === 'right') {
          doWinAlign(value.type)
        }
      })
    }

    return false
  })
})

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll()
})

function addKeyListener(key, cb) {
  try {
    return globalShortcut.isRegistered(key) ? false : globalShortcut.register(key, cb)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
}
function removeKeyListener(key) {
  if (globalShortcut.isRegistered(key)) {
    globalShortcut.unregister(key)
  }
}

// 截图 API
async function doScreenshot() {
  const img = await screenshot()
  const image = nativeImage.createFromBuffer(img)
  clipboard.writeImage(image)
}

// 设置窗口对其
function doWinAlign(type) {
  console.log('doWinAlign', type)
}
