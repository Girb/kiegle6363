import Backbone from 'backbone';
import Participants from '../models/Participants';
import ParticipantQueueItem from './ParticipantQueueItem';
import Server from '../server';

export default class ParticipantQueue extends Backbone.View {
    get className() { return 'queue'; }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        this.collection = new Participants();
        this.collection.url = app.url(`/competitions/${this.model.id}/rounds/1`);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        this.collection.fetch({ reset: true });
    }
    get template() {
        return `
            <table class="table table-responsive-lg table-hover">
                <thead>
                    <tr>
                        <th scope="col">Navn</th>
                        <th scope="col">Runder</th>
                        <th scope="col">Valg</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
    }
    addAll() {
        this.collection.each(this.addOne, this);
    }
    addOne(model) {
        const itm = new ParticipantQueueItem({ model });
        itm.render().$el.appendTo(this.$('tbody'));
    }
   render() {
        return this;
    }
}
