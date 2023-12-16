CREATE USER 'dog_admin'@'localhost' IDENTIFIED BY 'dog_admin';
CREATE USER 'dog_client'@'localhost' IDENTIFIED BY 'dog_client';
-- Can add more users or refine permissions
GRANT ALL PRIVILEGES ON adoptdb.* TO 'dog_admin'@'localhost';
GRANT SELECT ON adoptdb.* TO 'dog_client'@'localhost';
FLUSH PRIVILEGES;