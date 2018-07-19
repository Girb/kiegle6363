import { Router } from 'express';


export default ({ config, db }) => {
    const api = Router();

};

/*select r.id, r.participant_id, r.status_id, p.player_id, p.sort_order, p.status_id as participant_status_id, pl.firstname, pl.lastname, pl.nickname, cl.name as club
from round r
INNER JOIN participant p ON r.participant_id = p.id
INNER JOIN player pl ON p.player_id = pl.id
INNER JOIN club cl ON pl.club_id = cl.id
;
*/


/*

select r.*, array_agg(score)
from throw t
INNER JOIN rounds r ON t.round_id = r.id
where round_id IN (
  select id from rounds where status_id IN (0,1)
)
GROUP BY r.player_id, r.firstname, r.lastname, r.nickname, r.club, r.sort_order, r.id, r.status_id, r.participant_id, r.participant_status_id, r.competition_id;


*/