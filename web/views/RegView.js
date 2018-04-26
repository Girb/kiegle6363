import BaseView from '../BaseView';
import DocModel from '../DocModel';
import ScoreboardView from './ScoreboardView';
import TotalScoreView from './TotalScoreView';
import RegPrognosisView from './RegPrognosisView';
import RegOptionsView from './RegOptionsView';


export default class RegView extends BaseView {
    constructor(slagerid, count) {
        super();
        this.count = count;
        this.slagerid = slagerid;
        app.db.get(this.slagerid).then((doc) => {
            this.doc = new DocModel(doc);
            this.render();
        });
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
            <div id="prognosis"></div>
            <div id="options"></div>
        `;
    }
    start(model) {
        model.set('draft', new Array(10));
        model.save(() => {
            this.render();
        });
    }
    discard(model) {
        model.unset('draft');
        this.render();
        model.save(() => {

        });
    }
    save(model) {
        const scores = model.get('scores') || [];
        scores.push(model.get('draft').slice());
        model.set('scores', scores);
        model.unset('draft');
        model.save(() => {
            window.history.back();
        });
    }
    render() {
        if( !this.doc ) return this;
        this.el.innerHTML = this.template;
        //app.db.get(this.slagerid).then((doc) => {
            //const docmodel = new DocModel(doc);
        const docmodel = this.doc;
        const doc = docmodel.attributes;
            this.one('#info .sname').innerHTML = `${doc.firstname} ${doc.lastname}`;
            this.one('#info .sclub').innerHTML = doc.club;
            const scoreboard = new ScoreboardView(docmodel);
            const totalview = new TotalScoreView(docmodel);
            const progview = new RegPrognosisView(docmodel);
            const regopts = new RegOptionsView(docmodel);
            this.listenTo(regopts, 'start', this.start);
            this.listenTo(regopts, 'discard', this.discard);
            this.listenTo(regopts, 'save', this.save);
            this.el.appendChild(scoreboard.render().el);
            if (docmodel.get('draft')) {
                this.el.appendChild(totalview.render().el);
                this.el.appendChild(progview.render().el);
            }
            this.el.appendChild(regopts.render().el);
        //});
        return this;
    }
}
