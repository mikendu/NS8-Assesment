#!/usr/bin/env bash

# User tests

printf "\n\n\n----------------------------------------\nCreate user (missing params)\n----------------------------------------\n\n"
curl -i -d "email=dude@test.com" -X POST localhost:3000/users

printf "\n\n\n----------------------------------------\nCreate user (bad phone)\n----------------------------------------\n\n"
curl -i -d "email=dude@test.com&password=pass&phone=123+456+7890" -X POST localhost:3000/users

printf "\n\n\n----------------------------------------\nCreate user 1 (valid)\n----------------------------------------\n\n"
curl -i -d "email=user1@test.com&password=pass&phone=123-456-7890" -X POST localhost:3000/users

printf "\n\n\n----------------------------------------\nCreate user 1 (duplicate)\n----------------------------------------\n\n"
curl -i -d "email=user1@test.com&password=pass&phone=123-456-7890" -X POST localhost:3000/users

printf "\n\n\n----------------------------------------\nCreate user 2 (duplicate)\n----------------------------------------\n\n"
curl -i -d "email=user2@test.com&password=pass&phone=123-456-7890" -X POST localhost:3000/users

printf "\n\n\n----------------------------------------\nCreate user 3 (duplicate)\n----------------------------------------\n\n"
curl -i -d "email=user3@test.com&password=pass&phone=123-456-7890" -X POST localhost:3000/users




printf "\n\n\n----------------------------------------\nGet all users\n----------------------------------------\n\n"
curl -i localhost:3000/users

printf "\n\n\n----------------------------------------\nGet specific user\n----------------------------------------\n\n"
curl -i localhost:3000/users/0003

printf "\n\n\n----------------------------------------\nGet non-existent user\n----------------------------------------\n\n"
curl -i localhost:3000/users/9876



printf "\n\n\n----------------------------------------\nUpdate user (non-existent)\n----------------------------------------\n\n"
curl -i -d "email=dude@test.com&password=pass&phone=123-456-7890" -X PUT localhost:3000/users/9876

printf "\n\n\n----------------------------------------\nUpdate user (bad phone)\n----------------------------------------\n\n"
curl -i -d "email=mike@test.com&password=pass&phone=123+456+7890" -X PUT localhost:3000/users/0001

printf "\n\n\n----------------------------------------\nUpdate user (valid)\n----------------------------------------\n\n"
curl -i -d "email=mike@test.com&password=pass&phone=123-456-7890" -X PUT localhost:3000/users/0001

printf "\n\n\n----------------------------------------\nUpdate user (duplicate email)\n----------------------------------------\n\n"
curl -i -d "email=user2@test.com&password=pass&phone=111-222-3333" -X PUT localhost:3000/users/0001

printf "\n\n\n----------------------------------------\nUpdate user (return to prev email)\n----------------------------------------\n\n"
curl -i -d "email=user1@test.com&password=bro&phone=111-222-3333" -X PUT localhost:3000/users/0001

printf "\n\n\n----------------------------------------\nUpdate user (no-op)\n----------------------------------------\n\n"
curl -i -d "email=user1@test.com&password=bro&phone=111-222-3333" -X PUT localhost:3000/users/0001




# Event tests


printf "\n\n\n----------------------------------------\nCreate event #1\n----------------------------------------\n\n"
curl -i -d "type=LOGIN&user=0001" -X POST localhost:3000/events

printf "\n\n\n----------------------------------------\nCreate event #2\n----------------------------------------\n\n"
curl -i -d "type=LOGOUT&user=0001" -X POST localhost:3000/events

printf "\n\n\n----------------------------------------\nCreate event #3\n----------------------------------------\n\n"
curl -i -d "type=LOGIN&user=0002" -X POST localhost:3000/events

printf "\n\n\n----------------------------------------\nCreate event #4\n----------------------------------------\n\n"
curl -i -d "type=LOGOUT&user=0002" -X POST localhost:3000/events

printf "\n\n\n----------------------------------------\nCreate event #5\n----------------------------------------\n\n"
curl -i -d "type=LOGIN&user=0003" -X POST localhost:3000/events

printf "\n\n\n----------------------------------------\nCreate event #6\n----------------------------------------\n\n"
curl -i -d "type=LOGOUT&user=0003" -X POST localhost:3000/events





printf "\n\n\n----------------------------------------\nGet all events for all\n----------------------------------------\n\n"
curl -i localhost:3000/events

printf "\n\n\n----------------------------------------\nGet all events for non-existent user\n----------------------------------------\n\n"
curl -i 'localhost:3000/events?user=9876'

printf "\n\n\n----------------------------------------\nGet all events for valid user\n----------------------------------------\n\n"
curl -i 'localhost:3000/events?user=0002'

printf "\n\n\n----------------------------------------\nGet all events for all users, with valid time range\n----------------------------------------\n\n"
curl -i 'localhost:3000/events?after=1553738484'

printf "\n\n\n----------------------------------------\nGet all events for all users, with valid time range (should return no events)\n----------------------------------------\n\n"
curl -i 'localhost:3000/events?before=1553738484'

printf "\n\n\n----------------------------------------\nGet all events for given user, with valid time range\n----------------------------------------\n\n"
curl -i 'localhost:3000/events?user=0002&after=1553738484'




printf "\n\n\n----------------------------------------\nGet specific event\n----------------------------------------\n\n"
curl -i localhost:3000/events/0001

printf "\n\n\n----------------------------------------\nGet non-existent event\n----------------------------------------\n\n"
curl -i localhost:3000/events/9876

printf "\n\n\n----------------------------------------\nCreate event (missing param)\n----------------------------------------\n\n"
curl -i -d "user=0001" -X POST localhost:3000/events




# Invalid operations
printf "\n\n\n----------------------------------------\nPost to invalid url\n----------------------------------------\n\n"
curl -i -d "userId=4123" -X POST localhost:3000/users/1234


#: <<'END'
#END