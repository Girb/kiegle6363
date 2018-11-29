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
        const p1 = this.$('.prev1').val(),
            p2 = this.$('.prev2').val();
        this.doSignup(p1, p2);
    }
    doSignup(prev1, prev2) {
        Server.post(`/competitions/${app.comp.id}/players/add/${this.model.id}`, { prev1, prev2 }).then(() => {
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
        const typeid = app.comp.get('type_id');
        if( typeid === 2 || typeid === 3 ) {
            $('<input />').addClass('prev1').prop('placeholder', 'Total kval').appendTo(td);
        }
        if( typeid === 3 ) {
            $('<input />').addClass('prev2').prop('placeholder', 'Total semi').appendTo(td);
        }
        $('<button/>').addClass('btn btn-sm btn-primary signup').text('Meld på').appendTo(td);

        return this;
    }
}