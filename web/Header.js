import BaseView from './BaseView';

class Header extends BaseView {
    get tagName() { return 'header'; }
    get template() {
        return `
            <a href="#/"><img id="logo" src="img/kiegle6363white.svg" alt="Kiegle6363 logo" /></a>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export default Header;
