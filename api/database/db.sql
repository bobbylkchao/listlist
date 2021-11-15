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

 Date: 15/11/2021 13:10:40
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
  `postID` bigint NOT NULL,
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `postID` (`postID`),
  KEY `userID` (`userID`),
  KEY `createdAt` (`createdAt`),
  CONSTRAINT `fav.postid` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE,
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `categoryID` int NOT NULL,
  `adtype` int NOT NULL COMMENT '1: offer 2: want to find',
  `forsaleby` int NOT NULL COMMENT '1: owner 2:business',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL COMMENT '1: hasPrice 2: bid/auction 3:free 4:please contact 5:swpe/trade',
  `price_value` int DEFAULT '0',
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fulfillment` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '[\\"1\\",\\"3\\",\\"2\\"] 1:Willing to drop-off / deliver 2:Willing to ship the item 3:Offer curbside pick up',
  `cashless_pay` int DEFAULT NULL COMMENT '1:Offer cashless payment',
  `condition` int DEFAULT NULL COMMENT '1:new 2:used-like new 3:used-good 4:used-fair',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `youtube` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `websitelink` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phonenumber` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
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
  KEY `updateat` (`updatedAt`),
  KEY `address` (`address`),
  KEY `fulfillment` (`fulfillment`),
  KEY `cashless_pay` (`cashless_pay`),
  KEY `condition` (`condition`)
) ENGINE=InnoDB AUTO_INCREMENT=16002010 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for postimage
-- ----------------------------
DROP TABLE IF EXISTS `postimage`;
CREATE TABLE `postimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postID` bigint NOT NULL,
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `thumbnailUrl` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `main` int DEFAULT '0' COMMENT 'main image? 0:false 1:true',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `postid` (`postID`),
  KEY `main` (`main`),
  CONSTRAINT `postimage.postid` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postID` bigint NOT NULL,
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
  CONSTRAINT `reviews.postid` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE
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
  `channel_userID` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `review_rating` int DEFAULT NULL,
  `status` int DEFAULT '1' COMMENT '1:active 2:inactive',
  `createdAt` int NOT NULL COMMENT 'utc timestamp',
  `updatedAt` int DEFAULT NULL COMMENT 'utc timestamp',
  PRIMARY KEY (`email`) USING BTREE,
  KEY `id` (`id`),
  KEY `email` (`email`),
  KEY `pwd` (`password`),
  KEY `status` (`status`),
  KEY `reg_channel` (`reg_channel`)
) ENGINE=InnoDB AUTO_INCREMENT=5000024 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (5000022, 'Bobby Chao', 'bobbylkchao@gmail.com', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10216636384462559&height=50&width=50&ext=1639288350&hash=AeRKqDTh8OOg_iCdxJ0', NULL, 'facebook', '10216636384462559', NULL, 1, 1636075207, NULL);
INSERT INTO `user` VALUES (5000001, 'Candy R. Kim', 'CandyRKim@teleworm.us', 'default', '$2b$10$EL2Jy2tky6wLjVA9ZcOHce/HxX7XNMuiOX7yRSNKrzrLINKzALiwa', 'listlist', NULL, NULL, 1, 1635060428, NULL);
INSERT INTO `user` VALUES (5000002, 'Donna J. Snyder', 'DonnaJSnyder@teleworm.us', 'default', '$2b$10$cr0pIfWpXebCXTZeVqO.kOtuLbGhCHXuKQezZKd1M2j9DiJD5poD2', 'listlist', NULL, NULL, 1, 1635060442, NULL);
INSERT INTO `user` VALUES (5000023, 'test', 'test@test.com', 'default', '$2b$10$Y2J9phaPGAx2asdy6XjdpuuP.69/MStg0M4R2tkPRDEsEkDFFZRmi', 'listlist', NULL, NULL, 1, 1636696316, NULL);
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
