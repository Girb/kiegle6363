import BaseView from './BaseView';
import ScoreboardView from './ScoreboardView';
import TotalScoreView from './TotalScoreView';
import RegPrognosisView from './RegPrognosisView';
//import RegOptionsView from './RegOptionsView';


export default class RegView extends BaseView {
    initialize(options) {
        BaseView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.model, 'change', this.updateBackButton);
    }
    get title() { return 'Slagning'; }
    get className() { return 'reg'; }
    get template() {
        return `
            <div id="info">
                <h1 class="sname"></h1>
                <h2 class="sclub"></h2>
            </div>
            <div id="scores"></div>
            <div id="totals"></div>
            <div id="prognosis"></div>
            <div id="options"></div>
        `;
    }
    discard() {
    }
    get events() {
        return {
            'click .done': 'done'
        };
    }
    done(e) {
        e.preventDefault();
        if( app.comp ) {
            const url = `/competition/${app.competitionId()}/queue`;
            app.navigate(url, { trigger: true, replace: false });
        } else {
            window.history.back();
        }
    }
    updateBackButton() {
        const done = this.model.isComplete();
        this.$('.done')
            .toggleClass('btn-success', done)
            .toggleClass('btn-secondary', !done);
    }
    render() {
        this.$el.empty().append(this.template);
        this.$('#info .sname').text(`${this.model.playerName()}`);
        this.$('#info .sclub').text(this.model.get('club'));
        const scoreboard = new ScoreboardView({ model: this.model });
        this.$el.append(scoreboard.render().$el);
        const totalview = new TotalScoreView({ model: this.model });
        this.$el.append(totalview.render().$el);
        const progview = new RegPrognosisView({ model: this.model });
        this.$el.append(progview.render().$el);

        $('<button/>')
            .prop('type', 'button')
            .addClass('btn done btn-secondary btn-lg mt-5')
            .html('&lt; Ferdig / tilbake')
            .appendTo(this.$el);

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
