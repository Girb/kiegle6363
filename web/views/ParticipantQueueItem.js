import Backbone from 'backbone';

export default class ParticipantQueueItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get template() {
        return `
            <td scope="row">${this.model.toString()}</td>
            <td class="rounds"></td>
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
            this.$('.rounds').append(this.roundTemplate(round));
        });
        $('<button/>').addClass('btn btn-primary add').text('Ny').appendTo(this.$('.rounds'));
        return this;
    }
}
