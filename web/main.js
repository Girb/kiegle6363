import { App } from './app';
import config from './config.json';
import Session from './models/Session';

if (config.beta) {
    document.body.classList.add('beta');
}

const session = new Session();
session.check().then(() => {
    var cfg = Object.assign({}, config);
    cfg.session = session;
    window.app = new App(cfg);
    const dbname = localStorage.getItem('dbname');
    window.app.start(dbname);
});
