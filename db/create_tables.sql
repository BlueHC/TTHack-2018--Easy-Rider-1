DROP TABLE IF EXISTS mediums CASCADE;
DROP TABLE IF EXISTS rates CASCADE;
DROP TABLE IF EXISTS user_groups CASCADE;
DROP TABLE IF EXISTS user_devices CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS billings CASCADE;
DROP TABLE IF EXISTS filling_levels CASCADE ;

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
  longitute DOUBLE PRECISION,
  latitude DOUBLE PRECISION,
  time TIMESTAMP WITH TIME ZONE,
  medium_id INTEGER REFERENCES mediums,
  fiat_amount DOUBLE PRECISION,
  ref_transaction_id INTEGER,
  status INTEGER NOT NULL DEFAULT 1,
  last_update TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TABLE filling_levels(
  filling_level_id SERIAL PRIMARY KEY,
  station TEXT,
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
