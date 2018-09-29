import $ from 'jquery';
import BaseView from './BaseView';
import Players from '../models/Players';
import PlayerList from './PlayerList';
import EditPlayerView from './EditPlayerView';

export default class SignupView extends BaseView {
    initialize(options) {
        Object.assign(this, options);        
        this.collection = new Players();
        this.collection.url = app.url(`/players/notincompetition/${app.comp.id}`);
    }
    get events() {
        return {
            'click .add': 'addPlayer',
        };
    }
    addPlayer(e) {
        e.preventDefault();
        const ev = new EditPlayerView();
        this.listenToOnce(ev, 'saved', (player) => {
            this.collection.add(player);
        });
        ev.render().show();
    }
    render() {
        this.$el.empty();
        $('<h1/>').text('Slagere (ikke påmeldte)').appendTo(this.$el);
        const pl = new PlayerList({ collection: this.collection });
        pl.render().$el.appendTo(this.$el);
        $('<button class="btn btn-primary add" type="button">Opprett ny slager...</button>').appendTo(this.$el);
        return this;
    }
}