import NativeView from 'backbone.nativeview';
import SingleScoreView from './SingleScoreView';

export default class ScoreboardView extends NativeView {
    constructor(doc) {
        super();
        this.doc = doc;
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
        this.el.innerHTML = '';
        if (this.doc.get('draft')) {
            this.items = [];
            for (let i = 0; i < this.doc.get('draft').length; i += 1) {
                const ss = new SingleScoreView(this.doc.get('draft')[i]);
                this.items.push(ss);
                this.listenTo(ss, 'change:value', (sx) => {
                    let draft = this.doc.get('draft').slice();
                    draft[i] = sx.get();
                    this.doc.set('draft', draft);
                    this.focusNext(sx);
                    this.sum();
                });
                this.el.appendChild(ss.render().el);
            }
            this.items[0].el.focus();
        }
        return this;
    }
}
