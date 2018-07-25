import Backbone from 'backbone';

export default class Round extends Backbone.Model {
    playerName() {
        return `${this.get('firstname')  } ${  this.get('lastname')}`;
    }

    get throws() {
        return this.get('throws');
    }

    sum() {
        const scores = this.throws.map(t => t.score || 0);
        return scores.reduce((a, b) => a + b, 0);
    }
}
