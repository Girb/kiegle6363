import $ from 'jquery';
import Backbone from 'backbone';
import Results from '../../models/Results';

export default class ResultsList extends Backbone.View {
    get className() {
        return 'publicresults';
    }
    initialize(options) {
        Object.assign(this, options);
        this.collection = new Results();
        const status = app.comp.statusForResults;
        this.collection.url = app.url(`/competitions/${app.competitionId()}/rounds/${status}`);
        this.listenTo(this.collection, 'sync', this.redraw);
        this.collection.fetch();
        setInterval(this.refresh.bind(this), 5000);
    }
    refresh() {
        this.$('table').fadeTo(500, 0, () => {
            this.collection.fetch().then(() => {
                this.$('table').fadeTo(500, 1);
            });
        });
    }
    redraw() {
        const tbl = this.$('table').empty();
        let cnt = 0;
        for (let i = 0; i < this.collection.length; i += 1) {
            const r = this.collection.at(i),
                inRound = r.inRound();
            const sum = r.get('best2sum');
            if (sum) {
                const tr = $('<tr/>').appendTo(tbl);
                $('<td/>').html(i + 1).appendTo(tr);
                $('<td/>').addClass(inRound ? 'blinking yellow' : '').html(r.name()).appendTo(tr);
                $('<td/>').addClass(inRound ? 'blinking yellow' : '').html(r.club()).appendTo(tr);
                $('<td/>').addClass(inRound ? 'blinking yellow' : '').html(r.get('best2sum')).appendTo(tr);
                if (inRound) {
                    const bestRound = Math.max.apply(null, r.get('best2'));
                    $('<td/>').html(`<span class="score sum">${`${bestRound}</span><span class="score current">${r.lastRoundThrows()}`}</span>` || '').appendTo(tr);
                } else {
                    let b2td = $('<td/>').appendTo(tr);
                    r.get('best2').forEach((b) => {
                        $('<span/>').addClass('score sum').text(b).appendTo(b2td);
                    });
                }
                
                cnt += 1;
                if (cnt === 16) break;
            }
        }
    }
    
    render() {
        this.$el.empty();
        const c = $('<div/>').addClass('bgcontainer').appendTo(this.$el);
        for (let i = 1; i < 400; i += 1) {
            $('<div/>').addClass('circle').appendTo(c);
        }
        $('<table/>').appendTo(this.$el);
        return this;
    }
}
