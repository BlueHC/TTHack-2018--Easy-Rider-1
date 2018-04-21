/*
    initial data for prototype
*/

INSERT INTO rates (name, terms) VALUES ('normal', 'normale Kunden');
INSERT INTO rates (name, terms) VALUES ('spar ', 'tarife zu 30% gesenkt');

INSERT INTO user_groups (name, rate_id) VALUES ('normal', 1);
INSERT INTO user_groups (name, rate_id) VALUES ('Student', 2);
INSERT INTO user_groups (name, rate_id) VALUES ('Rentner', 2);

INSERT INTO mediums (medium_id, name, capacity, partner) VALUES (2, 'BUS133', 40, 'HVV');
INSERT INTO mediums (medium_id, name, capacity, partner) VALUES (1, 'BUS15', 40, 'HVV');
INSERT INTO mediums (medium_id, name, capacity, partner) VALUES (3, 'CAB1', 4, 'TAXI');

INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Bf. Altona', 1);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Gerichtstraße', 2);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Max-Brauer-Allee', 3);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Sternbrücke', 4);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Schulterblatt', 5);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Sternschanze', 6);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Schlump', 7);
INSERT INTO plans (mediums, partner, name, station_number) VALUES (ARRAY[1], 'HVV', 'Bundesstraße', 8);

INSERT INTO users (first_name, last_name, user_group_id) VALUES ('Andreas', 'Bachmann', 1);
INSERT INTO users (first_name, last_name, user_group_id) VALUES ('Gertrude', 'Erna', 3);
INSERT INTO users (first_name, last_name, user_group_id) VALUES ('Malte', 'von Ehren', 2);
INSERT INTO users (first_name, last_name, user_group_id) VALUES ('John', 'Do', 1);

INSERT INTO user_devices (user_id, device_uuid, device_typ) VALUES (1,'XXXX2', 'mobile');
