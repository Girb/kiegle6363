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
        if (this.collection) {
            if (this.inRound() || this.get('rounds').length) {
                return 'PÅGÅR';
            } 
        }
        return '';
    }
    inRound() {
        let inr = false;
        const throwsPrRound = app.comp.get('throws_per_round');
        this.get('rounds').forEach((r) => {
            const c = parseInt(r.count);
            inr = inr || (c < throwsPrRound);
        });
        return inr;
    }
    isStarted() {
        const numRounds = app.comp.get('number_of_rounds'),
            rounds = this.get('rounds');
        return (rounds.length > 0 && rounds.length < numRounds) || this.inRound();
    }
    isNextUp() {
        const nextTwo = [];
        this.collection.each((p) => {
            if (p.isStarted() && nextTwo.length < 2) {
                nextTwo.push(p);
            }
        });
        return nextTwo.indexOf(this) !== -1;
    }
    isFinished() {
        const numRounds = app.comp.get('number_of_rounds'),
            rounds = this.get('rounds');
        return (rounds.length === numRounds) && !this.inRound();
    }
    minsUntil() {
        const idx = this.collection.indexOf(this);
        const min = ((idx % 2 === 1) ? ((idx - 1) * 1.5) : idx * 1.5) - 3;
        return min;
    }
}
