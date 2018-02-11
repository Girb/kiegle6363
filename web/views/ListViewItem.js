import NativeView from 'backbone.nativeview';

export default class ListViewItem extends NativeView {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
    get tagName() { return 'li'; }
    get events() {
        return {
            'click': 'clicked'
        };
    }
    clicked() {
        this.trigger('click', this);
    }
    get template() {
        return `
            <div class="icon"><i class="material-icons">${this.icon || 'radio_button_unchecked'}</i></div>
            <div class="text">${this.text}</div>
            <div class="extra">${this.extra}</div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;

        return this;
    }
}
