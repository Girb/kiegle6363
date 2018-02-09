import BaseView from './BaseView';

class Header extends BaseView {
    constructor(baseview) {
        super();
        this.baseview = baseview;
    }
    get tagName() { return 'header'; }
    get template() {
        return `
            <h1>${this.baseview.title}</h1>
            <a href="#/"><img id="logo" src="img/kiegle6363white.svg" alt="Kiegle6363 logo" /></a>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export default Header;
