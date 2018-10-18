import $ from 'jquery';
import Backbone from 'backbone';
import Participants from '../../models/Participants';

export default class Queue extends Backbone.View {
    get className() { return 'publicqueue'; }
    initialize(options) {
        Object.assign(this, options);
        this.collection = new Participants();
        this.collection.url = app.url(`/competitions/${this.model.id}/rounds/1`);
        this.listenTo(this.collection, 'sync', this.redraw);
        this.collection.fetch();
        setInterval(() => {
            this.collection.fetch();
        }, 4000);
    }

    redraw() {
        const tbl = this.$('table').empty();
        let cnt = 0, 
            minCounter = 0;
        for (let i = 0; i < this.collection.length; i += 1) {
            const p = this.collection.at(i);
            if (!p.isFinished()) { // different from participant-status, this one is derived
                const tr = $('<tr/>').appendTo(tbl);
                let qs = '';
                if (p.isStarted()) {
                    qs = '<span style="color: yellow;">PÅGÅR</span>';
                } else if (p.isNextUp()) {
                    qs = 'NESTE';
                }
                
                if (!qs) {
                    minCounter += 1;
                    let txt = 'NESTE';
                    if (minCounter > 2) {
                        txt = `<span style="color: #aaa">${p.minsUntil()} min</span>`;
                    }
                    $('<td />').html(txt).appendTo(tr);
                } else {
                    $('<td />').html(qs).appendTo(tr);
                }
                $('<td style="text-transform: uppercase;" />').html(p.name()).appendTo(tr);
                $('<td />').html(p.club()).appendTo(tr);
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
        const tbl = $('<table/>').appendTo(this.$el);
        return this;
    }
}
