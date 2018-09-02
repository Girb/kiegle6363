import Backbone from 'backbone';

export default class RegPrognosisView extends Backbone.View {
    get className() { return 'prognosis'; }
    initialize(options) {
        Object.assign(this, options);
        console.log(this.model);
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
                    <td>${this.model.secondbest10() || '-'}</td>
                    <td>${this.model.prog10()}</td>
                    <td>${this.model.max10()}</td>
                </tr>
            </table>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
