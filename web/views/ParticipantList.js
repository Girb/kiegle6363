import Backbone from 'backbone';
import $ from 'jquery';
import ParticipantListItem from './participantlistitem';
import Participant from '../models/Participant';

export default class ParticipantsList extends Backbone.View {
    get className() {
        return 'participants';
    }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        if (this.filter) {
            $('<input type="search" class="form-control filter" placeholder="Søk..." />').prependTo(this.$el);
            $('<button class="btn btn-primary add" type="button">Meld på ny...</button>').appendTo(this.$el);
        }
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        this.collection.fetch({ reset: true });
    }
    get events() {
        return {
            'input .filter': 'filterRows',
            'click .add': 'beginAdd',
        };
    }
    beginAdd() {
        this.collection.add(new Participant());
    }
    get template() {
        return `
            <table id="participantlist" class="table table-responsive-lg table-dark table-hover">
                <tbody></tbody>
            </table>
        `;
    }
    filterRows(e) {
        const val = $(e.currentTarget).val().toLowerCase();
        this.$('table tr').each((idx, tr) => {
            const $tr = $(tr);
            $tr.toggle($tr.text().toLowerCase().indexOf(val) > -1);
        }); 
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
