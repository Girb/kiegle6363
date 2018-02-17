import BaseView from './BaseView';

const hideSideNav = function () {
    document.getElementById('sidenav').classList.remove('open');
    document.body.removeEventListener('click', hideSideNav);
};

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
    get events() {
        return {
            'click .menubtn': 'showSideNav',
        };
    }
    showSideNav(e) {
        e.stopPropagation();
        document.body.addEventListener('click', hideSideNav, false);
        const sn = document.getElementById('sidenav');
        sn && sn.classList.add('open');
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}

export default Header;
