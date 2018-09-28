import $ from 'jquery';
import BaseView from './BaseView';
import Players from '../models/Players';
import PlayerList from './PlayerList';

export default class SignupView extends BaseView {
    initialize(options) {
        Object.assign(this, options);        
        this.collection = new Players();
        this.collection.url = app.url(`/players/notincompetition/${app.comp.id}`);
    }
    render() {
        this.$el.empty();
        $('<h1/>').text('Slagere (ikke påmeldte)').appendTo(this.$el);
        const pl = new PlayerList({ collection: this.collection });
        pl.render().$el.appendTo(this.$el);
        return this;
    }
}