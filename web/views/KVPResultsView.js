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
        const typeid = app.comp.get('type_id');
        return `
            <table class="table table-responsive-lg table-hover">
                <thead>
                    <tr>
                        <th scope="col">Plassering</th>
                        <th scope="col">Navn</th>
                        <th scope="col">Resultater</th>
                        ${typeid === 2 ? '<th>Innledende</th>' : ''}
                        ${typeid === 3 ? '<th>Semi+innledende</th>' : ''}
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div id="clubres"></div>
        `;
    }
    addAll() {
        this.collection.each(this.addOne, this);
    }
    addOne(model, idx) {
        const itm = new KVPResultItemView({ model, idx });
        itm.render().$el.appendTo(this.$('tbody'));
    }
    getClubStanding() {
        const cs = this.collection.groupBy('club');
        const res = {};
        _.keys(cs).forEach(c => {
            res[c] = _.map(cs[c], rs => rs.get('best2sum'));
        });
        _.keys(res).forEach((c) => {
            var b5r = res[c].sort().reverse().splice(0, 5);
            res[c] = _.reduce(b5r, (memo, num) => { return memo + num; }, 0);
        });
        return res;
    }
    render() {
        const typeid = app.comp.get('type_id');
        if ( typeid === 1 && this.collection.length) {
            const cres = this.getClubStanding();
            _.keys(cres).forEach((c) => {
                const d = $('<div/>').appendTo(this.$('#clubres'));
                d.append(`${c} -&gt; ${cres[c]}`);
            });
        }
        return this;
    }
}
