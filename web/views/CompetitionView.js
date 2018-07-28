import BaseView from './BaseView';
import ParticipantQueue from './ParticipantQueue';

export default class CompetitionView extends BaseView {
    title() {
        return 'Slagning info';
    }
    get className() { return 'competition'; }
    initialize(options) {
        Object.assign(this, options);
    }
    render() {
        const comp = app.session.get('competition').get('title');
        app.navbar.info(comp);
        this.$el.empty();
        const q = new ParticipantQueue();
        q.render().$el.appendTo(this.$el);

        return this;
    }
}
