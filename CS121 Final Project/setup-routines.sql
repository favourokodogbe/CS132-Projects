DROP FUNCTION IF EXISTS has_special_needs;
DROP FUNCTION IF EXISTS find_org_location;
DROP PROCEDURE IF EXISTS sp_dog_info_add_dog;
DROP PROCEDURE IF EXISTS sp_change_adoption_status;
-- UDF 1
-- returns 1 if dog has special needs, 0 if not
DELIMITER !

CREATE FUNCTION has_special_needs(inp_bool BOOLEAN) RETURNS CHAR(5) DETERMINISTIC
BEGIN
IF inp_bool = 1
    THEN RETURN "True";
ELSE RETURN "False";
END IF;
END !
DELIMITER ;


-- UDF 2
-- returns state of organization based on org_id. if not found, returns
-- 'Not Found'.
DELIMITER !

CREATE FUNCTION find_org_location(o_id CHAR(5)) RETURNS CHAR(2) DETERMINISTIC
BEGIN
    DECLARE org_loc CHAR(2);
    SET org_loc = (SELECT adoption_center.contact_state 
    FROM adoption_center
    WHERE o_id = adoption_center.org_id);
    RETURN org_loc;

END !
DELIMITER ;

-- Procedure 1
-- updates dog_info to add new dogs that will be up for adoption
DELIMITER !
SET max_sp_recursion_depth=255;
CREATE PROCEDURE sp_dog_info_add_dog (
    new_dog_id CHAR(8),
    new_org_id CHAR(5),
    new_dog_name VARCHAR(20),
    new_dog_url TEXT(500),
    new_dog_age CHAR(1),
    new_dog_gender CHAR(1),
    new_dog_color VARCHAR(50),
    new_dog_breed VARCHAR(75), 
    new_dog_mixed TINYINT, 
    new_dog_house_trained TINYINT, 
    new_dog_special_needs TINYINT,
    new_dog_current_shots TINYINT
)
BEGIN 
    INSERT INTO dog_info    
        VALUES (new_dog_id, new_org_id, new_dog_name, new_dog_url, 
        new_dog_age, new_dog_gender, new_dog_color, new_dog_breed, 
        new_dog_mixed, new_dog_house_trained, new_dog_special_needs,
        new_dog_current_shots);
END !

-- Trigger 1
CREATE TRIGGER trg_account_insert AFTER INSERT
    ON dog_info FOR EACH ROW 
BEGIN 
    CALL sp_dog_info_add_dog(NEW.dog_id, NEW.org_id, NEW.dog_name,
    NEW.dog_url, NEW.dog_age, NEW.dog_gender, NEW.dog_color, 
    NEW.dog_breed, NEW.is_mixed, NEW.is_house_trained, NEW.has_special_needs,
    NEW.has_current_shots);
END !

DELIMITER ;

DELIMITER !

-- this procedure changes the adoption status of the dog 
-- admin has access to this
CREATE PROCEDURE sp_change_adoption_status (
    curr_dog_id CHAR(8),
    curr_adoption_status CHAR(1)
)
BEGIN 
    UPDATE adoption_status 
    SET adoption_status.dog_status = curr_adoption_status 
    WHERE adoption_status.dog_id = curr_dog_id;
END !
DELIMITER ;
