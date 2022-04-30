SELECT FROM (SELECT * FROM users_user WHERE sex = 3 AND id != 1) AS user OUTER JOIN matches ON user.id=matches.target
SELECT * FROM (SELECT * FROM users_user WHERE sex = 3) AS user FULL OUTER JOIN matches ON user.id=matches.target;


SELECT * FROM (SELECT * FROM users_user FULL OUTER JOIN matches ON users_user.id=matches.target) AS tb;


SELECT * FROM users_user WHERE id != 2 AND id NOT IN (SELECT target FROM matches WHERE initiator=1);

SELECT * FROM users_user WHERE id != 1 AND sex = 9 AND id NOT IN (SELECT target FROM matches WHERE initiator=1);


SELECT target FROM matches 

 WHERE initiator = 1 
SELECT * FROM matches WHERE target = 1
/** Inserting Chat messages **/
INSERT into chat_table  (chat_room_id, sender, message) VALUES (1, 1, 'Hey bae');
INSERT into chat_table  (chat_room_id, sender, message) VALUES (1, 2, 'Whats up bae');
INSERT into chat_table  (chat_room_id, sender, message) VALUES (1, 1, 'asd');
