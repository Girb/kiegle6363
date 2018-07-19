import Backbone from 'backbone';
import Participants from '../models/Participants';
import ParticipantQueueItem from './ParticipantQueueItem';
import Server from '../server';

export default class ParticipantQueue extends Backbone.View {
    get className() { return 'queue'; }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        // this.collection = new Participants();
        // //this.collection.url = app.url(`/competitions/${app.session.get('competition').id}/participants/1`);
        // this.collection.url = app.url(`/competitions/${app.session.get('competition').id}/rounds`);
        // this.listenTo(this.collection, 'reset', this.addAll);
        // this.listenTo(this.collection, 'add', this.addOne);
        // this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        // this.collection.fetch({ reset: true });
    }
    get template() {
        return `
            <table class="table table-responsive-lg table-dark table-hover">
                <tbody></tbody>
            </table>
        `;
    }
    addAll() {
        this.$('tbody').empty();
        const list = this.collection.groupBy((p) => {
            return p.toString();
        });
        console.log(list);

    }
    addOne(model) {
        var itm = new ParticipantQueueItem({ model: model });
        itm.render().$el.appendTo(this.$('tbody'));
    }
    render() {
        this.$el.empty();
        Server.get(`/competitions/${app.session.get('competition').id}/rounds`).then((rows) => {
            const list = _.groupBy(rows, (row) => { return row.lastname; });
            _.keys(list).forEach((key) => {
                new ParticipantQueueItem({ title: key, rounds: list[key] }).render().$el.appendTo(this.$el);
            });
            
        });

        return this;
    }

}