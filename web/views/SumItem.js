import $ from 'jquery';
import Backbone from 'backbone';
import SumItemMenu from './SumItemMenu';
import Server from '../server';

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
            const m = new SumItemMenu({ round: this.round });
            this.listenTo(m, 'round:delete', () => {
                Server.delete(`/rounds/${this.round.id}`).then(() => {
                    this.remove();                
                });
            });
            m.render().$el.appendTo(this.$el);
        }
    }
    render() {
        this.$el.empty();
        // const throwspr = app.comp.throws_per_round;
        
        // if (this.round.throws.length < throwspr) {
        //     txt += '*';
        // }
        let txt = this.round.sum || '0';
        $('<button />')
            .addClass('btn btn-outline-secondary dropdown-toggle sum')
            .attr('data-toggle', 'dropdown')
            .attr('aria-haspopup', true)
            .attr('aria-expanded', false)
            .text(txt)
            .appendTo(this.$el);
        
        return this;
    }
}
