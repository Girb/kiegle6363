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
        setInterval(() => {
            this.collection.fetch();
        }, 5000);
    }

    redraw() {
        const tbl = this.$('table').empty();
        let cnt = 0;
        for (let i = 0; i < this.collection.length; i += 1) {
            const r = this.collection.at(i);
            const sum = r.get('best2sum');
            if (sum) {
                const tr = $('<tr/>').addClass(r.inRound() ? 'blinking yellow' : '').appendTo(tbl);
                $('<td/>').html(i + 1).appendTo(tr);
                $('<td/>').html(r.name()).appendTo(tr);
                $('<td/>').html(r.club()).appendTo(tr);
                $('<td/>').html(r.get('best2sum')).appendTo(tr);
                cnt += 1;
                if (cnt === 16) break;
            }
        }
    }
    
    render() {
        this.$el.empty();
        const c = $('<div/>').addClass('bgcontainer').appendTo(this.$el);
        for (let i = 1; i < 400; i++) {
            $('<div/>').addClass('circle').appendTo(c);
        }
        $('<table/>').appendTo(this.$el);
        return this;
    }
}
