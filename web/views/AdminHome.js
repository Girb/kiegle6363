import BaseView from '../BaseView';
import DBName from '../DBName';

export default class AdminHome extends BaseView {
    get title() { return 'Kiegleadmin'; }
    get className() { return 'admin'; }
    get events() {
        return {
            'click .newcomp': 'newCompetition',
            'click .editparticipants': 'editParticipants'
        };
    }
    newCompetition() {
        window.location.href = '/#admin/competitions/create';
    }
    editParticipants() {
        window.location.href = '/#participants';
    }
    get template() {
        return `
            <div class="activecomp">
                <label>Aktiv konkurranse:</label>
                <div class="compname"></div>
                <div class="compmeta rules">Gustibus 1968</div>
                <div class="compmeta date"></div>
                <div class="compmeta pcount">279 slagere</div>
            </div>
            <div class="buttons">
                <button class="main editparticipants"><span>Rediger slagere</span></button>
            </div>
            <div class="buttons">
                <button class="main newcomp"><span>Opprett ny konkurranse</span></button>
            </div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        app.db.info().then((info) => {
            const rawname = info.db_name;
            const name = DBName.humanize(rawname);
            const rules = DBName.getRules(rawname);
            this.one('.compname').innerText = name;
            this.one('.rules').innerText = rules;
            this.one('.pcount').innerText = info.doc_count + ' slagere';
            this.one('.date').innerText = 'Dato: ' + DBName.getDateStr(rawname);
        });
        return this;
    }
}
