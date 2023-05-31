DROP TABLE IF EXISTS adoption_center;
DROP TABLE IF EXISTS dog_info;
DROP TABLE IF EXISTS adopter_info;
DROP TABLE IF EXISTS adoption_status;
DROP TABLE IF EXISTS adoption_info;

-- includes information for adoption center
CREATE TABLE adoption_center (
    -- id of adoption organization
    org_id CHAR(5),
    -- city where center is located
    contact_city VARCHAR(50) NOT NULL,
    -- state where center is located
    contact_state CHAR(2) NOT NULL,
    -- zip code where center is located
    contact_zip INTEGER(5) NOT NULL,
    PRIMARY KEY(org_id)
);

-- includes information for each dog 
CREATE TABLE dog_info (
    -- unique id of each dog
    dog_id CHAR(8),
    -- id of adoption organization
    org_id CHAR(5) NOT NULL,
    -- name of dog
    dog_name VARCHAR(20) NOT NULL,
    -- link to dog's page
    dog_url TEXT(500) NOT NULL,
    -- age of dog:
    -- 'S' means Senior,
    -- 'A' means Adult,
    -- 'Y' means Young,
    -- 'B' means Baby 
    dog_age CHAR(1) NOT NULL,
    -- gender of dog:
    -- 'F' means Female,
    -- 'M' means Male,
    dog_gender CHAR(1) NOT NULL,
    -- color of dog
    dog_color VARCHAR(50),
    -- breed of dog 
    dog_breed VARCHAR(75) NOT NULL,
    -- true if dog is of mixed breed
    is_mixed TINYINT NOT NULL,
    -- 1 if true if the dog is house trained
    -- 0 if false
    is_house_trained TINYINT NOT NULL,
    -- 0 if true if the dog has special needs
    -- 0 if false
    has_special_needs TINYINT NOT NULL,
    -- 1 if true is the dog is up-to-date on
    -- shots/immunizations, 0 if false
    has_current_shots TINYINT NOT NULL,
    PRIMARY KEY(dog_id),
    FOREIGN KEY (org_id) 
        REFERENCES adoption_center(org_id) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- includes information for each adopter
CREATE TABLE adopter_info (
    -- username for person looking to adopt
    adopter_usr VARCHAR(50),
    -- password for person looking to adopt
    adopter_password VARCHAR(70) NOT NULL,
    PRIMARY KEY(adopter_usr)
);

-- includes information on each dog's adoption status
CREATE TABLE adoption_status (
    -- id of dog in the adoption system
    dog_id CHAR(8),
    -- adoption status of dog
    -- 'N' means not ready to be adoptable
    -- 'A' means adoptable
    dog_status CHAR(1) NOT NULL,
    PRIMARY KEY(dog_id), 
    FOREIGN KEY (dog_id) 
        REFERENCES dog_info(dog_id) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- includes information for each adoption processed
CREATE TABLE adoption_info (
    -- username for adopter
    adopter_usr VARCHAR(50) NOT NULL,
    -- id of the dog that was adopted 
    adopted_id CHAR(8) NOT NULL,
    FOREIGN KEY (adopter_usr) 
        REFERENCES adopter_info(adopter_usr) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_dog_name ON dog_info(dog_name);