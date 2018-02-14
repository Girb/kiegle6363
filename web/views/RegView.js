import BaseView from '../BaseView';
import Backbone from 'backbone';
import ScoreboardView from './ScoreboardView';
import TotalScoreView from './TotalScoreView';
import RegOptionsView from './RegOptionsView';

export default class RegView extends BaseView {
    constructor(slagerid, count) {
        super();
        this.count = count;
        this.slagerid = slagerid;
    }
    get title() { return 'Slagning'; }
    get className() { return 'reg'; }
    get template() {
        return `
            <div id="info">
                <div class="sname"></div>
                <div class="sclub"></div>
            </div>
            <div id="scores"></div>
            <div id="totals"></div>
            <div id="options"></div>
        `;
    }
    start(model) {
        model.set('draft', new Array(10));
        app.db.put(model.attributes).then((res) => {
            model.set(res);
            this.render();
        });
    }
    discard(model) {
        model.unset('draft');
        app.db.put(model.attributes).then((res) => {
            model.set(res);
            this.render();
        });
    }
    save(model) {
        const scores = model.get('scores') || [];
        scores.push(model.get('draft').slice());
        model.set('scores', scores);
        model.unset('draft');
        app.db.put(model.attributes).then((res) => {
            model.set(res);
            this.render();
        });
    }
    render() {
        this.el.innerHTML = this.template;
        app.db.get(this.slagerid).then((doc) => {
            const docmodel = new Backbone.Model(doc);
            this.one('#info .sname').innerHTML = `${doc.firstname} ${doc.lastname}`;
            this.one('#info .sclub').innerHTML = doc.club;
            const scoreboard = new ScoreboardView(docmodel);
            const totalview = new TotalScoreView(docmodel);
            const regopts = new RegOptionsView(docmodel);
            this.listenTo(regopts, 'start', this.start);
            this.listenTo(regopts, 'discard', this.discard);
            this.listenTo(regopts, 'save', this.save);
            this.el.appendChild(scoreboard.render().el);
            if (docmodel.get('draft')) {
                this.el.appendChild(totalview.render().el);
            }
            this.el.appendChild(regopts.render().el);
        });
        return this;
    }
}
