import BaseView from '../BaseView';

export default class RegView extends BaseView {
    constructor(slagerid, count) {
        super();
        this.count = count;
        this.slagerid = slagerid;
    }
    get title() { return 'Slagning'; }
    get className() { return 'reg'; }
    get template() {
        return `
            <div class="scoreboard">
                <span>6</span><span>7</span><span>4</span><span>4</span><span>9</span><span>0</span><span>7</span><span>7</span><span>8</span><span>6</span>
            </div>
        `;
    }
    render() {
        this.el.innerHTML = this.template;
        return this;
    }
}
