import $ from 'jquery';
import BaseView from './BaseView';
import Participants from '../models/Participants';
import ParticipantList from './ParticipantList';

export default class ParticipantsView extends BaseView {
    get title() { return 'Slagere'; }
    initialize(options) {
        Object.assign(this, options);
        this.confirmed = new Participants();
        this.confirmed.url = 'http://localhost:3001/api/competitions/2/participants/1';
        this.registered = new Participants();
        this.registered.url = 'http://localhost:3001/api/competitions/2/participants/0';
        this.listenTo(this.confirmed, 'change:status_id', this.statusChanged);
        this.listenTo(this.registered, 'change:status_id', this.statusChanged);
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
            'click #addparticipant': 'add',
        };
    }
    render() {
        this.$el.empty();
        
        $('<h1/>').text('Bekreftet').appendTo(this.$el);
        const cv = new ParticipantList({ collection: this.confirmed });
        cv.render().$el.addClass('confirmed').appendTo(this.$el);

        $('<h1/>').text('Påmeldt').appendTo(this.$el);
        const rv = new ParticipantList({ collection: this.registered });
        rv.render().$el.appendTo(this.$el);

        return this;
    }
}
