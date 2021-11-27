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

 Date: 26/11/2021 22:53:09
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
INSERT INTO `category` VALUES (33, 'Books', '', 1);
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
  `country` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `region` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `userID` int NOT NULL,
  `categoryID` int NOT NULL,
  `adtype` int NOT NULL COMMENT '1: offer 2: want to find',
  `forsaleby` int NOT NULL COMMENT '1: owner 2:business',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL COMMENT '1: hasPrice 2: bid/auction 3:free 4:please contact 5:swpe/trade',
  `price_value` int DEFAULT '0',
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lat` decimal(18,15) NOT NULL,
  `long` decimal(18,15) NOT NULL,
  `exactLocation` tinyint NOT NULL DEFAULT '0' COMMENT '0: only show an area, 1: show exact location, default is 0',
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
  KEY `condition` (`condition`),
  KEY `country` (`country`),
  KEY `region` (`region`),
  KEY `city` (`city`),
  KEY `lat` (`lat`),
  KEY `long` (`long`),
  KEY `exactlocation` (`exactLocation`)
) ENGINE=InnoDB AUTO_INCREMENT=16001008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of post
-- ----------------------------
BEGIN;
INSERT INTO `post` VALUES (16001001, 'CA', 'MB', 'Winnipeg', 5000024, 4, 1, 1, 'AMD%20Ryzen%207%202700x', 'AMD%20Ryzen%207%202700x%203.7Ghz%20with%208%20core%2016%20threads%0A**NEW**%2016Gb%20Kingston%20Hynix%20DDR4%20ram%0A500Gb%20WD%20Black%20NVME%0AWD%20RED%204Tb%20hard%20drive%0AOnboard%20WIFI%20(2%2C4%20%26%205Ghz)%20and%20Bluetooth%0A**NEW**%20600%20Watt%20Thermaltake%20power%20supply%0A**NEW**%205%20Anidees%20140mm%20RGB%20fans%20with%20remote%0A**NEW**%20Veetroo%20Darkstorm%20Cpu%20cooler%0A**NEW**%20Raijintek%20Silenos%20case%203%20sides%20tempered%20glass%0A**NEW**%20NVIDIA%20GTX%201650%204Gb%20graphics%20card%0A**NEW**%20Windows%2011%20PRO%20install%20and%20all%20updates%0A%0A%241400%20FIRM%0A%0ACall%20or%20text%20Rod%20%40%20204-930-8591%0A%0AFREE%20Delivery%20to%20Winnipeg%0A%0A***Power%20supply%20was%20upgraded%20since%20pics%20were%20taken', 1, 1400, '185 Point West Bay, Winnipeg, R3T 5H8', 0.000000000000000, 0.000000000000000, 0, '[1,3]', 1, 2, '[\"amd\",\"gaming\",\"computer\"]', NULL, NULL, NULL, 0, 1, 1637554092, NULL);
INSERT INTO `post` VALUES (16001002, 'CA', 'MB', 'Winnipeg', 5000024, 4, 1, 1, 'Dell%20Optiplex%207050', 'I5-6500%0AWindows%2010%20Pro%0A16%20GB%20RAM%0A128%20GB%20m.2%20SSD%20(boot)%0A1%20TB%207200%20RPM%20HDD%20(storage)%0AAMD%207000%20series%20low%20profile%201%20GB%20GPU%0ASuper%20fast%20WiFi%20dongle%0A%24250%20FIRM.', 1, 250, '185 Point West Bay, Winnipeg, R3T 5H8', 0.000000000000000, 0.000000000000000, 0, '[3]', 1, 3, '[\"computer\",\"dell\",\"dell 7050\"]', NULL, NULL, NULL, 0, 1, 1637554389, NULL);
INSERT INTO `post` VALUES (16001003, 'CA', 'MB', 'Winnipeg', 5000024, 4, 1, 1, 'Mac%20Mini%20(Mid2011)', 'Mac%20Mini%20(Mid%202011)%202.3GHz%3A%204GB%20RAM%3B%20120%20SSD%3B%20Intel%20Graphics%203000.%20%24150.00...EACH!%0ACan%20be%20upgraded%20for%20a%20price.', 1, 150, '185 Point West Bay, Winnipeg, R3T 5H8', 0.000000000000000, 0.000000000000000, 0, '[3]', 1, 2, '[\"mac\",\"mac mini\"]', NULL, NULL, NULL, 0, 1, 1637554543, NULL);
INSERT INTO `post` VALUES (16001004, 'CA', 'MB', 'Winnipeg', 5000024, 5, 1, 1, 'awdawdawdawdawd', 'awdawdawdawd', 5, NULL, 'Winnipeg, R3T 5H8', 49.775340388218716, -97.169223269746170, 0, '[]', NULL, NULL, '[]', NULL, NULL, NULL, 0, 1, 1637559270, NULL);
INSERT INTO `post` VALUES (16001005, 'CA', ' ON', ' Toronto', 5000024, 4, 2, 1, 'Wanna%20buy%20a%20secondhand%20macbook%20pro%20(after%202017)', 'Wanna%20buy%20a%20secondhand%20macbook%20pro%20(after%202017)Wanna%20buy%20a%20secondhand%20macbook%20pro%20(after%202017)', 1, 500, '100 King Street West, Toronto, ON, Canada', 43.648496000000000, -79.381341100000000, 0, '[]', 1, 3, '[\"macbook\"]', NULL, NULL, NULL, 0, 1, 1637721822, NULL);
INSERT INTO `post` VALUES (16001006, 'CA', ' ON', ' Toronto', 5000024, 2, 1, 1, 'testtesttest', 'testtesttesttesttesttesttesttesttesttesttesttest', 5, NULL, '100 King Street West, Toronto, ON, Canada', 43.648496000000000, -79.381341100000000, 0, '[1,2,3]', 1, 3, '[\"a\",\"b\",\"c\"]', '1.ca', '2.ca', '111-111-1111', 0, 1, 1637988329, NULL);
INSERT INTO `post` VALUES (16001007, 'CA', 'MB', 'Winnipeg', 5000024, 7, 1, 1, 'tttttttttttttt', 'tttttttttttttttttttttttttttttttttttttttttttttttttttttttt', 1, 1, 'Winnipeg, R3T 5H8', 49.775266698498050, -97.169364291565270, 1, '[]', NULL, NULL, '[]', NULL, NULL, NULL, 0, 1, 1637988376, NULL);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of postimage
-- ----------------------------
BEGIN;
INSERT INTO `postimage` VALUES (1, 16001001, 'posts/16001001/7AI4NADGPY2A-640.jpeg', 'posts/16001001/ZL3FWIB2YSI7-200.jpeg', 0);
INSERT INTO `postimage` VALUES (2, 16001001, 'posts/16001001/3KDVE5ISKJ94-640.jpeg', 'posts/16001001/H1HWYM3TLUAE-200.jpeg', 1);
INSERT INTO `postimage` VALUES (3, 16001001, 'posts/16001001/HTDIPXNY5GEC-640.jpeg', 'posts/16001001/3WIJX9SGIRL6-200.jpeg', 0);
INSERT INTO `postimage` VALUES (4, 16001001, 'posts/16001001/ZCYIMK7ZP5XB-640.jpeg', 'posts/16001001/ZB8WBSMU8X7K-200.jpeg', 0);
INSERT INTO `postimage` VALUES (5, 16001001, 'posts/16001001/KES1XFDPPJXL-640.jpeg', 'posts/16001001/Q8Q1W8PS331L-200.jpeg', 0);
INSERT INTO `postimage` VALUES (6, 16001002, 'posts/16001002/3P69CK6ICCIX-640.jpeg', 'posts/16001002/UEJBQ7UNUC17-200.jpeg', 1);
INSERT INTO `postimage` VALUES (7, 16001002, 'posts/16001002/QF79JPEVQSD4-640.jpeg', 'posts/16001002/KVLCT4H518FD-200.jpeg', 0);
INSERT INTO `postimage` VALUES (8, 16001002, 'posts/16001002/JMS7IZWS3792-640.jpeg', 'posts/16001002/2XPMHPXSJ3Q6-200.jpeg', 0);
INSERT INTO `postimage` VALUES (9, 16001003, 'posts/16001003/3DNJ4BYEF65X-640.png', 'posts/16001003/DZ1ZB8FK7JBU-200.png', 1);
INSERT INTO `postimage` VALUES (10, 16001006, 'posts/16001006/PBW9QU6CIG3J-640.jpeg', 'posts/16001006/Q5EVL2C5ZLAQ-200.jpeg', 1);
INSERT INTO `postimage` VALUES (11, 16001006, 'posts/16001006/H32CUTZZJRBF-640.png', 'posts/16001006/N7AX824XYCXJ-200.png', 0);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=5000025 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (5000024, 'Bobby Chao', 'bobbylkchao@gmail.com', 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10216636384462559&height=50&width=50&ext=1640453343&hash=AeRS1zyWniyEyuutJSs', NULL, 'google', '107118327150282520838', NULL, 1, 1637534230, NULL);
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
