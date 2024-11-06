import readline from 'readline';
import gradient from 'gradient-string';
import { installCloudflared } from './installCloudflared.js';

const consoleColors = { 
    blue: ['#199cff', '#0600ba'], 
    green: ['#00ffee', '#00ff62'], 
    nitral: ['#c4e6ff', '#b3b1b1'], 
    red: ['#cf0808', '#630000'], 
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc'] 
};

export const faceSnifferStarter = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 "));
    console.log(gradient(consoleColors.rainbow).multiline(`\nПодготовка к запуску faceSniffer\n`));
    setTimeout(() => {
        installCloudflared();
    }, 2000)
}