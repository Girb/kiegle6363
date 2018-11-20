import BaseView from './BaseView';
import ParticipantQueue from './ParticipantQueue';
import Competition from '../models/Competition';

export default class CompetitionView extends BaseView {
    title() {
        return 'Slagning info';
    }
    get className() { return 'competition'; }
    initialize(options) {
        Object.assign(this, options);
    }
    render() {
        app.navbar.update();
        this.$el.empty();
        const q = new ParticipantQueue({ model: this.model });
        q.render().$el.appendTo(this.$el);

        return this;
    }
}
