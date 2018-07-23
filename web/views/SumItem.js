import $ from 'jquery';
import Backbone from 'backbone';
import SumItemMenu from './SumItemMenu';

export default class SumItem extends Backbone.View {
    get className() { return 'sumdiv'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get events() {
        return {
            'mousedown button': 'showDropdown',
        };
    }
    showDropdown(e) {
        e.preventDefault();
        const menu = this.$('.dropdown-menu');
        if (!menu.length) {
            new SumItemMenu({ round: this.round }).render().$el.appendTo(this.$el);
        }
    }
    render() {
        this.$el.empty();
        $('<button />')
            .addClass('btn btn-outline-secondary dropdown-toggle sum')
            .attr('data-toggle', 'dropdown')
            .attr('aria-haspopup', true)
            .attr('aria-expanded', false)
            .text(this.round.sum)
            .appendTo(this.$el);
        
        return this;
    }
}
