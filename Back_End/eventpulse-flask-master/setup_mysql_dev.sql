-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS eventpulse_dev_db;
CREATE USER IF NOT EXISTS 'eventpulse_dev'@'localhost' IDENTIFIED BY 'eventpulse_dev_pwd';
GRANT ALL PRIVILEGES ON `eventpulse_dev_db`.* TO 'eventpulse_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'eventpulse_dev'@'localhost';
FLUSH PRIVILEGES;
