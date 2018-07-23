import Backbone from 'backbone';

export default class Round extends Backbone.Model {

    playerName() {
        return this.get('firstname') + ' ' + this.get('lastname');
    }

}