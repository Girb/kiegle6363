import $ from 'jquery';
import Backbone from 'backbone';

export default class PlayerListItem extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.model, 'remove', this.remove);
        this.listenTo(this.model, 'sync', this.render);
    }
    render() {
        this.$el.empty();
        $('<td/>').text(this.model.name()).appendTo(this.$el);
        $('<td/>').text(this.model.club()).appendTo(this.$el);
        return this;
    }
}