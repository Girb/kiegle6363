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
        return (this.sum() / thrown.length).toFixed(2);
    }
    secondbest10() {
        return '';
    }
    prog() {
        return (this.avg() * this.throws.length).toFixed(0);
    }
    max() {
        const left = this.throws.filter(t => t.score === null).length;
        return this.sum() + (9 * left);
    }
}
