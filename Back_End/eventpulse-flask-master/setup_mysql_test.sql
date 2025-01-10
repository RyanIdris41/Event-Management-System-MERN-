-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS eventpulse_test_db;
CREATE USER IF NOT EXISTS 'eventpulse_test'@'localhost' IDENTIFIED BY 'eventpulse_test_pwd';
GRANT ALL PRIVILEGES ON `eventpulse_test_db`.* TO 'eventpulse_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'eventpulse_test'@'localhost';
FLUSH PRIVILEGES;
