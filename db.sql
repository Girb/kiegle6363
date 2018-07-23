-- psql -U postgres -f db.sql

DROP DATABASE IF EXISTS kiegle63;
CREATE DATABASE kiegle63;

\c kiegle63;

CREATE TABLE competition_type (
	id INTEGER PRIMARY KEY,
	title VARCHAR,
	throws_per_round INTEGER DEFAULT 10 NOT NULL,
	number_of_rounds INTEGER DEFAULT 2 NOT NULL
);

INSERT INTO competition_type (id, title, throws_per_round, number_of_rounds) VALUES (1, 'Kongematch (kvalifisering)', 5, 2);
INSERT INTO competition_type (id, title, throws_per_round, number_of_rounds) VALUES (2, 'Kongematch (semi)', 5, 2);
INSERT INTO competition_type (id, title, throws_per_round, number_of_rounds) VALUES (3, 'Kongematch (finale)', 10, 2);
INSERT INTO competition_type (id, title, throws_per_round, number_of_rounds) VALUES (4, 'Kniksens Vandrepokal', 10, -1);
INSERT INTO competition_type (id, title, throws_per_round, number_of_rounds) VALUES (5, 'Dronningaften', 5, -1);
INSERT INTO competition_type (id, title, throws_per_round, number_of_rounds) VALUES (6, 'Klubb vs Klubb', 10, 2);

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

INSERT INTO competition (title, type_id) VALUES ('Kongematch 2018 Kvalifisering', 1);
INSERT INTO competition (title, type_id) VALUES ('Kongematch 2018 Semifinale', 2);
INSERT INTO competition (title, type_id) VALUES ('Kongematch 2018 Finale', 3);
INSERT INTO competition (title, type_id) VALUES ('Kniksens Vandrepokal 2018', 4);

CREATE TABLE club (
	id serial PRIMARY KEY,
	name VARCHAR
);

INSERT INTO club (name) VALUES ('Kniksen');
INSERT INTO club (name) VALUES ('Satelitten');
INSERT INTO club (name) VALUES ('Viking');
INSERT INTO club (name) VALUES ('Baltus');
INSERT INTO club (name) VALUES ('Gambrinius');

CREATE TABLE player (
	id serial PRIMARY KEY,
	firstname VARCHAR,
	lastname VARCHAR,
	nickname VARCHAR,
	email VARCHAR,
	club_id INTEGER NOT NULL REFERENCES club(id)
);

INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Bjørn-Erik', 'Allers-Hansen', 'Bønnen', 'bjorneah@online.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Ørjan', 'Berg', 'Kaptein Tinn', 'orbe@berg-hansen.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Herman', 'Brandt', 'Prinsen', 'herman.brandt@gmail.com', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Cato', 'Ervik', 'Svinet', 'cato@ervik-it.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Fredrik', 'Gisholt', 'Essemusen', 'fgi@wr.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Arne', 'Kolle d.y.', 'Godteposen', 'arne@kolle.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Olav', 'Kolle d.e.', 'Kolli BMF', 'olav@kolle.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Kjetil', 'Lilletvedt', 'Kix Melon', 'kixmelon@gmail.com', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Helge', 'Loy', 'Helveten', 'helge@machina.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Julius', 'Sannem', 'Frans', 'jul-san@online.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Eivind', 'Sommersten', 'Sommerhesten', 'eivind@machina.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Axel', 'Wangberg', 'Dr', 'axelwangberg@hotmail.com', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Truls', 'Lien', 'Bien', 'truls.lien@akersolutions.com', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Andreas', 'Nordgreen', 'Gud', 'andreas.nordgreen@norsildmel.no', 1);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Håkon', 'Marås', 'Samantha', 'hmaras@broadpark.no', 1);

INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Jan', 'Sommersten', 'Far', 'jan@sommersten.com', 4);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Truls', 'sundt', 'Truls', 'trulssundt@online.no', 4);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Morten', 'Iversen', 'Morten', 'morten@spv.no', 5);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Knut', 'Matre', 'Knut', 'knut@example.com', 5);
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Egil', 'Skjoldmo', 'Skjoldmo', 'egil@nordea.no', 5);

CREATE TABLE participant_status (
	id INTEGER PRIMARY KEY,
	title VARCHAR
);

INSERT INTO participant_status (id, title) VALUES (0, 'Registered');
INSERT INTO participant_status (id, title) VALUES (1, 'Confirmed');
INSERT INTO participant_status (id, title) VALUES (2, 'Finished');
INSERT INTO participant_status (id, title) VALUES (3, 'Cancelled');

CREATE table participant (
	id serial PRIMARY KEY,
	competition_id INTEGER NOT NULL REFERENCES competition(id),
	player_id INTEGER NOT NULL REFERENCES player(id),
	sort_order INTEGER,
	status_id INTEGER NOT NULL DEFAULT 0 REFERENCES participant_status(id)
);

INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,1,0,1);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,2,1,1);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,3,2,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,4,3,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,5,4,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,8,5,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,9,6,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,10,7,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,11,8,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,13,9,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,14,10,0);
INSERT INTO participant (competition_id, player_id, sort_order, status_id) VALUES (1,15,11,0);


--CREATE TABLE stage (
--	id serial PRIMARY KEY,
--	stage_date DATE,
--	competition_id INTEGER NOT NULL REFERENCES competition(id)
--);

CREATE TABLE round (
	id serial PRIMARY KEY,
	participant_id INTEGER NOT NULL REFERENCES participant(id),
	--stage_id INTEGER NOT NULL REFERENCES stage(id),
	competition_id INTEGER NOT NULL REFERENCES competition(id),
	status_id INTEGER NOT NULL DEFAULT 0 REFERENCES round_status(id)
);

CREATE TABLE throw (
	id serial PRIMARY KEY,
	round_id INTEGER NOT NULL REFERENCES round(id),
	score INTEGER
);


--- VIEWS

CREATE OR REPLACE VIEW participants AS
select pa.id, player.id as player_id, player.firstname, player.lastname, player.nickname, player.email, club.name as club, pa.sort_order, pa.status_id, pa.competition_id as competition_id
from participant pa
inner join player on pa.player_id = player.id
inner join club on player.club_id = club.id;

CREATE OR REPLACE VIEW rounds AS
select r.id, r.participant_id, r.competition_id, r.status_id, p.player_id, p.sort_order, p.status_id as participant_status_id, pl.firstname, pl.lastname, pl.nickname, cl.name as club
from round r
INNER JOIN participant p ON r.participant_id = p.id
INNER JOIN player pl ON p.player_id = pl.id
INNER JOIN club cl ON pl.club_id = cl.id;

--- SOME TEST DATA

--INSERT INTO stage (stage_date, competition_id) VALUES ('2018-04-15', 2);

INSERT INTO round (participant_id, competition_id, status_id) VALUES (9, 1, 1);
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

INSERT INTO round (participant_id, competition_id, status_id) VALUES (9, 1, 1);
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

INSERT INTO round (participant_id, competition_id, status_id) VALUES (7, 1, 1);
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


