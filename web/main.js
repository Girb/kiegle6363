import { App } from './app';
import config from './config.json';

if (config.beta) {
    document.body.classList.add('beta');
}

window.app = new App(config);
window.app.dbname = 'mydb2';
window.app.start();
