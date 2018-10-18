import Backbone from 'backbone';
import _ from 'underscore';
import Server from '../server';

export default class Participant extends Backbone.Model {
    moveUp() {
        this.collection.moveUp(this);
    }
    moveDn() {
        this.collection.moveDn(this);
    }
    confirm() {
        return Server.post(`/participants/${this.get('id')}/status/1`, {}).then((res) => {
            this.set('status_id', 1);
        });
    }
    registered() {
        return Server.post(`/participants/${this.get('id')}/status/0`, {}).then((res) => {
            this.set('status_id', 0);
        });
    }
    finished() {
        return Server.post(`/participants/${this.get('id')}/status/2`, {}).then((res) => {
            this.set('status_id', 2);
        });
    }
    destroy() {
        this.url = app.url(`/participants/${this.id}`);
        return Backbone.Model.prototype.destroy.apply(this);
    }
    toString() {
        return `${this.get('firstname')} ${this.get('lastname')} (${this.get('club')})`;
    }
    name() {
        return `${this.get('firstname')} ${this.get('lastname')}`;
    }
    club() {
        return this.get('club');
    }
    queueStatus() {
        if( this.collection ) {
            if( this.inRound() ) {
                return 'PÅGÅR';
            } else if( this.collection.indexOf(this) < 4 ) {
                return 'NESTE';
            }
        }
        return '';
    }
    inRound() {
        let inr = false;
        const throwsPrRound = app.comp.get('throws_per_round');
        this.get('rounds').forEach(r=> {
            const c = parseInt(r.count);
            inr = inr || (c < throwsPrRound);
        });
        return inr;
    }

}
