/*
Navicat MySQL Data Transfer

Source Server         : ydx
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : meiyeedu

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2017-01-13 00:34:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for peritem
-- ----------------------------
DROP TABLE IF EXISTS `peritem`;
CREATE TABLE `peritem` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `preferentialID` int(10) DEFAULT NULL COMMENT '外键，关联preferinfo',
  `name` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '美容类型',
  `oPrice` double(10,2) DEFAULT NULL COMMENT '原价',
  `cPrice` double(10,2) DEFAULT NULL COMMENT '现价',
  `count` int(10) DEFAULT NULL COMMENT '数量',
  `createDate` bigint(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='优惠内容表';

-- ----------------------------
-- Records of peritem
-- ----------------------------
INSERT INTO `peritem` VALUES ('1', '1', '线条眉', '880.00', '388.00', '20', null);
INSERT INTO `peritem` VALUES ('2', '1', '烟霏眉', '1280.00', '688.00', '20', null);
INSERT INTO `peritem` VALUES ('3', '1', '眉眼套餐', '2160.00', '880.00', '20', null);
INSERT INTO `peritem` VALUES ('4', '1', '面部刮痧', '168.00', '38.00', '20', null);
INSERT INTO `peritem` VALUES ('5', '1', '肩部调理', '198.00', '68.00', '20', null);

-- ----------------------------
-- Table structure for personyy
-- ----------------------------
DROP TABLE IF EXISTS `personyy`;
CREATE TABLE `personyy` (
  `date` bigint(100) DEFAULT NULL COMMENT '预约时间',
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '预约人',
  `preItemName` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '预约类型',
  `preItemPrice` double(10,2) DEFAULT NULL COMMENT '预约价格',
  `userPhone` varchar(20) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '预约联系方式',
  `isUse` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT '0' COMMENT '是否已用',
  `preItemID` int(10) DEFAULT NULL COMMENT '预约号,与优惠信息表关联',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='个人预约信息';

-- ----------------------------
-- Records of personyy
-- ----------------------------
INSERT INTO `personyy` VALUES ('1484064000000', '26', '杨登贤', '肩部调理', '68.00', '18792874121', '0', '5');
INSERT INTO `personyy` VALUES ('1484064000000', '27', '杨登贤', '面部刮痧', '38.00', '18792874121', '0', '4');
INSERT INTO `personyy` VALUES ('1484064000000', '28', '张三', '线条眉', '388.00', '15911029237', '0', '1');
INSERT INTO `personyy` VALUES ('1484064000000', '29', '张三', '烟霏眉', '688.00', '15911029237', '0', '2');
INSERT INTO `personyy` VALUES ('1484150400000', '30', '叶健勇', '线条眉', '388.00', '15611029237', '0', '1');
INSERT INTO `personyy` VALUES ('1484150400000', '31', '周磊', '烟霏眉', '688.00', '17723456789', '0', '2');
INSERT INTO `personyy` VALUES ('1484150400000', '32', '测试', '眉眼套餐', '880.00', '15911029273', '0', '3');
INSERT INTO `personyy` VALUES ('1484150400000', '33', '叶剑英', '面部刮痧', '38.00', '15611029237', '0', '4');
INSERT INTO `personyy` VALUES ('1484150400000', '34', '李奇', '肩部调理', '68.00', '18792874121', '0', '5');

-- ----------------------------
-- Table structure for preferinfo
-- ----------------------------
DROP TABLE IF EXISTS `preferinfo`;
CREATE TABLE `preferinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `shopID` int(10) DEFAULT NULL COMMENT '优惠店铺',
  `timeBegin` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '优惠开始时间',
  `timeEnd` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '优惠结束时间',
  `timeSection` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '优惠日（周内、周末）',
  `date` bigint(100) DEFAULT NULL COMMENT '优惠日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='优惠区间时刻表';

-- ----------------------------
-- Records of preferinfo
-- ----------------------------
INSERT INTO `preferinfo` VALUES ('1', '1', '8', '18', 'other', null);

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '店名',
  `tel` varchar(20) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '联系方式',
  `address` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '地址',
  `date` bigint(100) DEFAULT NULL,
  `description` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '店介绍',
  `showFreeTime` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '是否优惠',
  `showPackage` varchar(200) COLLATE utf8_general_mysql500_ci DEFAULT NULL,
  `type` varchar(10) COLLATE utf8_general_mysql500_ci DEFAULT NULL COMMENT '店铺类型',
  `userID` int(10) DEFAULT NULL COMMENT '用户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='优惠店铺表';

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '诺颜医疗美容工作室', '15911132988', '山西 运城', null, null, null, null, null, null);
INSERT INTO `shop` VALUES ('2', '美妆工作室半永久眉眼唇', '13771927415', '苏州市吴中商城小商品20-10伊炫纹绣', null, null, null, null, null, null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL,
  `realname` varchar(255) COLLATE utf8_general_mysql500_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin', '管理员');
INSERT INTO `user` VALUES ('2', 'ydx', 'ydx', '杨登贤');

-- ----------------------------
-- View structure for checkhassalednum_v
-- ----------------------------
DROP VIEW IF EXISTS `checkhassalednum_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dlwy`@`localhost` SQL SECURITY DEFINER  VIEW `checkhassalednum_v` AS SELECT
	b.shopID,
	a.preferentialID,
	a.id AS peritemID,
	a.date,
	a.isUse,
	a.preItemName,
	a.preItemPrice,
	a.username,
	a.userPhone
FROM
	personinfo_v a,
	preferinfo b
WHERE
	a.preferentialID = b.id ;

-- ----------------------------
-- View structure for personinfo_v
-- ----------------------------
DROP VIEW IF EXISTS `personinfo_v`;
CREATE ALGORITHM=UNDEFINED DEFINER=`dlwy`@`localhost` SQL SECURITY DEFINER  VIEW `personinfo_v` AS SELECT
			b.preferentialID,
			b.id,
			a.date,
			a.isUse,
			a.preItemName,
			a.preItemPrice,
			a.username,
			a.userPhone
		FROM
			personyy a,
			peritem b
		WHERE
			a.preItemID = b.id ;
