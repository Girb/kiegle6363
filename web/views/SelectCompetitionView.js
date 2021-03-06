import BaseView from '../BaseView';
import ListView from './ListView';
import DBName from '../DBName';
import DB from '../db';

export default class SelectCompetitionView extends BaseView {
    get title() { return 'Velg konkurranse'; }
    get className() { return 'comps'; }
    get template() {
        return `
            <div style="margin-bottom: 16px"><button id="createcomp"><span>Opprett ny konkurranse</span></button></div>
        `;
    }
    get events() {
        return {
            'click #createcomp': 'createComp',
        };
    }
    createComp() {
        window.location.href = '#admin/competitions/create';
    }
    render() {
        this.el.innerHTML = this.template;
        DB.dbs((res) => {
            const data = [];
            res.forEach((db) => {
                if (!db.startsWith('_')) {
                    const dbn = new DBName(db);
                    const itmdata = {
                        text: dbn.name,
                        extra: `${dbn.rules} (${dbn.dateStr})`,
                        icon: 'radio_button_unchecked',
                        raw: dbn.rawname,
                    };
                    data.push(itmdata);
                }
            }, this);
            const lv = new ListView({ data });
            lv.on('select', (itm) => {
                const dbname = itm.raw;
                localStorage.setItem('dbname', dbname);
                app.db.connect(dbname);
                window.location.href = '#admin';
            });
            this.el.appendChild(lv.render().el);
        });

        return this;
    }
}
