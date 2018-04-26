import pgPromise from 'pg-promise';

export default callback => {

    const options = {};
    const pgp = pgPromise(options);
    const connectionString = 'postgres://postgres:postgres@localhost:5432/kiegle63';
    var db = pgp(connectionString);
    callback(db);

};