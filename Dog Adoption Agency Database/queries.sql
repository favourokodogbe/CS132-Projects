-- retrieves org id for all mixed dogs
SELECT org_id 
FROM dog_info 
WHERE is_mixed = TRUE;

-- retrieves dog name and dog url for dog that are female
-- USED IN APP.PY
SELECT dog_name, dog_url 
FROM dog_info 
WHERE dog_gender = 'F';

-- retrieves dog name and dog url for dog that are male
-- USED IN APP.PY
SELECT dog_name, dog_url 
FROM dog_info 
WHERE dog_gender = 'M';

-- check dog url for baby and young dogs 
SELECT dog_url 
FROM dog_info 
WHERE dog_age = 'B' 
OR dog_age = 'Y';

-- retrieves dog id and org id for dogs that have current shots
SELECT dog_id, org_id
FROM dog_info
WHERE has_current_shots = TRUE;

-- retrieves org_id, dog name and link url for all 
-- dogs in the state of Nevada
-- USED IN APP.PY
SELECT adoption_center.org_id, dog_info.dog_name, dog_info.dog_url
FROM dog_info NATURAL JOIN adoption_center
WHERE adoption_center.contact_state = 'NV' 
ORDER BY dog_info.dog_name ASC;

-- retrieves org_id, dog name and link url for all 
-- dogs in the state of Arizona
-- USED IN APP.PY
SELECT adoption_center.org_id, dog_info.dog_name, dog_info.dog_url
FROM dog_info NATURAL JOIN adoption_center
WHERE adoption_center.contact_state = 'AZ' 
ORDER BY dog_info.dog_name ASC;

-- retrieves the number of dogs at each adoption center
SELECT adoption_center.org_id AS org_id, 
COUNT(dog_info.dog_id) as num_dogs
FROM dog_info NATURAL JOIN adoption_center
GROUP BY adoption_center.org_id;
