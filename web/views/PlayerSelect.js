import $ from 'jquery';
import Backbone from 'backbone';

export default class PlayerSelect extends Backbone.View {
    get tagName() { return 'select'; }
    get className() { return 'form-control players'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'all', _.debounce(this.render, 0));
        this.collection.fetch();
    }
    addOne(p) {
        $('<option/>').val(p.id).text(p.toString()).appendTo(this.$el);
    }
    addAll() {
        this.collection.each(this.addOne, this);
    }
    render() {
        return this;
    }
}
