-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for react_chat
CREATE DATABASE IF NOT EXISTS `react_chat` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `react_chat`;

-- Dumping structure for table react_chat.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_from_id` int NOT NULL,
  `user_to_id` int NOT NULL,
  `message` text NOT NULL,
  `date_time` datetime NOT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_user1_idx` (`user_from_id`),
  KEY `fk_chat_user2_idx` (`user_to_id`),
  KEY `fk_chat_status1_idx` (`status_id`),
  CONSTRAINT `fk_chat_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `fk_chat_user1` FOREIGN KEY (`user_from_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_chat_user2` FOREIGN KEY (`user_to_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table react_chat.chat: ~15 rows (approximately)
INSERT INTO `chat` (`id`, `user_from_id`, `user_to_id`, `message`, `date_time`, `status_id`) VALUES
	(1, 1, 2, 'Hello', '2023-02-13 20:49:16', 1),
	(2, 2, 1, 'Hi', '2023-02-13 20:52:39', 2),
	(3, 1, 3, 'Hello', '2023-02-13 21:31:47', 2),
	(4, 3, 2, 'Thank you', '2023-02-13 21:32:14', 2),
	(5, 1, 4, 'what\'s up', '2023-02-19 13:47:32', 1),
	(7, 1, 2, 'Hgghh', '2023-03-02 14:01:32', 1),
	(8, 1, 2, 'Gm', '2023-03-02 14:03:10', 1),
	(9, 1, 4, 'Hee', '2023-03-02 20:49:01', 1),
	(10, 1, 4, 'Hee', '2023-03-02 20:49:53', 1),
	(11, 1, 2, 'hi', '2023-03-04 17:12:41', 1),
	(12, 1, 2, 'hi', '2023-03-04 17:12:46', 1),
	(13, 1, 4, 'h', '2023-03-04 17:18:28', 1),
	(14, 1, 2, 'wada', '2023-03-04 17:19:15', 1),
	(15, 1, 3, 'Hi', '2023-03-04 18:30:35', 1),
	(16, 1, 3, 'Hi', '2023-03-04 18:30:39', 1);

-- Dumping structure for table react_chat.country
CREATE TABLE IF NOT EXISTS `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table react_chat.country: ~4 rows (approximately)
INSERT INTO `country` (`id`, `name`) VALUES
	(1, 'Sri Lanka'),
	(2, 'Australia'),
	(3, 'Japan'),
	(4, 'Canada');

-- Dumping structure for table react_chat.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table react_chat.status: ~2 rows (approximately)
INSERT INTO `status` (`id`, `name`) VALUES
	(1, 'send'),
	(2, 'seen');

-- Dumping structure for table react_chat.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mobile` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `profile_url` text NOT NULL,
  `country_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_country_idx` (`country_id`),
  CONSTRAINT `fk_user_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table react_chat.user: ~7 rows (approximately)
INSERT INTO `user` (`id`, `mobile`, `name`, `password`, `profile_url`, `country_id`) VALUES
	(1, '0771112223', 'Sahan Perera', '123', 'uploads/0711998046.png', 1),
	(2, '0717897890', 'Prabath Bandara', '456', 'uploads/0711998046.png', 1),
	(3, '0775675431', 'Hashan Weerasinghe', '789', 'uploads/0711998046.png', 2),
	(4, '123456789', 'sithum', '345', 'uploads/0711998046.png', 2),
	(5, '0711998046', 'bamidu', '123', 'uploads/0711998046.png', 1),
	(6, '0112222333', 'test', '123', 'uploads/0112222333.png', 1),
	(7, '0112222333', 'test', '123', 'uploads/0112222333.png', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
