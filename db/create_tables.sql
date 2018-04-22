DROP TABLE IF EXISTS mediums CASCADE;
DROP TABLE IF EXISTS rates CASCADE;
DROP TABLE IF EXISTS user_groups CASCADE;
DROP TABLE IF EXISTS user_devices CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS billings CASCADE;
DROP TABLE IF EXISTS filling_levels CASCADE ;
DROP TABLE IF EXISTS plan CASCADE ;
DROP VIEW IF EXISTS trans_history;


CREATE TABLE mediums(
  medium_id SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  partner TEXT NOT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE rates (
  rate_id SERIAL PRIMARY KEY,
  name TEXT,
  terms TEXT,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE user_groups (
  user_group_id SERIAL PRIMARY KEY,
  name TEXT,
  rate_id INTEGER REFERENCES rates,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  user_group_id INTEGER REFERENCES user_groups NOT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE billings (
  billing_id SERIAL PRIMARY KEY ,
  user_id INTEGER REFERENCES users,
  fiat_amount DOUBLE PRECISION NOT NULL,
  time TIMESTAMP WITH TIME ZONE,
  transaction_ids INTEGER[],
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  device_uuid TEXT NOT NULL,
  station TEXT,
  longitude DOUBLE PRECISION,
  latitude DOUBLE PRECISION,
  time TIMESTAMP WITH TIME ZONE,
  medium_id INTEGER REFERENCES mediums,
  fiat_amount DOUBLE PRECISION,
  ref_transaction_id INTEGER,
  comment TEXT,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE filling_levels(
  filling_level_id SERIAL PRIMARY KEY,
  medium_id INTEGER REFERENCES mediums,
  longitude DOUBLE PRECISION,
  latitude DOUBLE PRECISION,
  time TIMESTAMP WITH TIME ZONE,
  amount INTEGER NOT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE user_devices (
  user_device_id SERIAL PRIMARY KEY ,
  user_id INTEGER REFERENCES users,
  device_uuid TEXT NOT NULL,
  device_typ TEXT NOT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE plans (
  plan_id SERIAL PRIMARY KEY,
  mediums INTEGER[],
  partner TEXT,
  name TEXT NOT NULL,
  station_number INTEGER,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE OR REPLACE VIEW trans_history(user_id, first_name, last_name, partner, vehicle, from_time, to_time, from_loc, to_loc, status) as
select u.user_id, u.first_name, u.last_name, m2.partner, m2.name, t.time, t2.time, t.station, t2.station
, case when t2.transaction_id is null then 'in process'
    when b.billing_id is not null then 'payed'
    else 'to pay' end as  status
from users u
join user_devices ud ON u.user_id = ud.user_id
join transactions t ON (t.device_uuid = ud.device_uuid AND t.ref_transaction_id IS NULL)
join mediums m2 ON t.medium_id = m2.medium_id
left outer join transactions t2 on (t.transaction_id = t2.ref_transaction_id)
left outer join billings b on (b.user_id = u.user_id and t.transaction_id = ANY(b.transaction_ids))
order by u.user_id asc, t.time asc
;

