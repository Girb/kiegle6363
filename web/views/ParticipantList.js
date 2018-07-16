import Backbone from 'backbone';
import ParticipantListItem from './participantlistitem';

export default class ParticipantsList extends Backbone.View {
    get className() {
        return 'participants';
    }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        this.collection.fetch({ reset: true });
    }
    get events() {
        return {
            'click #addparticipant': 'add',
        };
    }
    get template() {
        return `
            <table id="participantlist" class="table table-responsive-lg table-dark table-hover">
                <tbody></tbody>
            </table>
        `;
    }
    addOne(model, collection, options) {
        const itm = new ParticipantListItem({ model });
        itm.render().$el.appendTo(this.$('tbody'));
    }
    addAll() {
        this.$('tbody').empty();
        this.collection.each(this.addOne, this);
    }
    render() {
        return this;
    }
}
