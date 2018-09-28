import $ from 'jquery';
import Backbone from 'backbone';
import Server from '../server';

export default class PlayerListItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.model, 'remove', this.remove);
        this.listenTo(this.model, 'sync', this.render);
    }
    get events() {
        return {
            'click .signup': 'signup',
        };
    }
    signup(e) {
        e.preventDefault();
        Server.post(`/competitions/${app.comp.id}/players/add/${this.model.id}`, {}).then(() => {
            app.alert(this.model.name() + ' er nå påmeldt', 'success');
            this.$el.hide(50, () => {
                this.remove();
            });
        });
    }
    render() {
        this.$el.empty();
        $('<td/>').text(this.model.name()).appendTo(this.$el);
        $('<td/>').text(this.model.club()).appendTo(this.$el);
        const td = $('<td/>').addClass('commands').appendTo(this.$el);
        $('<button/>').addClass('btn btn-sm btn-primary signup').text('Meld på').appendTo(td);

        return this;
    }
}