import BaseView from '../BaseView';

export default class AdminHome extends BaseView {
    get className() { return 'admin'; }
    get template() {
        return `
            <div class="activecomp">
                <label>Aktiv konkurranse:</label>
                <div class="compname">Kongeaften 2018</div>
                <div class="compmeta">Gustibus 1968</div>
                <div class="compmeta">Opprettet 08.02.2018</div>
                <div class="compmeta">279 slagere</div>
            </div>
            <div class="buttons">
                <button class="main newcomp"><span>Rediger slagere</span></button>
            </div>
            <div class="buttons">
                <button class="main newcomp"><span>Opprett ny konkurranse</span></button>
            </div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
