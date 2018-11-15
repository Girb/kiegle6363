import { App } from './app';
import config from './config.json';
import Session from './models/Session';
import $ from 'jquery';

$.event.special.destroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler()
      }
    }
  }

if (config.beta) {
    document.body.classList.add('beta');
}

const session = new Session();
session.check().then(() => {
    var cfg = Object.assign({}, config);
    cfg.session = session;
    window.app = new App({ config: cfg });
    window.app.start();
});
