import BaseView from './BaseView';

class Header extends BaseView {
    get tagName() { return 'header'; }
    get template() {
        return `
            <a href="#/"><img src="img/kiegle6363white.svg" alt="Kiegle6363 logo" /></a>
            <img class="kiegle" src="img/participants.png" alt="Kiegle som holder skilt med teksten 'Slagere'" />
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export default Header;
