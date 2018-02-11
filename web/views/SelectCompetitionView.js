import BaseView from '../BaseView';
import ListView from './ListView';
import DBName from  '../DBName';

export default class SelectCompetitionView extends BaseView {
    get title() { return 'Velg konkurranse'; }
    get className() { return 'comps'; }
    render() {
        this.el.innerHTML = '';
        app.db.dbs((res) => {
            var data = [];
            res.forEach(function(db) {
                if( !db.startsWith('_') ) {
                    var itmdata = {
                        text: DBName.humanize(db),
                        extra : DBName.getDateStr(db),
                        icon: 'radio_button_unchecked',
                        raw: db
                    };
                    data.push(itmdata);
                }
            }, this);
            let lv = new ListView({ data: data });
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
