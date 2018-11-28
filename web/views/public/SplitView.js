import $ from 'jquery';
import Backbone from 'backbone';
import ResultsList from './ResultsList';
import Queue from './Queue';
import ScreenFull from 'screenfull';

export default class SplitView extends Backbone.View {
    initialize(options) {
        Object.assign(this, options);
    }


    render() {
        this.$el.empty();
        const c = $('<div/>').addClass('splitter').appendTo(this.$el);
        const l = $('<div/>').addClass('left').appendTo(c);
        const r = $('<div/>').addClass('right').appendTo(c);
        var qv = new Queue({ model: this.model });
        var rv = new ResultsList({ model: this.model });
        qv.render().$el.appendTo(l);
        rv.render().$el.appendTo(r);
        return this;
    }

}
