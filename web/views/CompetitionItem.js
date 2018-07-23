import $ from 'jquery';
import Backbone from 'backbone';

export default class CompetitionItem extends Backbone.View {
    get className() { return 'comp card text-primary'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get events() {
        return {
            'click .go': 'go'
        };
    }
    go(e) {
        e.preventDefault();
        app.session.set('competition', this.model);
        app.navigate('/participants', { trigger: true });
    }
    render() {
        this.$el.empty();
        $('<img/>').addClass('card-img-top').prop('src', '../img/bg1.png').appendTo(this.$el);
        const cb = $('<div/>').addClass('card-body').appendTo(this.$el);
        $('<h5/>').addClass('card-title-primary').text(this.model.get('title')).appendTo(cb);
        $('<p/>').addClass('card-text').text(this.model.rulesDesc()).appendTo(cb);
        $('<a/>').addClass('btn btn-primary go').prop('href', '/participants').text('Til konkurransen').appendTo(cb);
        return this;
    }
}