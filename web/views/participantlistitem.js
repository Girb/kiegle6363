import Backbone from 'backbone';

export default class ParticipantListItem extends Backbone.View {
    initialize(options) {
        Object.assign(this, options);
    }
    render() {
        this.$el.empty().append(`
            <span>${this.participant.id} ${this.participant.lastname}</span><span>${this.participant.club}</span>
        `);
        return this;
    }
}
