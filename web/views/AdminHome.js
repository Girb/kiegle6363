import BaseView from './BaseView';
import DBName from '../DBName';

export default class AdminHome extends BaseView {
    get title() { return 'Kiegleadmin'; }
    get className() { return 'admin'; }
    get events() {
        return {
            'click .selectcomp': 'selectCompetition',
            'click .editparticipants': 'editParticipants',
        };
    }
    selectCompetition() {
        window.location.href = '/#admin/competitions';
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
                <button class="main selectcomp"><span>Bytt konkurranse</span></button>
            </div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        app.db.info().then((info) => {
            const dbname = new DBName(info.db_name);
            this.one('.compname').innerText = dbname.name;
            this.one('.rules').innerText = dbname.rules;
            this.one('.pcount').innerText = `${info.doc_count} slagere`;
            this.one('.date').innerText = `Dato: ${dbname.dateStr}`;
        });
        return this;
    }
}
