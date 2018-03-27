import NativeView from 'backbone.nativeview';

export default class RegPrognosisView extends NativeView {
    get className() { return 'prognosis'; }
    constructor(doc) {
        super();
        this.doc = doc;
        this.listenTo(this.doc, 'change:draft', this.render);
    }

    get template() {
        return `
            <div>Prognose: <span class="num">${this.doc.prog10()}</span></div>
            <div>Maks: <span class="num">${this.doc.max10()}</span></div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
