CREATE OR REPLACE FUNCTION TRANSACTION_AFTER () RETURNS TRIGGER AS
  $BODY$
DECLARE
   v_start_transaction_id INTEGER := NULL;
   v_start_station TEXT := NULL;
   v_start_longitude DOUBLE PRECISION := NULL;
   v_start_latitude DOUBLE PRECISION := NULL;
   v_start_ref_transaction_id INTEGER := NULL;
   v_start_station_number INTEGER := NULL;
   v_end_station_number INTEGER := NULL;
  v_comment TEXT;
   is_entry BOOLEAN := TRUE;


BEGIN
  RAISE NOTICE 'NEW.device_uuid = %', NEW.device_uuid;
  RAISE NOTICE 'NEW.transaction_id = %', NEW.transaction_id;
  BEGIN
    SELECT t.station
         , t.longitude
          , t.latitude
          , t.ref_transaction_id
          , (SELECT p.station_number
              FROM plans p
              WHERE NEW.medium_id in (SELECT unnest(p.mediums))
                AND p.name = t.station) as station_number
          , t.transaction_id
    INTO v_start_station
      , v_start_longitude
      , v_start_latitude
      , v_start_ref_transaction_id
      , v_start_station_number
      , v_start_transaction_id
    FROM transactions t
    WHERE t.device_uuid = NEW.device_uuid
      --AND t.transaction_id < NEW.transaction_id
    ORDER BY t.transaction_id DESC LIMIT 1;
    RAISE NOTICE 'could find transaction before id = %' , v_start_transaction_id;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'could not find transaction before';
  END;

  RAISE NOTICE 'v_start_station = %',  v_start_station;

  BEGIN
      SELECT p.station_number
      INTO v_end_station_number
      FROM plans p
      WHERE NEW.medium_id in (SELECT unnest(p.mediums))
        AND p.name = NEW.station
       LIMIT 1;
   EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Not found current station';
  END;
  IF (v_start_station IS NULL AND v_start_longitude IS NULL AND v_start_latitude IS NULL) OR v_start_ref_transaction_id IS NOT NULL THEN
    v_comment := 'entry';
    RAISE NOTICE 'entry';
    NEW.comment := v_comment;
  ELSE
    IF v_end_station_number IS NOT NULL AND v_start_station_number IS NOT NULL THEN
      NEW.comment := 'exit after ride ' || abs(v_end_station_number - v_start_station_number ) || ' stations' ;
    ELSE
      RAISE NOTICE 'Not found current station number';
      NEW.comment := 'Exit on Station: ' || NEW.station;
    END IF;
    NEW.ref_transaction_id := v_start_transaction_id;
  END IF;
RETURN NEW;
END;
  $BODY$
LANGUAGE PLPGSQL;



CREATE TRIGGER tr_trans_after BEFORE INSERT  ON transactions
    FOR EACH ROW EXECUTE PROCEDURE TRANSACTION_AFTER();

