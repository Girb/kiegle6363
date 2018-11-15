var main = document.getElementById('main'),
    tbl = document.getElementById('results');

function createCORSRequest(method, url, callback) {
    var xhr = new XMLHttpRequest();
    if( 'withCredentials' in xhr ) {
        xhr.open(method, url, true);
    } else if( typeof XDomainRequest != "undefined" ) {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    if( xhr ) {
        xhr.onload = callback;
    }
    return xhr;
}

function td(txt, cls) {
    var td = document.createElement('td');
    cls && td.classList.add(cls);
    td.innerHTML = txt;
    return td;
}

function cardinality(x) {
    var throws = [];
    x.rounds.forEach(function(round) {
        throws = throws.concat(round.throws);
    });
    var cs = throws.reduce(function(acc, curr) {
        acc[curr] ? acc[curr]++ : acc[curr] = 1;
        return acc;
    }, {});
    var c = 0;
    c = c + (cs[9] || 0) * 100000;
    c = c + (cs[8] || 0) * 10000;
    c = c + (cs[7] || 0) * 1000;
    c = c + (cs[6] || 0) * 100;
    c = c + (cs[5] || 0) * 10;
    c = c + (cs[4] || 0) * 1;
    return c;
}

function sorter(x, y) {
    if( !x || !y ) return 0;
    var sumx = x.best2sum, sumy = y.best2sum;
    if( sumx !== sumy ) {
        return sumx < sumy ? 1 : -1;
    }
    var cx = cardinality(x), cy = cardinality(y);
    return cx < cy ? 1 : -1;
}

var xhr = createCORSRequest('GET', 'http://127.0.0.1:3001/api/competitions/1/rounds');
xhr.onload = function() {
    var rows = JSON.parse(xhr.responseText);
    rows.sort(sorter);
    rows.forEach(function(row, idx) {
        var tr = document.createElement('tr');
        tr.appendChild(td(idx+1));
        tr.appendChild(td(row.firstname + ' ' + row.lastname + '<span class="club">' + row.club + '</span>'));
        tr.appendChild(td(row.best2sum));        
        tbl.appendChild(tr);
    });
    var d = new Date();
    document.getElementById('updated').innerText = 'Oppdatert ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
};
xhr.send();

