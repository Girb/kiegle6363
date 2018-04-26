DROP DATABASE IF EXISTS kiegle63;
CREATE DATABASE kiegle63;

\c kiegle63;

CREATE TABLE competition_type (
	id INTEGER PRIMARY KEY,
	title VARCHAR
);

INSERT INTO competition_type (id, title) VALUES (1, 'Kongematch');
INSERT INTO competition_type (id, title) VALUES (2, 'Kniksens Vandrepokal');
INSERT INTO competition_type (id, title) VALUES (3, 'Dronningaften');
INSERT INTO competition_type (id, title) VALUES (4, 'Klubb vs Klubb');

CREATE TABLE round_status (
	id INTEGER PRIMARY KEY,
	title VARCHAR
);

INSERT INTO round_status (id, title) VALUES (0, 'Draft');
INSERT INTO round_status (id, title) VALUES (1, 'Submitted');
INSERT INTO round_status (id, title) VALUES (2, 'Deleted');


CREATE TABLE competition (
	id serial PRIMARY KEY,
	title VARCHAR NOT NULL,
	type_id INTEGER NOT NULL REFERENCES competition_type(id)
);

INSERT INTO competition (title, type_id) VALUES ('Kongematch 2018', 1);
INSERT INTO competition (title, type_id) VALUES ('Kniksens Vandrepokal 2018', 2);

CREATE TABLE player (
	id serial PRIMARY KEY,
	firstname VARCHAR,
	lastname VARCHAR,
	nickname VARCHAR,
	email VARCHAR
);

INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Bjørn-Erik', 'Allers-Hansen', 'Bønnen', 'bjorneah@online.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Ørjan', 'Berg', 'Kaptein Tinn', 'orbe@berg-hansen.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Herman', 'Brandt', 'Prinsen', 'herman.brandt@gmail.com');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Cato', 'Ervik', 'Svinet', 'cato@ervik-it.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Fredrik', 'Gisholt', 'Essemusen', 'fgi@wr.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Arne', 'Kolle d.y.', 'Godteposen', 'arne@kolle.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Olav', 'Kolle d.e.', 'Kolli BMF', 'olav@kolle.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Kjetil', 'Lilletvedt', 'Kix Melon', 'kixmelon@gmail.com');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Helge', 'Loy', 'Helveten', 'helge@machina.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Julius', 'Sannem', 'Frans', 'jul-san@online.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Eivind', 'Sommersten', 'Sommerhesten', 'eivind@machina.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Axel', 'Wangberg', 'Dr', 'axelwangberg@hotmail.com');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Truls', 'Lien', 'Bien', 'truls.lien@akersolutions.com');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Andreas', 'Nordgreen', 'Gud', 'andreas.nordgreen@norsildmel.no');
INSERT INTO player (firstname, lastname, nickname, email) VALUES ('Håkon', 'Marås', 'Samantha', 'hmaras@broadpark.no');

CREATE table participant (
	id serial PRIMARY KEY,
	competition_id INTEGER NOT NULL REFERENCES competition(id),
	player_id INTEGER NOT NULL REFERENCES player(id)
);

INSERT INTO participant (competition_id, player_id) VALUES (2,1);
INSERT INTO participant (competition_id, player_id) VALUES (2,2);
INSERT INTO participant (competition_id, player_id) VALUES (2,3);
INSERT INTO participant (competition_id, player_id) VALUES (2,4);
INSERT INTO participant (competition_id, player_id) VALUES (2,5);
INSERT INTO participant (competition_id, player_id) VALUES (2,8);
INSERT INTO participant (competition_id, player_id) VALUES (2,9);
INSERT INTO participant (competition_id, player_id) VALUES (2,10);
INSERT INTO participant (competition_id, player_id) VALUES (2,11);
INSERT INTO participant (competition_id, player_id) VALUES (2,13);
INSERT INTO participant (competition_id, player_id) VALUES (2,14);
INSERT INTO participant (competition_id, player_id) VALUES (2,15);


CREATE TABLE stage (
	id serial PRIMARY KEY,
	stage_date DATE,
	competition_id INTEGER NOT NULL REFERENCES competition(id)
);

CREATE TABLE round (
	id serial PRIMARY KEY,
	participant_id INTEGER NOT NULL REFERENCES participant(id),
	stage_id INTEGER NOT NULL REFERENCES stage(id),
	status_id INTEGER NOT NULL DEFAULT 0 REFERENCES round_status(id)
);

CREATE TABLE throw (
	id serial PRIMARY KEY,
	round_id INTEGER NOT NULL REFERENCES round(id),
	score INTEGER
);


--- SOME TEST DATA

INSERT INTO stage (stage_date, competition_id) VALUES ('2018-04-15', 2);

INSERT INTO round (participant_id, stage_id, status_id) VALUES (9, 1, 1);
INSERT INTO throw (round_id, score) VALUES (1, 7);
INSERT INTO throw (round_id, score) VALUES (1, 6);
INSERT INTO throw (round_id, score) VALUES (1, 7);
INSERT INTO throw (round_id, score) VALUES (1, 7);
INSERT INTO throw (round_id, score) VALUES (1, 8);
INSERT INTO throw (round_id, score) VALUES (1, 8);
INSERT INTO throw (round_id, score) VALUES (1, 5);
INSERT INTO throw (round_id, score) VALUES (1, 7);
INSERT INTO throw (round_id, score) VALUES (1, 6);
INSERT INTO throw (round_id, score) VALUES (1, 4);

INSERT INTO round (participant_id, stage_id, status_id) VALUES (9, 1, 1);
INSERT INTO throw (round_id, score) VALUES (2, 6);
INSERT INTO throw (round_id, score) VALUES (2, 6);
INSERT INTO throw (round_id, score) VALUES (2, 8);
INSERT INTO throw (round_id, score) VALUES (2, 8);
INSERT INTO throw (round_id, score) VALUES (2, 8);
INSERT INTO throw (round_id, score) VALUES (2, 8);
INSERT INTO throw (round_id, score) VALUES (2, 5);
INSERT INTO throw (round_id, score) VALUES (2, 4);
INSERT INTO throw (round_id, score) VALUES (2, 0);
INSERT INTO throw (round_id, score) VALUES (2, 6);

INSERT INTO round (participant_id, stage_id, status_id) VALUES (7, 1, 1);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 7);
INSERT INTO throw (round_id, score) VALUES (3, 6);


