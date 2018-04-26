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
            <table>
                <tr>
                    <th>Må slå</th>
                    <th>Prognose</th>
                    <th>Maks</th>
                </tr>
                <tr>
                    <td>${this.doc.secondbest10() || '-'}</td>
                    <td>${this.doc.prog10()}</td>
                    <td>${this.doc.max10()}</td>
                </tr>
            </table>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
