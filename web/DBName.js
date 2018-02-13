import moment from 'moment';

export default class DBName {
    static get nameMap() {
        return {
            'gus': 'Gustibus 1968',
            'kvp': 'Kniksens Vandrepokal',
            'kvk': 'Klubb vs Klubb',
            'dra': 'Dronningaften',
        };
    }
    constructor(rawname) {
        this.rawname = rawname;
    }
    static create(name, date, type) {
        let rn = name.toLowerCase()
            .replace(/ /g, '_')
            .replace('æ', 'ae')
            .replace('ø', 'o')
            .replace('å', 'a')
            + '+'
            + date
            + '+'
            + type.toLowerCase();
        return new DBName(rn);
    }

    get name() {
        const namepart = this.rawname.split('+')[0].replace(/_/g, ' ');
        return namepart.replace(/\b\w/g, l => l.toUpperCase()).replace('_', ' ');
    }
    get rules() {
        const abbr = this.rawname.split('+')[2];
        return DBName.nameMap[abbr] || '(Ukjent)';
    }
    get dateStr() {
        return moment(this.rawname.split('+')[1]).format('DD.MM.YYYY');
    }
}
