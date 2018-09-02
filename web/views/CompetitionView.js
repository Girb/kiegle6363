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
        this.model = new Competition();
        this.model.url = app.url(`/competitions/${app.comp.id}`);
    }
    render() {
        this.model.fetch().then(() => {
            const comp = this.model.get('title');
            app.navbar.update();
            this.$el.empty();
            const q = new ParticipantQueue({ model: this.model });
            q.render().$el.appendTo(this.$el);
        });

        return this;
    }
}
