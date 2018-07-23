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
            'click .edit': 'editRound'
        };
    }
    deleteRound(e) {
        e.preventDefault();
        if (window.confirm('Er du helt sikker?')) {
            console.log('deleting...');
        }
    }
    editRound(e) {
        e.preventDefault();
        app.navigate(`/round/${this.round.id}`, { trigger: true });
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
        this.item('Rediger', 'edit');
        this.item('Slett', 'del');
        return this;
    }
}
