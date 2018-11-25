import $ from 'jquery';
import Backbone from 'backbone';
import Results from '../../models/Results';
import ScreenFull from 'screenfull';

const REFRESH_INTERVAL = 15000;

export default class ResultsList extends Backbone.View {
    get className() {
        return 'publicresults';
    }
    initialize(options) {
        Object.assign(this, options);
        this.page = 1;
        this.collection = new Results();
        const status = app.comp.statusForResults;
        this.collection.url = app.url(`/competitions/${app.competitionId()}/rounds/${status}`);
        this.listenTo(this.collection, 'sync', this.redraw);
        this.collection.fetch({ reset: true });
        //this.interval = setTimeout(this.refresh.bind(this), REFRESH_INTERVAL);
    }
    get events() {
        return {
            'click #logo': 'toggleFullscreen',
        };
    }
    toggleFullscreen() {
        ScreenFull.toggle();
    }
    refresh() {
        this.$('table').fadeTo(500, 0, () => {
            this.collection.fetch({ reset: true });
        });
    }
    redraw() {
        const tbl = this.$('table').empty();
        let cnt = 0,
            start = this.page === 1 ? 0 : 16,
            length = Math.min(this.collection.length, start + 16);
        for (let i = start; i < length; i += 1) {
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
                    const b2 = r.get('best2');
                    const bestRound = b2.length > 1 ? Math.max.apply(null, b2) : '--';
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

        tbl.fadeTo(500, 1);
        this.interval = setTimeout(this.refresh.bind(this), REFRESH_INTERVAL);
        this.page = (this.collection.length > 16 && this.page === 1) ? 2 : 1;
    }
    
    get bottom() {
        return `<div id="bottom"><img id="logo" src='../../../img/machina_white.png' /></div>`;
    }

    render() {
        this.$el.empty();
        const c = $('<div/>').addClass('bgcontainer').appendTo(this.$el);
        for (let i = 1; i < 400; i += 1) {
            $('<div/>').addClass('circle').appendTo(c);
        }
        $('<table/>').appendTo(this.$el);

        this.$el.append(this.bottom);

        this.$el.on('destroyed', () => {
            clearInterval(this.interval);
        });

        return this;
    }
}
