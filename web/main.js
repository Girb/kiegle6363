import { App } from './app';
import config from './config.json';

if (config.beta) {
    document.body.classList.add('beta');
}

window.app = new App(config);
const dbname = localStorage.getItem('dbname');
window.app.start(dbname);

