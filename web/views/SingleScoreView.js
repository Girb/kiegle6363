import $ from 'jquery';
import Backbone from 'backbone';
import Server from '../server';
import { timingSafeEqual } from 'crypto';

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
    bl(e) {
        this.$ipt.remove();
    }
    fc() {
        this.$ipt = $('<input />')
            .prop('type', 'number')
            .css('position', 'absolute')
            .css('width', '2em')
            .css('left', '-200%')
            .appendTo(this.$el)
            .focus();
        this.trigger('focused', this);
    }
    kd(e) {
        if ([37, 39, 46, 9  ].indexOf(e.keyCode) !== -1 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            if (e.keyCode === 46) {
                this.$el.text('-'); 
            } else if (e.keyCode === 37 || (e.keyCode === 9 && e.shiftKey)) {
                e.preventDefault();
                this.trigger('focus:prev', this);
                return true;
            } else if (e.keyCode === 39 || (e.keyCode === 9 && !e.shiftKey)) {
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
        this.$el.toggleClass('sep', !!this.separator);
        const score = (this.throw.score === null || this.throw.score === undefined) ? '-' : this.throw.score;
        this.$el.text(score);
        return this;
    }
}
