import Backbone from 'backbone';

export default class Participant extends Backbone.Model {
    scoreSums(limit) {
        const sums = [];
        const scores = this.get('scores') || [];
        for (const score of scores) {
            sums.push(this._sum(score));
        }
        if (limit) {
            sums.sort((a, b) => b - a);
            return sums.slice(0, 2);
        }

        return sums;
    }

    _sum(score) {
        const vals = [];
        for (const i of score) {
            i && vals.push(i);
        }
        if (vals.length) {
            return vals.reduce((a, b) => a + b);
        }
        return 0;
    }
}
