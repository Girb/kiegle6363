const axios = require('axios');
const config = require('./config.json');
const Page = require('./page');

const id = process.argv[2] || 1;
function go() {
    axios.get(`http://${config.server.address}:${config.server.port}/api/competitions/${id}`).then((response) => {
        const competition = response.data;
        axios.get(`http://${config.server.address}:${config.server.port}/api/competitions/${id}/rounds`).then((rresp) => {
            const rounds = rresp.data;
            new Page(competition, rounds).render();
        }).catch((err) => {
            console.log(`${err.code} on ${err.address}:${err.port}`);
        });
    }).catch((err) => {
        console.log(`${err.code} on ${err.address}:${err.port}`);
    });
}

setInterval(go, config.interval);
