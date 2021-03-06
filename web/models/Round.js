import Backbone from 'backbone';

export default class Round extends Backbone.Model {
    playerName() {
        return `${this.get('firstname')} ${this.get('lastname')}`;
    }

    get throws() {
        return this.get('throws');
    }

    sum() {
        const scores = this.throws.map(t => t.score || 0);
        return scores.reduce((a, b) => a + b, 0);
    }
    avg() {
        const thrown = this.throws.filter(t => t.score !== null);
        const x = (this.sum() / thrown.length);
        return x ? x.toFixed(2) : '-';
    }
    secondbest10() {
        return '';
    }
    prog() {
        const x = (this.avg() * this.throws.length);
        return x ? x.toFixed(0) : '-';
    }
    max() {
        const left = this.throws.filter(t => t.score === null).length;
        return this.sum() + (9 * left);
    }
    isComplete() {
        return !!(this.get('throws') && this.get('throws').every(t => (t.score !== null && t.score !== undefined)));
    }
}
