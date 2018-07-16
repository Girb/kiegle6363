import Backbone from 'backbone';
import Participant from './Participant';
import Server from '../server';

export default class Participants extends Backbone.Collection {
    get model() { return Participant; }
    moveUp(model) {
        const idx = this.indexOf(model);
        if (idx > 0) {
            this.remove(model, { silent: true });
            this.add(model, { at: idx - 1, silent: true });
            this.saveSortOrders();
        }
    }
    moveDn(model) {
        const idx = this.indexOf(model);
        if (idx < this.models.length) {
            this.remove(model, { silent: true });
            this.add(model, { at: idx + 1, silent: true });
            this.saveSortOrders();
        }        
    }
    saveSortOrders() {
        this.each((mdl, idx) => {
            mdl.set('sortOrder', idx, { silent: true });
        });
        const orders = this.map(mdl => ({ id: mdl.get('id'), sortOrder: mdl.get('sortOrder') }));
        Server.post('/participants/sort', orders);
    }
}
