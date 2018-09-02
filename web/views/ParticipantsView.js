import $ from 'jquery';
import BaseView from './BaseView';
import Participants from '../models/Participants';
import ParticipantList from './ParticipantList';

export default class ParticipantsView extends BaseView {
    get title() { return 'Slagere'; }
    initialize(options) {
        Object.assign(this, options);
        this.confirmed = new Participants();
        this.confirmed.url = app.url(`/competitions/${app.comp.id}/participants/1`);
        this.registered = new Participants();
        this.registered.url = app.url(`/competitions/${app.comp.id}/participants/0`);
        this.listenTo(this.confirmed, 'change:status_id', this.statusChanged);
        this.listenTo(this.registered, 'change:status_id', this.statusChanged);
        //this.listenTo(this.confirmed, 'change reset', this.updateInfo);
        //this.listenTo(this.registered, 'change reset', this.updateInfo);
    }
    updateInfo() {
        const comp = app.session.get('competition').get('title');
        app.navbar.info(`${comp} (${this.confirmed.size()} i kø, ${this.registered.size()} ubekreftet)`);
    }
    statusChanged(model) {
        model.collection.remove(model);
        if (model.get('status_id') === 0) {
            this.registered.add(model);
        } else if (model.get('status_id') === 1) {
            this.confirmed.add(model);
            this.confirmed.saveSortOrders();
        }
    }
    get events() {
        return {
            'click #addparticipant': 'add'
        };
    }
    render() {
        this.$el.empty();
        
        $('<h1/>').text('Bekreftet / møtt opp').appendTo(this.$el);
        const cv = new ParticipantList({ collection: this.confirmed });
        cv.render().$el.addClass('confirmed').appendTo(this.$el);

        $('<h1/>').text('Påmeldt').appendTo(this.$el);
        const rv = new ParticipantList({ collection: this.registered, filter: true });
        rv.render().$el.appendTo(this.$el);

        return this;
    }
}
