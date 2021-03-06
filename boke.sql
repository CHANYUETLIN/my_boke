/*
Navicat MySQL Data Transfer

Source Server         : Boke_connection
Source Server Version : 50731
Source Host           : localhost:3306
Source Database       : boke

Target Server Type    : MYSQL
Target Server Version : 50731
File Encoding         : 65001

Date: 2022-06-28 16:29:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bannerimg
-- ----------------------------
DROP TABLE IF EXISTS `bannerimg`;
CREATE TABLE `bannerimg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dateTime` varchar(255) DEFAULT NULL,
  `bShow` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bannerimg
-- ----------------------------
INSERT INTO `bannerimg` VALUES ('2', 'http://localhost:8888/publicimagesyp_j0auaX4IOIIplP7aUKgCa.png', 'logo.png', null, 'false');
INSERT INTO `bannerimg` VALUES ('3', 'http://localhost:8888/publicimagesjLMptN0-wPHBuJISYONAQyqu.png', 'touxiang.png', null, 'false');
INSERT INTO `bannerimg` VALUES ('4', 'http://localhost:8888/publicimages\0mTnPeLlzyQVG2P1RKvYUv5I.png', 'touxiang.png', 'yyyy-06-23 16:26:00', 'false');
INSERT INTO `bannerimg` VALUES ('5', 'http://localhost:8888/publicimageslgvl4W0EIgOcZ_A0WayG_PLb.png', 'touxiang.png', '2022-06-23 16:27:34', 'false');
INSERT INTO `bannerimg` VALUES ('6', 'http://localhost:8888/publicimages4Frb9FWmiOKDduFi0KvKe5Yv.png', 'touxiang.png', '2022-06-24 09:29:53', 'false');
INSERT INTO `bannerimg` VALUES ('7', 'http://localhost:8888/4XuOzx06VRbMShN3Mtrju3xr.png', 'touxiang.png', '2022-06-24 09:31:27', 'false');
INSERT INTO `bannerimg` VALUES ('8', 'http://localhost:8888/fIOc0CGJ5Xs0y6jammyNyecS.jpg', '1.jpg', '2022-06-24 09:37:57', 'false');
INSERT INTO `bannerimg` VALUES ('9', 'http://localhost:8888/g7PUXRXnYs2_07D_K8YjPRfa.jpg', '2.jpg', '2022-06-24 09:38:03', 'false');
INSERT INTO `bannerimg` VALUES ('10', 'http://localhost:8888/XxSqqtDJEq2vLil5-3Yag48x.jpg', '4.jpg', '2022-06-24 09:38:03', 'false');
INSERT INTO `bannerimg` VALUES ('11', 'http://localhost:8888/_aj4PLHFABcH2lXQ__lY6Rl4.jpg', '5.jpg', '2022-06-24 09:38:03', 'false');
INSERT INTO `bannerimg` VALUES ('12', 'http://localhost:8888/HWoKr-p8M7B-InSuZnbI1Soo.jpg', '3.jpg', '2022-06-24 09:38:03', 'false');
INSERT INTO `bannerimg` VALUES ('13', 'http://localhost:8888/gXMY9i-ULPlxANFYg10MYbM2.jpg', '2.jpg', '2022-06-24 09:41:28', 'true');
INSERT INTO `bannerimg` VALUES ('14', 'http://localhost:8888/rSe7k95sysXfqHfNtNYHZ39W.jpg', '3.jpg', '2022-06-24 09:41:28', 'true');
INSERT INTO `bannerimg` VALUES ('15', 'http://localhost:8888/vZ5xsMldFGxixlbyxN3igS67.jpg', '1.jpg', '2022-06-24 09:41:28', 'true');
INSERT INTO `bannerimg` VALUES ('16', 'http://localhost:8888/WBSpXXgqGquQOhdqbJg85iAm.jpg', '4.jpg', '2022-06-24 09:41:28', 'true');
INSERT INTO `bannerimg` VALUES ('17', 'http://localhost:8888/U-RPQNKtdyGbZ_Qvy0sM05N8.jpg', '5.jpg', '2022-06-24 09:41:28', 'true');
INSERT INTO `bannerimg` VALUES ('18', 'http://localhost:8888/QEFvtS8cj4kRKUA7HwG1OWwD.png', 'touxiang.png', '2022-06-24 09:44:05', 'true');

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `headimg` varchar(255) DEFAULT NULL COMMENT '????????????',
  `updateTime` datetime DEFAULT NULL COMMENT '????????????????????????',
  `coverimg` varchar(255) DEFAULT NULL COMMENT '????????????',
  `introduction` varchar(255) DEFAULT NULL COMMENT '??????',
  `views` varchar(255) DEFAULT NULL COMMENT '?????????',
  `likes` varchar(255) DEFAULT NULL COMMENT '?????????',
  `types` varchar(255) DEFAULT NULL COMMENT '??????tag ???key???',
  `title` varchar(255) DEFAULT NULL COMMENT '??????',
  `contain` text CHARACTER SET utf8mb4 COMMENT '????????????',
  `bShow` varchar(255) DEFAULT NULL COMMENT '???????????????',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of card
-- ----------------------------
INSERT INTO `card` VALUES ('2', 'chanyuetlin', 'http://localhost:8888/Eau_GYB1FzpSf_LB0xjsHfeL.png', '2022-06-27 00:00:00', 'http://localhost:8888/vZ5xsMldFGxixlbyxN3igS67.jpg', '??????', '0', '0', '0', '??????1', '<p>??????1???</p>\n', 'true');
INSERT INTO `card` VALUES ('3', 'chanyuetlin', 'http://localhost:8888/Eau_GYB1FzpSf_LB0xjsHfeL.png', '2022-06-27 00:00:00', 'undefined', 'undefined', '0', '0', '0', '????????????1', '<p>?????????????????????<br />\n![touxiang.png]([object Object])</p>\n', 'true');
INSERT INTO `card` VALUES ('4', 'chanyuetlin', 'http://localhost:8888/Eau_GYB1FzpSf_LB0xjsHfeL.png', '2022-06-28 00:00:00', 'http://localhost:8888/vEyapC4kTzjexzObFwJi9yhl.png', 'undefined', '0', '0', '0', '????????????1', '<p>???????????????????????????<br />\n<img src=\"http://localhost:8888/vEyapC4kTzjexzObFwJi9yhl.png\" alt=\"touxiang.png\" /></p>\n', 'true');
INSERT INTO `card` VALUES ('5', 'chanyuetlin', 'http://localhost:8888/Eau_GYB1FzpSf_LB0xjsHfeL.png', '2022-06-28 00:00:00', 'http://localhost:8888/vZ5xsMldFGxixlbyxN3igS67.jpg', '????????????2', '0', '0', '0', '????????????2', '<p>?????????????????????<br />\n????????????<br />\n<img src=\"http://localhost:8888/ILqktN24NMLRll-yAqnPZzn8.png\" alt=\"logo.png\" /><br />\n<strong>?????????</strong><br />\n<img src=\"http://localhost:8888/URbU6VdZAgK0pm5FSvMog2hr.png\" alt=\"banner01.png\" /></p>\n', 'true');
INSERT INTO `card` VALUES ('6', 'chanyuetlin', 'http://localhost:8888/Eau_GYB1FzpSf_LB0xjsHfeL.png', '2022-06-28 00:00:00', 'http://localhost:8888/vZ5xsMldFGxixlbyxN3igS67.jpg', '??????????????????', '0', '0', '0', '????????????3', '<p>????????????<br />\n<img src=\"http://localhost:8888/9DWvA1DkJxMpmApH4dcnOQzG.png\" alt=\"banner01.png\" /><br />\n<img src=\"http://localhost:8888/YJVN5v4PkDNuRcwUS3Zb3ikb.png\" alt=\"banner.png\" /><br />\n<img src=\"http://localhost:8888/xn8rEQVPswgO8_g9d9Z_z37S.png\" alt=\"banner03.png\" /></p>\n', 'true');

-- ----------------------------
-- Table structure for tagtable
-- ----------------------------
DROP TABLE IF EXISTS `tagtable`;
CREATE TABLE `tagtable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagName` varchar(255) DEFAULT NULL,
  `tagKey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tagtable
-- ----------------------------
INSERT INTO `tagtable` VALUES ('1', '????????????', '0');
INSERT INTO `tagtable` VALUES ('2', '????????????', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT '',
  `dechema` int(11) DEFAULT '0' COMMENT '??????????????????',
  `nickname` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `described` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1655696294973', 'chanyuetlin', '123456', '2', '??????', '1', '1095367148@qq.com', '123456789', '????????????', '', 'http://localhost:8888/Eau_GYB1FzpSf_LB0xjsHfeL.png');
