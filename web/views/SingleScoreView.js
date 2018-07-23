import $ from 'jquery';
import Backbone from 'backbone';

export default class SingleScoreView extends Backbone.View {
    initialize(options) {
        Object.assign(this, options);
    }
    get tagName() { return 'span'; }
    get attributes() {
        return {
            'tabindex': '0',
        };
    }
    get events() {
        return {
            'keypress': 'kp',
            'focus': 'fc',
            'blur input': 'bl',
        };
    }
    bl() {
        this.$ipt.remove();
    }
    fc() {
        this.$ipt = $('<input />')
            .prop('type', 'number')
            .css('position', 'absolute')
            .css('left:', '-120%')
            .appendTo(this.$el)
            .focus();
    }
    kp(e) {
        this.$el.text(e.key);
        this.trigger('change:value', this);
    }
    get() {
        return isNaN(this.$el.text()) ? undefined : parseInt(this.$el.text());
    }
    render() {
        this.$el.text(this.score || '-');
        return this;
    }
}
