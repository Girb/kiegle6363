import $ from 'jquery';
import Backbone from 'backbone';
import PlayerListItem from './PlayerListItem';

export default class PlayerList extends Backbone.View {
    get className() {
        return 'players';
    }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        $('<input type="search" class="form-control filter" placeholder="Søk..." />').prependTo(this.$el);
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        this.collection.fetch({ reset: true });
    }
    get events() {
        return {
            'input .filter': 'filterRows',
        };
    }
    get template() {
        return `
            <table id="playerlist" class="table table-responsive-lg table-hover">
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
        const itm = new PlayerListItem({ model });
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