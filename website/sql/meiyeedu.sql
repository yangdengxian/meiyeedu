/*
Navicat MySQL Data Transfer

Source Server         : ydx
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : meiyeedu

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2016-12-22 21:38:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for peritem
-- ----------------------------
DROP TABLE IF EXISTS `peritem`;
CREATE TABLE `peritem` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `preferentialID` int(10) DEFAULT NULL COMMENT '外键，关联shop',
  `name` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '美容类型',
  `oPrice` double(10,2) DEFAULT NULL COMMENT '原价',
  `cPrice` double(10,2) DEFAULT NULL COMMENT '现价',
  `count` int(10) DEFAULT NULL COMMENT '数量',
  `createDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='优惠内容表';

-- ----------------------------
-- Records of peritem
-- ----------------------------

-- ----------------------------
-- Table structure for personyy
-- ----------------------------
DROP TABLE IF EXISTS `personyy`;
CREATE TABLE `personyy` (
  `date` datetime DEFAULT NULL COMMENT '预约时间',
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '预约人',
  `preItemName` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '预约类型',
  `preItemPrice` double(10,2) DEFAULT NULL COMMENT '预约价格',
  `userPhone` varchar(20) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '预约联系方式',
  `isUse` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '是否已用',
  `preItemID` int(10) DEFAULT NULL COMMENT '预约号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='个人预约信息';

-- ----------------------------
-- Records of personyy
-- ----------------------------

-- ----------------------------
-- Table structure for preferinfo
-- ----------------------------
DROP TABLE IF EXISTS `preferinfo`;
CREATE TABLE `preferinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL COMMENT '优惠日期',
  `shopID` int(10) DEFAULT NULL COMMENT '优惠店铺',
  `timeBegin` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '优惠开始时间',
  `timeEnd` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '优惠结束时间',
  `timeSection` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '优惠日（周内、周末）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='优惠区间时刻表';

-- ----------------------------
-- Records of preferinfo
-- ----------------------------

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '店名',
  `tel` varchar(20) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '联系方式',
  `address` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='优惠店铺表';

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '纯美美容', '18674808018\r\n', '湖南娄底\r\n');
