import $ from 'jquery';
import Backbone from 'backbone';

export default class SumItemMenu extends Backbone.View {
    get className() {
        return 'dropdown-menu';
    }
    initialize(options) {
        Object.assign(this, options);
    }
    get events() {
        return {
            'click .del': 'deleteRound',
        };
    }
    deleteRound(e) {
        e.preventDefault();
        if (window.confirm('Er du helt sikker?')) {
            console.log('deleting...');
        }
    }
    item(text, className) {
        return $('<a/>')
            .addClass(`dropdown-item ${className}`)
            .prop('href', '#')
            .text(text)
            .appendTo(this.$el);
    }
    render() {
        this.$el.empty();
        this.item('Slett', 'del');
        return this;
    }
}
