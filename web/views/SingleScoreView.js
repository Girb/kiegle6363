import $ from 'jquery';
import Backbone from 'backbone';
import Server from '../server';

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
            'keydown': 'kd',
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
            .css('left', '-200%')
            .appendTo(this.$el)
            .focus();
    }
    kd(e) {
        if ([37, 39, 46].indexOf(e.keyCode) !== -1 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            if (e.keyCode === 46) {
                this.$el.text('-'); 
            } else if (e.keyCode === 37) {
                e.preventDefault();
                this.trigger('focus:prev', this);
                return true;
            } else if (e.keyCode === 39) {
                e.preventDefault();
                this.trigger('focus:next', this);
                return true;
            } else {
                const numpadmodifier = e.keyCode >= 96 ? 48 : 0;
                this.$el.text(String.fromCharCode(e.which - numpadmodifier));
            }
            
            this.throw.score = this.get();
            this.saveThrow();
            this.trigger('change:value', this);
            this.round.trigger('change:score');
            return false;
        } 
        e.preventDefault();
        return true;
    }
    get() {
        return isNaN(this.$el.text()) ? undefined : parseInt(this.$el.text());
    }
    saveThrow() {
        Server.post('/throws', this.throw).then(() => {
            console.log('score updated');
        });        
    }
    render() {
        this.$el.text(this.throw.score || '-');
        return this;
    }
}
