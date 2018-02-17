import BaseView from '../BaseView';

export default class SideNav extends BaseView {
    get id() { return 'sidenav'; }
    get _template() {
        return `
            <div class="closesidenav"><i class="material-icons">close</i></div>
            <div class="menucontent"></div>
        `;
    }
    get template() {
        return '';
    }
    render() {
        this.el.innerHTML = this._template;
        this.one('.menucontent').innerHTML = this.template;
        return this;
    }
}
