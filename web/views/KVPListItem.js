import NativeView from 'backbone.nativeview';

export default class KVPListItem extends NativeView {
    get tagName() { return 'li'; }
    constructor(model) {
        super();
        this.model = model;
    }
    get events() {
        return {
            'click .name': 'clicked'
        };
    }
    clicked() {
        this.trigger('click', this);
    }
    scores() {
        return this.model.scoreSums(true).map(sx => `<span class="score">${sx}</span>`).join('');
    }
    get template() {
        return `
            <span class="name">${this.model.get('lastname').toUpperCase()}</span> ${this.scores()}
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
