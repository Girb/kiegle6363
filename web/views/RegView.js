import BaseView from './BaseView';
import ScoreboardView from './ScoreboardView';
import TotalScoreView from './TotalScoreView';
//import RegPrognosisView from './RegPrognosisView';
//import RegOptionsView from './RegOptionsView';


export default class RegView extends BaseView {
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
    discard() {
    }
    render() {
        this.$el.empty().append(this.template);
        this.$('#info .sname').text(`${this.model.playerName()}`);
        this.$('#info .sclub').text(this.model.get('club'));
        const scoreboard = new ScoreboardView({ model: this.model });
        this.$el.append(scoreboard.render().$el);
        const totalview = new TotalScoreView({ model: this.model });
        this.$el.append(totalview.render().$el);
        //const progview = new RegPrognosisView(docmodel);
        //const regopts = new RegOptionsView(docmodel);
        // this.listenTo(regopts, 'start', this.start);
        // this.listenTo(regopts, 'discard', this.discard);
        // this.listenTo(regopts, 'save', this.save);
        // this.el.appendChild(scoreboard.render().el);
        // if (docmodel.get('draft')) {
        //     this.el.appendChild(totalview.render().el);
        //     this.el.appendChild(progview.render().el);
        // }
        // this.el.appendChild(regopts.render().el);
        //});
        return this;
    }
}
