import BaseView from '../BaseView';

export default class ModalView extends BaseView {
    get className() { return 'overlay'; }
    get template() {
        return `
            <div class="modal">
                <div class="header">${this.title}</div>
                <div class="content"></div>
                <div class="footer"></div>
            </div>     
        `;
    }
    get content() {
        return `override with content`;
    }
    get events() {
        return {
        };
    }
    show() {
        document.body.style.overflow = 'hidden';
        document.body.appendChild(this.el);
    }
    close() {
        document.body.style.overflow = 'auto';
        this.el.removeEventListener('click', this.close.bind(this));
        document.body.removeChild(this.el);
    }
    render() {
        this.el.addEventListener('click', (e) => {
            if (e.target.id === 'overlay') {
                this.close();
            }
        });
        this.el.setAttribute('id', 'overlay');
        this.el.innerHTML = this.template;
        const mdl = this.one('.modal');
        mdl.style.width = this.width ? `${this.width}px` : 'auto';
        mdl.style.height = this.height ? `${this.height}px` : 'auto';
        this.one('.content').innerHTML = this.content;
        _.defer(() => {
            this.one('input').focus();
        });

        return this;
    }
}
