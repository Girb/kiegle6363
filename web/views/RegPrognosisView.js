import Backbone from 'backbone';

export default class RegPrognosisView extends Backbone.View {
    get className() { return 'prognosis'; }
    initialize(options) {
        Object.assign(this, options);
        this.listenTo(this.model, 'change', this.render);
    }

    get template() {
        return `
            <table>
                <tr>
                    <th>Snitt</th>
                    <th>Prognose</th>
                    <th>Maks</th>
                </tr>
                <tr>
                    <td>${this.model.avg()}</td>
                    <td>${this.model.prog()}</td>
                    <td>${this.model.max()}</td>
                </tr>
            </table>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
