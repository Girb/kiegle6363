import Backbone from 'backbone';
import SingleScoreView from './SingleScoreView';

export default class ScoreboardView extends Backbone.View {
    initialize(options) {
        Object.assign(this, options);
    }
    get className() { return 'scoreboard'; }
    get events() {
        return {
            'click #startreg': 'start',
        };
    }
    focusNext(from) {
        const next = from.el.nextSibling;
        next && next.focus();
    }
    sum() {
        let total = 0;
        this.items.forEach((itm) => {
            const val = parseInt(itm.el.innerText);
            if (!isNaN(val)) {
                total += parseInt(val);
            }
        });
        this.trigger('change:total', total);
    }
    render() {
        this.$el.empty();
        const throws = this.model.get('throws');

        this.items = [];
        for (let i = 0; i < throws.length; i += 1) {
            const ss = new SingleScoreView({ throw: throws[i] });
            this.items.push(ss);
            this.listenTo(ss, 'change:value', (sx) => {
                this.focusNext(sx);
                // this.sum();
            });
            this.$el.append(ss.render().$el);
        }
        setTimeout(() => {
            this.items[0].$el.focus();
        });

        return this;
    }
}
