import BaseView from './BaseView';
import ParticipantQueue from './ParticipantQueue';

export default class CompetitionView extends BaseView {
    get className() { return 'competition'; }
    initialize(options) {
        Object.assign(this, options);
    }
    render() {

        this.$el.empty();
        var q = new ParticipantQueue();
        q.render().$el.appendTo(this.$el);

        return this;
    }

}