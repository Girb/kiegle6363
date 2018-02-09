export default class DBName {
    static get nameMap() {
        return {
            'gus': 'Gustibus 1968',
            'kvp': 'Kniksens Vandrepokal',
            'kvk': 'Klubb vs Klubb',
            'dra': 'Dronningaften',
        };
    }
    static humanize(dbname) {
        const namepart = dbname.split('+')[0].replace(/_/g, ' ');
        return namepart.replace(/\b\w/g, l => l.toUpperCase()).replace('_', ' ');
    }
    static create(name, date, type) {
        return name.toLowerCase()
            .replace(/ /g, '_')
            .replace('æ', 'ae')
            .replace('ø', 'o')
            .replace('å', 'a')
            + '+'
            + date
            + '+'
            //.replace(/^[a-z][a-z0-9_$()+/-]*$/, '')
            + type.toLowerCase();
    }
    static getRules(name) {
        const abbr = name.split('+')[2];
        return DBName.nameMap[abbr] || '(Ukjent)';
    }
    static getDateStr(name) {
        return name.split('+')[1];
    }
}
