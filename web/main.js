import { App } from './app';
import config from './config.json';
import Backbone from 'backbone';
import NativeAjax from 'backbone.nativeajax';

Backbone.ajax = NativeAjax;

if (config.beta) {
    document.body.classList.add('beta');
}

window.app = new App(config);
const dbname = localStorage.getItem('dbname');
window.app.start(dbname);

