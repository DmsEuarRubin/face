import dns from 'dns';

export const checkInternetConnection = () => {
    dns.resolve('www.google.com', (err) => {
        if (err) return 0;
        else return 1;
    });
}

