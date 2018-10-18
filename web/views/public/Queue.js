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
        var tbl = this.$('table').empty();
        const to = Math.min(this.collection.length, 15);
        for( let i = 0; i < to; i++ ) {
            const p = this.collection.at(i);
            const tr = $('<tr/>').appendTo(tbl);
            $('<td/>').html(p.queueStatus()).appendTo(tr);
            $('<td/>').html(p.name()).appendTo(tr);
            $('<td/>').html(p.club()).appendTo(tr);
        }
    }

    render() {
        this.$el.empty();
        const c = $('<div/>').addClass('bgcontainer').appendTo(this.$el);
        for( let i = 1; i < 400; i++ ) {
            $('<div/>').addClass('circle').appendTo(c);
        }
        const tbl = $('<table/>').appendTo(this.$el);
        return this;
    }
}