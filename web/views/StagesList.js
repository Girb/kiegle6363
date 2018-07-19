import BaseView from '../BaseView';
import Server from '../server';
import moment from 'moment';

export default class StagesList extends BaseView {
    get tagName() { return 'ul'; }
    get className() { return 'bb'; }
    get title() { return 'Slagninger'; }
    render() {
        Server.get(`/competitions/${app.session.get('competition').id}/stages`).then((data) => {
            data.forEach((stage) => {
                const d = document.createElement('li');
                d.innerHTML = moment(stage.stage_date).format('DD.MM.YYYY');
                this.el.appendChild(d);
            });
        });

        return this;
    }
}
