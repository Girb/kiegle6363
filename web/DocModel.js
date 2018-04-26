import Backbone from 'backbone';

const sum = function (arr) {
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            x += arr[i];
        }
    }
    return x;
};
const sumCompare = function (a, b) {
    if (!a || !b) return 0;
    return sum(b) - sum(a);
};

export default class DocModel extends Backbone.Model {
    initialize(options) {
        Object.assign(this, options);
        // this.on('change:draft', _.debounce(() => {
        //     this.save();
        // }, 3000), this);
    }
    save(callback) {
        console.log('Saving: ' + this.get('_rev'));
        app.db.put(this.attributes).then((res) => {
            res._rev = res.rev;
            delete res.rev;
            this.set(res);
            console.log('New rev is: ' + this.get('_rev'));
            callback && callback();
        });
    }
    get started() {
        return this.get('draft') && this.get('draft').length;
    }
    sum() {
        if (this.started) {
            return sum(this.get('draft'));
        }
        return 0;
    }
    count() {
        const draft = this.get('draft');
        if (draft) {
            return draft.filter(x => x !== undefined).length;
        }
        return 0;
    }
    avg() {
        if (this.started) {
            return this.sum() / this.count();
        }
        return NaN;
    }
    prog10() {
        const avg = this.avg();
        if (avg && !isNaN(avg)) {
            const res = Math.floor(avg * 10);
            return res;
        }
        if (this.count() === 10) {
            return this.sum();
        }
        return 70;
    }
    max10() {
        if (this.started) {
            const remaining = 10 - this.count();
            return this.sum() + 9 * remaining;
        }
        if (this.count() === 10) {
            return this.sum();
        }
        return 90;
    }
    best10() {
        const scores = this.get('scores');
        scores.sort(sumCompare);
        return scores[0];
    }
    secondbest10() {
        const scores = this.get('scores');
        if (scores && scores.length) {
            scores.sort(sumCompare);
            if (scores.length > 1) {
                return sum(scores[1]);
            }
            return sum(scores[0]);
        }
        return 0;
    }
}
