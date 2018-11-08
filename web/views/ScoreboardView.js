import Backbone from 'backbone';
import $ from 'jquery';
import SingleScoreView from './SingleScoreView';

export default class ScoreboardView extends Backbone.View {
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(app, 'window:focus', this.windowFocused);
    }
    get className() { return 'scoreboard'; }
    get events() {
        return {
            'click #startreg': 'start',
        };
    }
    windowFocused(e) {
        setTimeout(() => {
            this.current && this.current.focus();
            //console.log('window focus arrived');
        });
    }
    focus(el) {
        el && el.focus();
        this.current = el;
    }
    focusNext(from) {
        const next = from.el.nextSibling;
        this.focus(next);
    }
    focusPrev(from) {
        const prev = from.el.previousElementSibling;
        this.focus(prev);
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
            const sep = (i === 4 && this.model.get('competition_type') === 5); // separator after 5 for dronningaften
            const ss = new SingleScoreView({ throw: throws[i], round: this.model, separator: sep });
            this.listenTo(ss, 'focus:next', this.focusNext);
            this.listenTo(ss, 'focus:prev', this.focusPrev);
            this.items.push(ss);
            this.listenTo(ss, 'change:value', (sx) => {
                this.focusNext(sx);
                this.model.trigger('change');
                // this.sum();
            });
            this.$el.append(ss.render().$el);
        }
        setTimeout(() => {
            this.focus(this.items[0].$el);
            this.$el.on('destroyed', () => {
                this.stopListening();
            })
        });

        return this;
    }
}
