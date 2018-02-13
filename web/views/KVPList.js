import BaseView from '../BaseView';
import ListView from './ListView';

export default class KVPList extends BaseView {
    get title() { return 'Tavle'; }
    render() {
        this.el.innerHTML = '';
        app.db.all().then((result) => {
            const data = [];
            result.rows.forEach((row) => {
                data.push({
                    text: row.doc.lastname,
                    extra: row.doc.club,
                    id: row.doc._id
                });
            }, this);
            const lv = new ListView({ data });
            this.listenTo(lv, 'select', (itm) => {
                window.location.href = `#reg/${itm.id}/10`;
            });
            this.el.appendChild(lv.render().el);
        });
        return this;
    }
}
