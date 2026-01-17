-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.13.0.7147
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table romhackingnet.abandoned
CREATE TABLE IF NOT EXISTS `abandoned` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL DEFAULT '',
  `author` varchar(50) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 0,
  `file` varchar(50) NOT NULL DEFAULT '',
  `description` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.category
CREATE TABLE IF NOT EXISTS `category` (
  `categorykey` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`categorykey`),
  KEY `catname, categorykey` (`catname`,`categorykey`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.console
CREATE TABLE IF NOT EXISTS `console` (
  `consolekey` varchar(16) NOT NULL DEFAULT '',
  `consoleid` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(64) NOT NULL DEFAULT '',
  `manufacturer` varchar(32) NOT NULL DEFAULT '',
  `abb` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`consoleid`),
  KEY `manufacturer` (`manufacturer`),
  KEY `description,consoleid` (`description`,`consoleid`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.documents
CREATE TABLE IF NOT EXISTS `documents` (
  `dockey` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `categorykey` int(11) NOT NULL DEFAULT 0,
  `consolekey` int(11) NOT NULL DEFAULT 0,
  `gamekey` int(11) NOT NULL DEFAULT 0,
  `authorkey` int(11) NOT NULL DEFAULT 0,
  `description` mediumtext NOT NULL,
  `filename` varchar(100) NOT NULL DEFAULT '',
  `explevel` int(20) DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  `recm` varchar(25) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT '2005-12-23 05:00:00',
  `lastmod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reldate` int(11) NOT NULL,
  `nofile` tinyint(1) NOT NULL DEFAULT 0,
  `downloads` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`dockey`),
  KEY `lastmod` (`lastmod`),
  KEY `title` (`title`),
  KEY `consolekey` (`consolekey`),
  KEY `gamekey` (`gamekey`),
  KEY `authorkey` (`authorkey`),
  KEY `categorykey` (`categorykey`,`title`),
  KEY `downloads` (`downloads`),
  KEY `reldate` (`reldate`),
  FULLTEXT KEY `title1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=927 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.fonts
CREATE TABLE IF NOT EXISTS `fonts` (
  `fontkey` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `source` varchar(50) NOT NULL,
  `language` int(11) NOT NULL,
  `width` smallint(6) NOT NULL,
  `height` smallint(6) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `description` mediumtext NOT NULL,
  `screenshot` varchar(50) NOT NULL,
  `lastmod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `downloads` int(11) NOT NULL,
  PRIMARY KEY (`fontkey`),
  KEY `lastmod` (`lastmod`),
  KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.gamedata
CREATE TABLE IF NOT EXISTS `gamedata` (
  `gamekey` int(11) NOT NULL AUTO_INCREMENT,
  `gametitle` char(128) NOT NULL DEFAULT '',
  `japtitle` char(128) DEFAULT NULL,
  `description` mediumtext NOT NULL,
  `publisher` char(64) DEFAULT 'Unknown',
  `gamerel` char(32) DEFAULT '????',
  `Day` int(11) NOT NULL DEFAULT 0,
  `Month` int(11) NOT NULL DEFAULT 0,
  `Year` int(11) NOT NULL DEFAULT 0,
  `genreid` int(11) NOT NULL DEFAULT 0,
  `platformid` int(11) NOT NULL DEFAULT 0,
  `titlescreen` char(64) DEFAULT NULL,
  `titleext` char(4) DEFAULT NULL,
  `titlewidth` int(11) DEFAULT NULL,
  `titleheight` int(11) DEFAULT NULL,
  `lastmod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transexist` tinyint(1) NOT NULL DEFAULT 0,
  `reflectexist` char(1) NOT NULL DEFAULT 'N',
  `docexist` tinyint(1) NOT NULL DEFAULT 0,
  `utilexist` tinyint(1) NOT NULL DEFAULT 0,
  `hackexist` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`gamekey`),
  KEY `genreid` (`genreid`),
  KEY `gametitle, gamekey` (`gametitle`,`gamekey`),
  KEY `gametitle2` (`gametitle`),
  KEY `docexist` (`docexist`),
  KEY `utilexist` (`utilexist`),
  KEY `transexist` (`transexist`),
  KEY `hackexist` (`hackexist`),
  KEY `Date` (`Year`,`Month`,`Day`),
  FULLTEXT KEY `japtitle` (`japtitle`),
  FULLTEXT KEY `gametitle` (`gametitle`,`japtitle`)
) ENGINE=InnoDB AUTO_INCREMENT=5376 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.genres
CREATE TABLE IF NOT EXISTS `genres` (
  `genrekey` int(11) NOT NULL AUTO_INCREMENT,
  `description` char(32) NOT NULL DEFAULT '',
  PRIMARY KEY (`genrekey`),
  KEY `description,genrekey` (`description`,`genrekey`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.hackauthor-project
CREATE TABLE IF NOT EXISTS `hackauthor-project` (
  `project` int(11) NOT NULL,
  `person` int(11) NOT NULL,
  PRIMARY KEY (`person`,`project`),
  UNIQUE KEY `project-person` (`project`,`person`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.hackimages
CREATE TABLE IF NOT EXISTS `hackimages` (
  `imagekey` int(11) NOT NULL AUTO_INCREMENT,
  `hackkey` int(11) NOT NULL DEFAULT 0,
  `gamekey` int(11) NOT NULL DEFAULT 0,
  `filename` varchar(50) NOT NULL DEFAULT '',
  `groupkey` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`imagekey`),
  KEY `hackkey` (`hackkey`)
) ENGINE=InnoDB AUTO_INCREMENT=25681 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.hacks
CREATE TABLE IF NOT EXISTS `hacks` (
  `hackkey` int(11) NOT NULL AUTO_INCREMENT,
  `consolekey` int(11) NOT NULL DEFAULT 0,
  `gamekey` int(11) NOT NULL DEFAULT 0,
  `hacktitle` varchar(100) NOT NULL DEFAULT '',
  `authorkey` int(64) NOT NULL DEFAULT 0,
  `description` mediumtext NOT NULL,
  `filename` varchar(150) NOT NULL DEFAULT '',
  `version` varchar(10) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT '2005-12-23 05:00:00',
  `lastmod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reldate` varchar(25) DEFAULT 'Unknown',
  `patchrelunix` int(11) NOT NULL DEFAULT 0,
  `readme` varchar(100) NOT NULL DEFAULT '',
  `graphics` tinyint(4) NOT NULL DEFAULT 0,
  `music` tinyint(4) NOT NULL DEFAULT 0,
  `levels` tinyint(4) NOT NULL DEFAULT 0,
  `text` tinyint(4) NOT NULL DEFAULT 0,
  `gameplay` tinyint(4) NOT NULL DEFAULT 0,
  `other` tinyint(4) NOT NULL DEFAULT 0,
  `tscreen` varchar(100) DEFAULT NULL,
  `category` int(11) NOT NULL DEFAULT 0,
  `nofile` tinyint(1) NOT NULL DEFAULT 0,
  `origtscreen` tinyint(1) NOT NULL DEFAULT 0,
  `downloads` int(11) NOT NULL DEFAULT 0,
  `patchhint` int(11) NOT NULL,
  `rominfo` mediumtext NOT NULL,
  `theme` int(11) NOT NULL DEFAULT 0,
  `license` varchar(100) NOT NULL DEFAULT '',
  `source` varchar(150) NOT NULL DEFAULT '',
  `youtube` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`hackkey`),
  UNIQUE KEY `hackkey-gamekey` (`hackkey`,`gamekey`) USING BTREE,
  KEY `downloads` (`downloads`),
  KEY `hacktitle` (`hacktitle`),
  KEY `gamekey` (`gamekey`),
  KEY `lastmod` (`lastmod`),
  KEY `patchrelunix` (`patchrelunix`),
  KEY `consolekey` (`consolekey`),
  KEY `created` (`created`),
  FULLTEXT KEY `hacktitle1` (`hacktitle`)
) ENGINE=InnoDB AUTO_INCREMENT=8789 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.hackscat
CREATE TABLE IF NOT EXISTS `hackscat` (
  `categorykey` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`categorykey`),
  KEY `catname` (`catname`,`categorykey`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.homebrew
CREATE TABLE IF NOT EXISTS `homebrew` (
  `homebrewkey` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `filename` varchar(100) NOT NULL DEFAULT '',
  `version` varchar(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastmod` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `reldate` varchar(50) NOT NULL,
  `reldateunix` int(11) NOT NULL,
  `authorkey` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `readme` varchar(100) NOT NULL DEFAULT '',
  `titlescreen` varchar(100) NOT NULL DEFAULT '',
  `categorykey` int(11) NOT NULL,
  `noreadme` tinyint(1) NOT NULL DEFAULT 0,
  `nofile` tinyint(1) NOT NULL DEFAULT 0,
  `downloads` int(11) NOT NULL DEFAULT 0,
  `platformkey` int(11) NOT NULL,
  `graphics` tinyint(1) NOT NULL DEFAULT 0,
  `sound` tinyint(1) NOT NULL DEFAULT 0,
  `controller` tinyint(1) NOT NULL DEFAULT 0,
  `addon` tinyint(1) NOT NULL DEFAULT 0,
  `other` tinyint(1) NOT NULL DEFAULT 0,
  `source_included` tinyint(4) NOT NULL DEFAULT 0,
  `source_lang` varchar(100) NOT NULL DEFAULT '',
  `source_utility` varchar(100) NOT NULL DEFAULT '',
  `source_licenseid` varchar(100) NOT NULL DEFAULT '',
  `source_url` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`homebrewkey`),
  KEY `authorkey` (`authorkey`),
  KEY `categorykey` (`categorykey`),
  KEY `platformkey` (`platformkey`),
  KEY `title` (`title`),
  KEY `reldateunix` (`reldateunix`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.homebrewcat
CREATE TABLE IF NOT EXISTS `homebrewcat` (
  `categorykey` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(100) NOT NULL,
  PRIMARY KEY (`categorykey`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.language
CREATE TABLE IF NOT EXISTS `language` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL DEFAULT '',
  `abbrev` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name, id` (`name`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.licenses
CREATE TABLE IF NOT EXISTS `licenses` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.os
CREATE TABLE IF NOT EXISTS `os` (
  `oskey` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`oskey`),
  KEY `description, oskey` (`name`,`oskey`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.patchhints
CREATE TABLE IF NOT EXISTS `patchhints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.patchstatus
CREATE TABLE IF NOT EXISTS `patchstatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statusletter` char(1) NOT NULL DEFAULT '',
  `description` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `statusletter` (`statusletter`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.screenshots
CREATE TABLE IF NOT EXISTS `screenshots` (
  `imagekey` int(11) NOT NULL AUTO_INCREMENT,
  `section` int(11) NOT NULL,
  `itemkey` int(11) NOT NULL,
  `filename` varchar(50) NOT NULL,
  PRIMARY KEY (`imagekey`)
) ENGINE=InnoDB AUTO_INCREMENT=447 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.sections
CREATE TABLE IF NOT EXISTS `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `abb` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.skilllevel
CREATE TABLE IF NOT EXISTS `skilllevel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `name, id` (`name`,`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.transauthor-project
CREATE TABLE IF NOT EXISTS `transauthor-project` (
  `project` int(11) NOT NULL DEFAULT 0,
  `person` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`person`,`project`),
  UNIQUE KEY `project-person` (`project`,`person`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.transdata
CREATE TABLE IF NOT EXISTS `transdata` (
  `transkey` int(11) NOT NULL AUTO_INCREMENT,
  `consolekey` int(11) NOT NULL DEFAULT 0,
  `gamekey` int(11) NOT NULL DEFAULT 0,
  `patchstatus` int(11) NOT NULL,
  `patchver` varchar(32) DEFAULT NULL,
  `patchfile` varchar(150) DEFAULT NULL,
  `readme` char(1) DEFAULT 'Y',
  `readmefile` varchar(50) DEFAULT NULL,
  `patchrel` varchar(32) DEFAULT NULL,
  `patchrel_unix` int(11) DEFAULT NULL,
  `groupkey` int(64) DEFAULT NULL,
  `reviewer` varchar(32) NOT NULL DEFAULT 'NOBODY',
  `description` mediumtext DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT '2005-12-23 05:00:00',
  `lastmod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `lastmod_unix` int(11) DEFAULT NULL,
  `hasrefl` char(1) NOT NULL DEFAULT 'N',
  `language` smallint(6) NOT NULL DEFAULT 12,
  `nofile` tinyint(1) NOT NULL DEFAULT 0,
  `noreadme` tinyint(1) NOT NULL DEFAULT 0,
  `downloads` int(11) NOT NULL DEFAULT 0,
  `tscreen` varchar(100) DEFAULT NULL,
  `origtscreen` tinyint(1) NOT NULL DEFAULT 0,
  `patchhint` int(11) NOT NULL,
  `rominfo` mediumtext NOT NULL,
  `license` varchar(100) NOT NULL DEFAULT '',
  `source` varchar(150) NOT NULL DEFAULT '',
  `youtube` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`transkey`),
  KEY `gamekey` (`gamekey`),
  KEY `patchrel` (`patchrel`),
  KEY `patchrel_unix` (`patchrel_unix`),
  KEY `lastmod_unix` (`lastmod_unix`),
  KEY `downloads` (`downloads`),
  KEY `patchstatus` (`patchstatus`),
  KEY `language` (`language`),
  KEY `consolekey` (`consolekey`)
) ENGINE=InnoDB AUTO_INCREMENT=7366 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.transimage
CREATE TABLE IF NOT EXISTS `transimage` (
  `imagekey` int(11) NOT NULL AUTO_INCREMENT,
  `gamekey` int(11) NOT NULL DEFAULT 0,
  `transkey` int(11) NOT NULL DEFAULT 0,
  `groupkey` char(64) DEFAULT NULL,
  `filename` char(64) DEFAULT NULL,
  PRIMARY KEY (`imagekey`),
  KEY `gamekey` (`gamekey`),
  KEY `transkey` (`transkey`)
) ENGINE=InnoDB AUTO_INCREMENT=25436 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.utilcat
CREATE TABLE IF NOT EXISTS `utilcat` (
  `categorykey` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`categorykey`),
  KEY `catname,categorykey` (`catname`,`categorykey`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table romhackingnet.utilities
CREATE TABLE IF NOT EXISTS `utilities` (
  `utilkey` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `categorykey` int(11) NOT NULL DEFAULT 0,
  `consolekey` int(11) NOT NULL DEFAULT 0,
  `gamekey` int(11) NOT NULL DEFAULT 0,
  `authorkey` int(11) NOT NULL DEFAULT 0,
  `description` mediumtext NOT NULL,
  `filename` varchar(100) NOT NULL DEFAULT '',
  `explevel` int(11) NOT NULL DEFAULT 0,
  `version` varchar(10) DEFAULT NULL,
  `recm` varchar(25) DEFAULT NULL,
  `screenshot` varchar(50) DEFAULT NULL,
  `os` int(11) NOT NULL DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT '2005-12-23 05:00:00',
  `lastmod` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reldate` int(11) NOT NULL,
  `language` smallint(6) NOT NULL DEFAULT 12,
  `nofile` tinyint(1) NOT NULL DEFAULT 0,
  `downloads` int(11) NOT NULL DEFAULT 0,
  `license` varchar(100) NOT NULL DEFAULT '',
  `source` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`utilkey`),
  KEY `lastmod` (`lastmod`),
  KEY `title` (`title`),
  KEY `downloads` (`downloads`),
  KEY `authorkey` (`authorkey`),
  KEY `reldate` (`reldate`),
  FULLTEXT KEY `title1` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=1831 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
