/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : listlist

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 04/11/2021 17:52:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `upperID` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `upperid` (`upperID`),
  KEY `icon` (`icon`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Buy & Sell', 'tag', 0);
INSERT INTO `category` VALUES (2, 'Arts & Collectibles', NULL, 1);
INSERT INTO `category` VALUES (3, 'Computers', NULL, 1);
INSERT INTO `category` VALUES (4, 'Desktop Computers', '', 3);
INSERT INTO `category` VALUES (5, 'iPads & Tablets', NULL, 3);
INSERT INTO `category` VALUES (6, 'Cars & Vehicles', 'car', 0);
INSERT INTO `category` VALUES (7, 'Cars & Trucks', NULL, 6);
INSERT INTO `category` VALUES (8, 'Classic Cars', NULL, 6);
INSERT INTO `category` VALUES (9, 'ATVs & Snowmobiles', NULL, 6);
INSERT INTO `category` VALUES (10, 'Boats & Watercraft', NULL, 6);
INSERT INTO `category` VALUES (11, 'Vehicle Parts, Tires, & Accessories', NULL, 6);
INSERT INTO `category` VALUES (12, 'Tires & Rims', NULL, 11);
INSERT INTO `category` VALUES (13, 'Audio & GPS', NULL, 11);
INSERT INTO `category` VALUES (14, 'RV & Camper Parts & Accessories', NULL, 11);
INSERT INTO `category` VALUES (15, 'Real Estate', 'home', 0);
INSERT INTO `category` VALUES (16, 'For Rent', NULL, 15);
INSERT INTO `category` VALUES (17, 'For Sale', NULL, 15);
INSERT INTO `category` VALUES (18, 'Real Estate Services', NULL, 15);
INSERT INTO `category` VALUES (19, 'Jobs', 'briefcase', 0);
INSERT INTO `category` VALUES (20, 'Accounting & Management', NULL, 19);
INSERT INTO `category` VALUES (21, 'Child Care', NULL, 19);
INSERT INTO `category` VALUES (22, 'Services', 'tools', 0);
INSERT INTO `category` VALUES (23, 'Childcare & Nanny', NULL, 22);
INSERT INTO `category` VALUES (24, 'Cleaners & Cleaning', NULL, 22);
INSERT INTO `category` VALUES (25, 'Pets', 'paw', 0);
INSERT INTO `category` VALUES (26, 'Animal & Pet Services', NULL, 25);
INSERT INTO `category` VALUES (27, 'Birds for Rehoming', NULL, 25);
INSERT INTO `category` VALUES (28, 'Dogs & Puppies for Rehoming', NULL, 25);
INSERT INTO `category` VALUES (29, 'Cats & Kittens for Rehoming', NULL, 25);
INSERT INTO `category` VALUES (30, 'Community', 'users', 0);
INSERT INTO `category` VALUES (31, 'Lost & Found', NULL, 30);
INSERT INTO `category` VALUES (32, 'Volunteers', NULL, 30);
COMMIT;

-- ----------------------------
-- Table structure for favourite
-- ----------------------------
DROP TABLE IF EXISTS `favourite`;
CREATE TABLE `favourite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `postID` int NOT NULL,
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `postID` (`postID`),
  KEY `userID` (`userID`),
  KEY `createdAt` (`createdAt`),
  CONSTRAINT `Favourite.postID` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Favourite.userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'eg. [1,2]',
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `users` (`users`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for messageconversations
-- ----------------------------
DROP TABLE IF EXISTS `messageconversations`;
CREATE TABLE `messageconversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `messageID` int NOT NULL,
  `postID` int NOT NULL,
  `fromUserID` int NOT NULL,
  `toUserID` int NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `msgID` (`messageID`),
  KEY `postID` (`postID`),
  KEY `fromUID` (`fromUserID`),
  KEY `toUID` (`toUserID`),
  KEY `createdat` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for messagestatus
-- ----------------------------
DROP TABLE IF EXISTS `messagestatus`;
CREATE TABLE `messagestatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `messageID` int NOT NULL,
  `userID` int NOT NULL,
  `hideStatus` int DEFAULT '0' COMMENT '0:show 1:hide',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `msgID` (`messageID`),
  KEY `uID` (`userID`),
  KEY `hidestatus` (`hideStatus`),
  CONSTRAINT `MessageStatus.messageID` FOREIGN KEY (`messageID`) REFERENCES `message` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pushStatus` int DEFAULT '0' COMMENT '0:no 1:pushed',
  `readStatus` int DEFAULT '0' COMMENT '0:no 1:read',
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `uid` (`userID`),
  KEY `pushstatus` (`pushStatus`),
  KEY `readstatus` (`readStatus`),
  KEY `createdat` (`createdAt`),
  CONSTRAINT `Notification.userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `categoryID` int NOT NULL,
  `adtype` int NOT NULL COMMENT '1: offer 2: want to find',
  `forsaleby` int NOT NULL COMMENT '1: owner 2:business',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL COMMENT '1: hasPrice 2: bid/auction 3:free 4:please contact 5:swpe/trade',
  `price_value` decimal(10,2) DEFAULT '0.00',
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tags` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `youtube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `websitelink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phonenumber` int DEFAULT NULL,
  `visit` int DEFAULT '0',
  `status` int DEFAULT '1' COMMENT '1:active 2:inactive',
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  `updatedAt` int DEFAULT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `uid` (`userID`),
  KEY `cateid` (`categoryID`),
  KEY `adtype` (`adtype`),
  KEY `forsaleby` (`forsaleby`),
  KEY `price` (`price`),
  KEY `price_value` (`price_value`),
  KEY `title` (`title`),
  KEY `tags` (`tags`),
  KEY `visit` (`visit`),
  KEY `status` (`status`),
  KEY `createat` (`createdAt`),
  KEY `updateat` (`updatedAt`)
) ENGINE=InnoDB AUTO_INCREMENT=16002003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of post
-- ----------------------------
BEGIN;
INSERT INTO `post` VALUES (16002000, 1, 3, 1, 1, 'Gaming pc', 'RTX 1050 6gbs of ram, i5 intel its in good condition\\nAnd you can run up to 100 to 400 FPS depending on the game!', 1, 1200.00, 'Winnipeg, MB R3T 3G1', '\'pc\',\'gaming\'', NULL, NULL, NULL, 0, 1, 1634001827, NULL);
INSERT INTO `post` VALUES (16002001, 2, 3, 1, 1, 'Apple iMac 27\" Intel i7 3.5GHz, 32GB Ram, Office 2019, Dual SSDs', 'Model A1419 (EMC 2639)\\nhttps://everymac.com/systems/apple/imac/specs/\\nimac-core-i7-3.5-27-inch-aluminum-late-2013-specs.html\\n3.5 GHz Intel Quad Core, Late 2013\\n3.9GHz with Turbo Boost\\nIOS Catalina\\n27 Inch, 2560x1440\\n32GB Ram\\nDual HDDs, 256GB SSD & 500GB SSD\\nNVIDIA GeForce GTX 775M graphics processor with 2 GB of dedicated GDDR5 memory\\nBuilt-in \"FaceTime HD\" video camera and built-in stereo speakers\\nGigabit Ethernet,\\nBluetooth 4.0\\n4x USB 3.0\\n2x Thunderbolt port\\nMicrosoft Office Pro 2019\\nPrice is Firm, sorry but I will not reply to lower offers.\\nNo Trades\\nThe iMac will be set up and running at time of purchase plus you will be given 7 days to verify that everything is properly functioning.\\nThis ad will be deleted immediately after computer is sold', 1, 850.00, 'Winnipeg, MB R3T 4B4', NULL, NULL, NULL, NULL, 0, 1, 1634002037, NULL);
INSERT INTO `post` VALUES (16002002, 3, 3, 1, 1, 'Dell Optiplex 7040 i5 6500 3.2GHz OR i7 6700 3.4GHz Quad Core', 'I have this model in i5 or i7 outside of CPU, and RAM specs are the same.\\ni5 - $200\ni7 with 8GB RAM - $300\\nIntel i5 6500 3.2ghz Quad Core (6th Gen) OR\\nIntel i7 6700 3.4GHz Quad Core (6th Gen)\n**Small form factor***\\nOnboard Video Intel HD Graphics 530\\n2x Display Port\\n1x HDMI\\ni5 - 4GB DDR4 Ram, i7- 8GB DDR4 RAM\\n250GB SSD (SSD\'s are 10x faster and way more reliable then regular HDD\'s https://www.digitaltrends.com/computing/what-is-an-ssd/ )\\nDvdrw\\n1x PCIe 3.0x16; 1x PCIe 3.0x4,\\nGigabit Ethernet\\nFront and Rear Audio\\n6x USB 3.0 4x USB 2.0\\nWindows 10 Pro 64bit, Licensed and Updated\\nWindows Defender (free antivirus)\\nMicrosoft Office 2016 Pro\\nAdd 150Mbps Wi-Fi Adapter - $10 (Unavailable until June 28th)\\nAdd 1200Mbps 2.4/5GHz - $25\\nPrice is firm sorry, but I will not reply to lower offers.\\nNo Trades\\nThe computer will be set up and running at time of purchase plus you will be given 7 days to verify that everything is properly functioning, otherwise all sales are final.\\nClick on \"View Map\" for my approximate location\\nThis ad will be deleted immediately after computer is sold\\nPlease check my other ads', 1, 200.00, 'Winnipeg, MB R3T 4B4', NULL, NULL, NULL, NULL, 0, 1, 1634002208, NULL);
COMMIT;

-- ----------------------------
-- Table structure for postimage
-- ----------------------------
DROP TABLE IF EXISTS `postimage`;
CREATE TABLE `postimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postID` int NOT NULL,
  `thumbnail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `original` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `postid` (`postID`),
  CONSTRAINT `postID` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postID` int NOT NULL,
  `userID` int NOT NULL,
  `star` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `postID` (`postID`),
  KEY `userID` (`userID`),
  KEY `star` (`star`),
  KEY `createdAt` (`createdAt`),
  CONSTRAINT `Reviews.postID` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `headnav` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'default',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reg_channel` varchar(10) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'listlist' COMMENT '1:listlist 2:google 3:facebook',
  `review_rating` int DEFAULT NULL,
  `status` int DEFAULT '1' COMMENT '1:active 2:inactive',
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  `updatedAt` int DEFAULT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`email`) USING BTREE,
  KEY `id` (`id`),
  KEY `email` (`email`),
  KEY `pwd` (`password`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=5000019 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (5000001, 'Candy R. Kim', 'CandyRKim@teleworm.us', 'default', '$2b$10$EL2Jy2tky6wLjVA9ZcOHce/HxX7XNMuiOX7yRSNKrzrLINKzALiwa', 'listlist', NULL, 1, 1635060428, NULL);
INSERT INTO `user` VALUES (5000002, 'Donna J. Snyder', 'DonnaJSnyder@teleworm.us', 'default', '$2b$10$cr0pIfWpXebCXTZeVqO.kOtuLbGhCHXuKQezZKd1M2j9DiJD5poD2', 'listlist', NULL, 1, 1635060442, NULL);
COMMIT;

-- ----------------------------
-- Table structure for visit
-- ----------------------------
DROP TABLE IF EXISTS `visit`;
CREATE TABLE `visit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `postID` int NOT NULL,
  `categoryID` int NOT NULL,
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `uid` (`userID`),
  KEY `pid` (`postID`),
  KEY `cateID` (`categoryID`),
  KEY `createdAt` (`createdAt`),
  CONSTRAINT `visit.uid` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
