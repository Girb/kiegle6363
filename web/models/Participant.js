import Backbone from 'backbone';
import Server from '../server';

export default class Participant extends Backbone.Model {
    moveUp() {
        this.collection.moveUp(this);
    }
    moveDn() {
        this.collection.moveDn(this);
    }
    confirm() {
        Server.post(`/participants/${this.get('id')}/status/1`, {}).then((res) => {
            this.set('status_id', 1);
        });
    }
    registered() {
        Server.post(`/participants/${this.get('id')}/status/0`, {}).then((res) => {
            this.set('status_id', 0);
        });
    }
}
