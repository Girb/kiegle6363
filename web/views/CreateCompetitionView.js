import BaseView from '../BaseView';
import DBName from '../DBName';

export default class CreateCompetitionView extends BaseView {
    get title() { return 'Ny konkurranse'; }
    get className() { return 'createcomp'; }
    get template() {
        return `
            <form>
                <div class="row">
                    <label for="name">Navn</label>
                    <input id="name" style="text-transform: capitalize;" />
                </div>
                <div class="row">
                    <label for="date">Dato</label>
                    <input type="date" id="date" />                
                </div>
                <div class="row">
                    <label for="rules">Regler</label>
                    <select id="rules">
                        <option value="gus">Gustibus 1968</option>
                        <option value="kvp">Kniksens Vandrepokal</option>
                        <option value="kvk">Klubb vs Klubb</option>
                        <option value="dra">Dronningaften</option>                
                    </select>
                </div>
                <div class="row">
                    <button disabled="disabled" id="btncreate"><span>Opprett konkurranse</span></button>
                </div>
            </form>
        `;
    }
    get events() {
        return {
            'click #btncreate': 'create',
            'input #name': 'changed',
        };
    }
    changed() {
        const name = this.one('#name').value.trim();
        this.one('button').disabled = !name.length;
    }
    create(e) {
        e.preventDefault();
        e.target.closest('button').setAttribute('disabled', true);
        const name = this.one('#name').value,
            rules = this.one('#rules').value,
            date = this.one('#date').value;
        const dbname = DBName.create(name, date, rules);
        console.log(dbname);
        localStorage.setItem('dbname', dbname);
        app.db.connect(dbname);
    }
    render() {
        this.el.innerHTML = this.template;
        this.one('#date').value = new Date().toISOString().split('T')[0];
        return this;
    }
}
