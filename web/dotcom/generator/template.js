const scoreStr = (row) => {
    if (row.ongoing) {
        return `${row.best2sum || '-'}<span class="count">(${row.throws})</span>`;
    }
    return `${row.best2sum || '-'}`;
    
};

const pad = (str, max) => {
    const sx = str.toString();
    return sx.length < max ? pad(`0${sx}`, max) : sx;
};

const timeStr = () => {
    const d = new Date();
    return `${pad(d.getDay(), 2)}.${pad(d.getMonth(), 2)}.${d.getFullYear()} ${d.toLocaleTimeString('nb-NO')}`;
};

const writeTd = (txt, cls = '') => `<td class="${cls}">${txt}</td>`;

const writeRow = (row, idx) => `
        <tr>
            ${writeTd(idx + 1)}
            ${writeTd(`${row.firstname} ${row.lastname}<span class="club">${row.club}</span>`)}
            ${writeTd(scoreStr(row))}
        </tr>
    `;
 
const createPage = (competition, rounds) => `
<!doctype html>
<html lang="nb">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>${competition.type}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <style type="text/css">
body {
    font-family: Arial, Helvetica, sans-serif; background-color: #222; color: #e4e4e4;
}
h1 { font-size: 1.5rem; margin-bottom: 0; }
#updated { font-size: .825rem; margin: 8px 0; color: #aaa; }
#results {
    width: 100%; font-size: .925rem;
}
#results td { white-space: nowrap; }
#results .club {
    color: #888; font-size: .825rem; margin-left: 1em;
}
.count { margin-left: 8px; color: #888; }
@media screen and (min-width: 680px) { 
    h1 { font-size: 3rem; } 
    #results { font-size: 1.5rem; }
    #results .club { font-size: 1.25rem; }
    
}
        </style>
    </head>
    <body>
        <div id="main">
            <h1>${competition.type}</h1>
            <div id="updated">Oppdatert ${timeStr()}</div>
            <table id="results">
                ${rounds.map(writeRow).join('')}
            </table>
        </div>
    </body>
</html>
`;


module.exports = createPage;
