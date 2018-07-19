import Backbone from 'backbone';

export default class Session extends Backbone.Model {
    check() {
        return Promise.resolve();
    }
}