import $ from 'jquery';
import Backbone from 'backbone';
import SumItem from './SumItem';
import Server from '../server';

export default class ParticipantQueueItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get events() {
        return {
            'click .add': 'addRound',
        };
    }
    addRound(e) {
        e.preventDefault();
        const pd = { 
            participant_id: this.model.get('id'),
            throws_per_round: app.session.get('competition').get('throws_per_round')
        };
        Server.post(`/competitions/${app.session.get('competition').id}/rounds/new`, pd).then((res) => {
            app.navigate(`/round/${res.id}`, { trigger: true });
        });
    }
    get template() {
        return `
            <td scope="row">${this.model.toString()}</td>
            <td class="rounds"></td>
            <td class="commands"></td>
        `;
    }
    roundTemplate(r) {
        return `
            <button class="btn btn-outline-secondary dropdown-toggle sum">${r.sum}</button>
        `;
    }
    render() {
        this.$el.empty().append(this.template);
        this.model.get('rounds').forEach((round) => {
            new SumItem({ round }).render().$el.appendTo(this.$('.rounds'));
        });
        const newbtn = $('<button/>').addClass('btn btn-primary add').text('Ny runde').appendTo(this.$('.commands'));
        const maxrounds = app.session.get('competition').get('number_of_rounds');
        if (maxrounds > 0) {
            newbtn.prop('disabled', this.model.get('rounds').length >= maxrounds);
        }
        $('<button/>').addClass('btn btn-outline-success complete ml-2').text('Ferdig').appendTo(this.$('.commands'));
        return this;
    }
}
