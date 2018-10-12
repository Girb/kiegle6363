import Backbone from 'backbone';
import Results from '../models/Results';
import KVPResultItemView from './KVPResultItemView';

export default class KVPResultsView extends Backbone.View {
    get className() { return 'results kvp'; }
    initialize(options) {
        Object.assign(this, options);
        this.$el.append(this.template);
        this.collection = new Results();
        this.collection.url = app.url(`/competitions/${app.competitionId()}/rounds`);
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
                        <th scope="col">Plassering</th>
                        <th scope="col">Navn</th>
                        <th scope="col">Resultater</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
    }
    addAll() {
        this.collection.each(this.addOne, this);
    }
    addOne(model, idx) {
        const itm = new KVPResultItemView({ model, idx });
        itm.render().$el.appendTo(this.$('tbody'));
    }
    render() {

        return this;
    }
}