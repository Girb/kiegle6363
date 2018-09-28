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
            'click .up': 'moveUp',
            'click .dn': 'moveDn',
            'click .add': 'addRound',
            'click .complete': 'finished'
        };
    }
    moveUp() {
        this.model.moveUp();
        this.$el.insertBefore(this.$el.prev());
    }
    moveDn() {
        this.model.moveDn();
        this.$el.insertAfter(this.$el.next());
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
    finished(e) {
        e.preventDefault();
        this.model.finished().then(() => {
            this.$el.hide(50, () => {
                this.$el.remove();
            });          
        });
    }
    get template() {
        return `
            <td scope="row">
                <span>${this.model.name()}</span>
                <span class="club d-block d-lg-inline-block ml-lg-2">${this.model.club()}</span>
            </td>
            <td class="rounds"></td>
            <td class="commands">
                <button type="button" class="btn btn-sm btn-secondary up"><i class="material-icons">keyboard_arrow_up</i></button>
                <button type="button" class="btn btn-sm btn-secondary dn"><i class="material-icons">keyboard_arrow_down</i></button>    
                <button class="btn btn-primary add mr-lg-1">Ny runde</button>
                <button class="btn btn-outline-success complete">Ferdig</button>
            </td>
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
        const maxrounds = app.comp.get('number_of_rounds');
        if (maxrounds > 0) {
            this.$('.add').prop('disabled', this.model.get('rounds').length >= maxrounds);
        }
        
        return this;
    }
}
