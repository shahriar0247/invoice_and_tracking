const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let npmProcess; // Reference to the npm start process
let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadURL(`file://${path.join(__dirname, 'loading.html')}`);

    mainWindow.on('closed', () => {
        if (npmProcess) {
            npmProcess.kill();
        }
    });
}

async function startElectronApp() {
    createMainWindow();

    try {
        npmProcess = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

        const serverURL = 'http://localhost:3000';
        let serverReady = false;

        while (!serverReady) {
            try {
                const fetch = await import('node-fetch');
                await fetch.default(serverURL);
                serverReady = true;
                mainWindow.loadURL('http://localhost:3000/invoices');
            } catch (error) {
                console.log('Server is not reachable yet. Retrying...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    } catch (error) {
        console.error('Error starting Electron app:', error);
    }
}

app.whenReady().then(startElectronApp);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        startElectronApp();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
