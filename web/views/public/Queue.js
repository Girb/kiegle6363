import $ from 'jquery';
import Backbone from 'backbone';
import Participants from '../../models/Participants';

export default class Queue extends Backbone.View {
    get className() { return 'publicqueue'; }
    initialize(options) {
        Object.assign(this, options);
        this.page = 1;
        this.collection = new Participants();
        this.collection.url = app.url(`/competitions/${this.model.id}/rounds/1`);
        this.listenTo(this.collection, 'sync', this.redraw);
        this.collection.fetch();
        this.interval = setInterval(this.refresh.bind(this), 3000);
    }

    remove() {
        console.log('REMOVED!');
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
        let cnt = 0, 
            minCounter = 0,
            start = this.page === 1 ? 0 : 16,
            length = Math.min(this.collection.length, start + 16);
            
        for (let i = start; i < length; i += 1) {
            const p = this.collection.at(i);
            if (!p.isFinished()) { // different from participant-status, this one is derived
                const tr = $('<tr/>').appendTo(tbl);
                let qstatus = '';
                if (p.isStarted()) {
                    qstatus = '<span style="color: yellow;">PÅGÅR</span>';
                } else if (p.isNextUp()) {
                    qstatus = 'NESTE';
                }
                
                if (!qstatus) {
                    //minCounter += 1;
                    // let txt = 'NESTE';
                    // if (minCounter > 2) {
                    let txt = `<span style="color: #eee;">${p.minsUntil()} min</span>`;
                    //}
                    $('<td />').html(txt).appendTo(tr);
                } else {
                    $('<td />').html(qstatus).appendTo(tr);
                }
                $('<td style="text-transform: uppercase;" />').html(p.name()).appendTo(tr);
                $('<td />').html(p.club()).appendTo(tr);
                cnt += 1;
                if (cnt === 16) break;
            }
        }

        this.page = (this.collection.length > 16 && this.page === 1) ? 2 : 1;
    }

    get bottom() {
        return `<div id="bottom"><img id="logo" src='../../../img/machina_white.png' /></div>`;
    }

    render() {
        this.$el.empty();
        const c = $('<div/>').addClass('bgcontainer').appendTo(this.$el);
        for (let i = 1; i < 400; i++) {
            $('<div/>').addClass('circle').appendTo(c);
        }
        const tbl = $('<table/>').appendTo(this.$el);
        this.$el.append(this.bottom);

        this.$el.on('destroyed', () => {
            clearInterval(this.interval);
        });

        return this;
    }
}
