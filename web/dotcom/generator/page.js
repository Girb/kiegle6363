const fs = require('fs');
const createPage = require('./template');

class Page {
    constructor(competition, rounds) {
        this.competition = competition;
        this.rounds = rounds.sort(this.rowSorter.bind(this));
        this.rounds.forEach((p) => {
            let throws = [];
            p.rounds.forEach((r) => { throws = throws.concat(r.throws.filter(t=>t !== null && t !== undefined)); });
            p.throws = throws.length;
            p.ongoing = throws.length > 0 && (throws.length !== (competition.throws_per_round * competition.number_of_rounds));
        });
    }

    cardinality(x) {
        let throws = [];
        x.rounds.forEach((round) => {
            throws = throws.concat(round.throws);
        });
        const cs = throws.reduce((acc, curr) => {
            acc[curr] ? acc[curr]++ : acc[curr] = 1; // eslint-disable-line
            return acc;
        }, {});
        let c = 0;
        c += (cs[9] || 0) * 100000;
        c += (cs[8] || 0) * 10000;
        c += (cs[7] || 0) * 1000;
        c += (cs[6] || 0) * 100;
        c += (cs[5] || 0) * 10;
        c += (cs[4] || 0) * 1;
        return c;
    }
 
    rowSorter(x, y) {
        if (!x || !y) return 0;
        const sumx = x.best2sum, 
            sumy = y.best2sum;
        if (sumx !== sumy) {
            return sumx < sumy ? 1 : -1;
        }
        const cx = this.cardinality(x), 
            cy = this.cardinality(y);
        return cx < cy ? 1 : -1;
    }

    render() {
        const tmp = createPage(this.competition, this.rounds);
        fs.writeFile('1.html', tmp, (err) => {
            if (err) throw err;
            console.log('File saved');
        });
    }
}

module.exports = Page;
