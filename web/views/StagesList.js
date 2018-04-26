import BaseView from '../BaseView';
import Server from '../server';
import Participants from '../models/Participants';

export default class StagesList extends BaseView {
    get tagName() { return 'ul'; }
    get className() { return 'bb'; }
    get title() { return 'Slagninger'; }
    render() {
        const ps = new Participants();
        ps.url = `${Server.baseUrl()}/stages/1`;
        ps.fetch();

        return this;
    }
}
