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
            throws_per_round: app.comp.get('throws_per_round')
        };
        Server.post(`/competitions/${app.comp.id}/rounds/new`, pd).then((res) => {
            app.navigate(`/round/${res.id}`, { trigger: true });
        });
    }
    get template() {
        return `
            <td scope="row">
                <span>${this.model.name()}</span>
                <span class="club d-block d-lg-inline-block ml-lg-2">${this.model.club()}</span>
            </td>
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
        const newbtn = $('<button/>').addClass('btn btn-primary add mr-lg-1').appendTo(this.$('.commands'));
        newbtn.append('<i class="material-icons mr-1">add</i>').appendTo(newbtn);
        newbtn.append('<span class="d-none d-lg-inline-block">Ny runde</span>');
        const maxrounds = app.comp.get('number_of_rounds');
        if (maxrounds > 0) {
            newbtn.prop('disabled', this.model.get('rounds').length >= maxrounds);
        }
        const donebtn = $('<button/>').addClass('btn btn-outline-success complete').appendTo(this.$('.commands'));
        donebtn.append('<span class="d-none d-lg-inline-block">Ferdig</span>');
        donebtn.append('<i class="material-icons ml-1">check</i>');
        
        return this;
    }
}
