import Backbone from 'backbone';

export default class ParticipantQueueItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get template() {
        return `
            <td scope="row">${this.title}</td>
            <td class="rounds"></td>
        `;
    }
    render() {
        this.$el.empty().append(this.template);
        this.rounds.forEach(round => {
            this.$('.rounds').append(round.throws.reduce((a,b) => a + b, 0));
        });
        return this;
    }

}