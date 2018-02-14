import NativeView from 'backbone.nativeview';

export default class TotalScoreView extends NativeView {
    constructor(doc) {
        super();
        this.doc = doc;
        this.listenTo(this.doc, 'change:draft', () => {
            var draft = this.doc.get('draft');
            if( draft && draft.length ) {
                const vals = [];
                for( const i of this.doc.get('draft') ) {
                    i && vals.push(i);
                }
                if( vals.length ) {
                    const sum = vals.reduce((a, b) => a + b);
                    this.el.innerHTML = sum;
                }
            }
        });
    }
    get className() { return 'totalscore'; }
    get template() {
        return `
            0
        `;
    }
    set(val) {
        this.el.innerHTML = val;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
