import BaseView from './BaseView';

class Header extends BaseView {
    constructor(baseview) {
        super();
        this.baseview = baseview;
    }
    get tagName() { return 'header'; }
    get template() {
        return `
            <div class="menubtn"><i class="material-icons">menu</i></div>
            <h1>${this.baseview.title}</h1>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export default Header;
