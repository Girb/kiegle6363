import NativeView from 'backbone.nativeview';
import ListViewitem from './ListViewItem';

export default class ListView extends NativeView {
    constructor(options) {
        super(options);
        this.data = options.data;
    }
    get tagName() { return 'ul'; }
    get className() { return 'listview'; }
    render() {
        this.el.innerHTML = '';
        this.data.forEach(function(dx) {
            let itm = new ListViewitem(dx);
            this.listenTo(itm, 'click', (itm) => {
                this.trigger('select', itm);
            });
            this.el.appendChild(itm.render().el);
        }, this);
        return this;
    }
}
