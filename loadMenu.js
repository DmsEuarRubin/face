import readline from 'readline';
import gradient from 'gradient-string';
import { bomberStarter } from './bomberStarter.js';
import rl from './readlineInstance.js';
import { faceSnifferStarter } from './faceSnifferStarter.js';
import { checkInternetConnection } from './checkInternetConnection.js';

const consoleColors = { 
    blue: ['#199cff', '#0600ba'], 
    green: ['#00ffee', '#00ff62'], 
    nitral: ['#c4e6ff', '#b3b1b1'], 
    red: ['#cf0808', '#630000'], 
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc'] 
};

export const loadMenu = () => {
    setTimeout(() => {
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 "));
        
        console.log(gradient(consoleColors.nitral).multiline('\nВыберите инструмент:\n'));
        console.log(gradient(consoleColors.blue).multiline('[1] Sms bomber'));
        console.log(gradient(consoleColors.blue).multiline('[2] Face sniffer'));

        function choseTool() {
            rl.question(gradient(consoleColors.nitral).multiline('\nВведите номер вашего выбора: '), (answer) => {
                switch (answer) {
                    case '1':
                        if(checkInternetConnection) {
                            bomberStarter();
                        } else {
                            console.log(gradient(consoleColors.red).multiline('У вас нет подключения к интернету для использования данного инструмента.'));
                            choseTool();
                        }
                        break;
                    case '2':
                        if(checkInternetConnection) {
                        faceSnifferStarter();
                        } else {
                            console.log(gradient(consoleColors.red).multiline('У вас нет подключения к интернету для использования данного инструмента.'));
                            choseTool();
                        }
                        break;
                    default:
                        console.log(gradient(consoleColors.red).multiline('Неверный выбор, попробуйте снова.'));
                        choseTool();
                        break;
                }
            });
        }
        choseTool();
        

    }, 500);
}
