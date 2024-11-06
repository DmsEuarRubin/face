import { exec } from "child_process";

export const moduleInstaller = (modules, directory) => {
    console.clear();
        return new Promise((resolve, reject) => {
            const installCommand = `npm install --silent ${modules.map(mod => `${mod.name}@${mod.version}`).join(' ')}`;
            const loadingMessage = `\x1b[32mУстановка модулей: ${directory || 'Основные'}...\x1b[0m`;
            const loadingSymbol = ['|', '/', '-', '\\'];

            let index = 0;
            const loadingAnimation = setInterval(() => {
                process.stdout.write(`\r${loadingMessage} \x1b[32m${loadingSymbol[index]}\x1b[0m`);
                index = (index + 1) % loadingSymbol.length;
            }, 100);

            exec(installCommand, { cwd: directory }, (error, stdout, stderr) => {
                clearInterval(loadingAnimation);
                process.stdout.write('\r'); 

                if (error) {
                    console.log('\x1b[31m%s\x1b[0m', `Ошибка установки модулей в ${directory || 'текущей директории'}.`);
                    reject(error); 
                    return;
                }
                if (stderr) {
                    console.log('\x1b[31m%s\x1b[0m', `Ошибка установки модулей в ${directory || 'текущей директории'}.`);
                    reject(new Error(stderr)); 
                    return;
                }

                console.log('\x1b[32m%s\x1b[0m', `\nМодули успешно установлены!`);
                resolve();
            });
        });
};