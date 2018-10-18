update competition_type set throws_per_round = 10 where id = 5;

INSERT INTO club (name) VALUES ('Dronningene av Kiegleklubben Kniksen'); -- => 41
INSERT INTO player (firstname, lastname, nickname, email, club_id) VALUES ('Ingfrid', 'Bakka', 'Ingfrid', 'ingfrid@gmail.com', 41);