import Backbone from 'backbone';

export default class SumItem extends Backbone.View {
    get tagName() { return 'button'; }
    get className() { return 'btn btn-outline-secondary dropdown-toggle sum'; }
    initialize(options) {
        Object.assign(this, options);
    }
    render() {
        this.$el.empty().text(this.round.sum);
        return this;
    }
}