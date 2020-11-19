process.on('unhandledRejection', (_reason, promise) => {
    console.log('ocurrio una exepcion inesperada en: ', promise);
});
process.on('uncaughtException', (error) => {
    console.log('ocurrio una exepcion inesperada: ', error);
    process.exit();
});

import App from './app';

let app = new App();

app.listen();
