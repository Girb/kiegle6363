import Backbone from 'backbone';

export default class DocModel extends Backbone.Model {
    get started() {
        return this.get('draft') && this.get('draft').length;
    }
    sum() {
        if (this.started) {
            const draft = this.get('draft');
            let sum = 0;
            for (let i = 0; i < draft.length; i++) {
                if (draft[i]) {
                    sum += draft[i];
                }
            }
            return sum;
        }
        return 0;
    }
    count() {
        const draft = this.get('draft');
        if (draft) {
            return draft.filter(x=>!!x).length;
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
        var avg = this.avg();
        if( avg && !isNaN(avg) ) {
            const res = Math.floor(avg*10);
            return res;
        }
        if( this.count() === 10 ) {
            return this.sum();
        }
        return 70;
    }
    max10() {
        if( this.started ) {
            var remaining = 10 - this.count();
            return this.sum() + 9 * remaining;
        }
        if( this.count() === 10 ) {
            return this.sum();
        }
        return 90;
    }
}
