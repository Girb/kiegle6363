import Backbone from 'backbone';

export default class KVPResultItemView extends Backbone.View {
    get tagName() { return 'tr'; }
    initialize(options) {
        Object.assign(this, options);
    }
    get template() {
        return `
            <td>${this.idx+1}</td>
            <td>${this.model.name()}</td>
            <td>${this.model.get('best2').join(' &nbsp; ')}</td>
            <td>${this.model.get('best2sum')}</td>
        `;
    }
    render() {
        this.$el.empty();
        this.$el.append(this.template);
        return this;
    }
}