import Backbone from 'backbone';

export default class Player extends Backbone.Model {
    toString() {
        return `${this.get('firstname')} ${this.get('lastname')} (${this.get('club')})`;
    }
}

