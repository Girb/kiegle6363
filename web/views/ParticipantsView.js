import $ from 'jquery';
import BaseView from './BaseView';
import Participants from '../models/Participants';
import ParticipantList from './ParticipantList';

export default class ParticipantsView extends BaseView {
    get title() { return 'Slagere'; }
    initialize(options) {
        Object.assign(this, options);
        this.collection = new Participants();
        this.collection.url = app.url(`/competitions/${app.comp.id}/participants/0`);
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
            'change input[type=radio]': 'statusFilter'
        };
    }
    statusFilter(e) {
        const statusid = $(e.currentTarget).val();
        this.collection.url = app.url(`/competitions/${app.comp.id}/participants/${statusid}`);
        this.collection.fetch();
    }
    radio(status, txt, addto) {
        $('<input type="radio" class="mr-1" name="status" />').val(status).prop('id', 's'+status).appendTo(addto);
        $('<label/>').addClass('mr-3').text(txt).prop('for', 's'+status).appendTo(addto);
    }
    render() {
        this.$el.empty();
        
        $('<h1/>').text('Påmeldte slagere').appendTo(this.$el);
        const fg = $('<fieldgroup/>').appendTo(this.$el);
        this.radio(0, 'Påmeldt / ubekreftet', fg);
        this.radio(1, 'Bekreftet', fg);
        this.radio(2, 'Ferdig', fg);
        this.radio(3, 'Avmeldt', fg);
        fg.find('input[type=radio]:first').attr('checked', 'checked');


        const cv = new ParticipantList({ collection: this.collection, filter: true });
        cv.render().$el.addClass('confirmed').appendTo(this.$el);

        // $('<h1/>').text('Påmeldt').appendTo(this.$el);
        // const rv = new ParticipantList({ collection: this.registered, filter: true });
        // rv.render().$el.appendTo(this.$el);

        return this;
    }
}
