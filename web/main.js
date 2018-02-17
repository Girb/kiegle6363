import { App } from './app';
import config from './config.json';
import DB from './db';

if (config.beta) {
    document.body.classList.add('beta');
}

window.app = new App(config);
const dbname = localStorage.getItem('dbname');
if (!dbname) {
    DB.inferName((name) => {
        window.app.start(name);
    });
} else {
    window.app.start(dbname);
}

