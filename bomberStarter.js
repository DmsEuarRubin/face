import readline from 'readline';
import gradient from 'gradient-string';
import { smsBomber } from './smsBomber.js';
import rl from './readlineInstance.js';

const consoleColors = { 
    blue: ['#199cff', '#0600ba'], 
    green: ['#00ffee', '#00ff62'], 
    nitral: ['#c4e6ff', '#b3b1b1'], 
    red: ['#cf0808', '#630000'], 
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc'] 
};
function isValidPhoneNumber(number) {
    const phoneRegex = /^374\d{8}$/;
    return phoneRegex.test(number);
}          
function isValidCount(count) {
    return typeof count === 'number' && count >= 1 && count <= 1000;
}
function askPhoneNumber(callback) {
    rl.question(gradient(consoleColors.nitral).multiline('\nВведите номер телефона (формат 374XXXXXXXX): '), (phoneNumber) => {
        if (isValidPhoneNumber(phoneNumber)) {
            callback(phoneNumber); 
        } else {
            console.log(gradient(consoleColors.red).multiline('Ошибка: номер телефона должен быть в формате 374XXXXXXXX'));
            askPhoneNumber(callback);
        }
    });
}
function askCount(phoneNumber) {
    rl.question(gradient(consoleColors.nitral).multiline('Введите количество (от 1 до 1000): '), (inputCount) => {
        const count = parseInt(inputCount, 10); 
        if (isValidCount(count)) {
            smsBomber(phoneNumber, count);
        } else {
            console.log(gradient(consoleColors.red).multiline('Ошибка: количество должно быть числом от 1 до 1000.'));
            askCount(phoneNumber); 
        }
    });
}
export const bomberStarter = () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 "));
    askPhoneNumber((phoneNumber) => {
        askCount(phoneNumber);
    });
}