import Backbone from 'backbone';

export default class TotalScoreView extends Backbone.View {
    initialize(options) {
        Object.assign(this, options);
        // this.listenTo(this.doc, 'change:draft', () => {
        //     var draft = this.doc.get('draft');
        //     if( draft && draft.length ) {
        //         const vals = [];
        //         for( const i of this.doc.get('draft') ) {
        //             i && vals.push(i);
        //         }
        //         if( vals.length ) {
        //             const sum = vals.reduce((a, b) => a + b);
        //             this.el.innerHTML = sum;
        //         }
        //     }
        // });
    }
    get className() { return 'totalscore'; }
    get template() {
        return `
            0
        `;
    }
    set(val) {
        this.$el.text(val);
    }
    render() {
        this.$el.empty().append(this.template);
        return this;
    }
}
