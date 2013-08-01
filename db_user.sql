DROP database IF EXISTS db_user;
CREATE database db_user;
USE database db_user;
-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` char(30) NOT NULL,
  `u_age` int(11) DEFAULT NULL,
  `u_sex` int(11) DEFAULT NULL,
  `u_addr` char(100) NOT NULL,
  PRIMARY KEY (`u_id`),
  KEY `user_name` (`u_name`),
  KEY `user_age` (`u_age`),
  KEY `user_sex` (`u_sex`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Selina', '28', '2', 'Hainan Island');
INSERT INTO `user` VALUES ('2', 'Andy', '20', '1', 'China Dalian DLMU');
INSERT INTO `user` VALUES ('3', 'Andy', '29', '2', 'Tokyo Japan');
INSERT INTO `user` VALUES ('4', 'Blue', '18', '1', 'Nagoya　Japan');
INSERT INTO `user` VALUES ('5', 'Angila', '29', '2', 'JS china');
INSERT INTO `user` VALUES ('6', 'Candy', '29', '2', 'South Korea');
INSERT INTO `user` VALUES ('7', 'John', '18', '1', 'USA LosAn');
INSERT INTO `user` VALUES ('8', 'Susy', '29', '2', 'USA New York');
INSERT INTO `user` VALUES ('9', 'Mandy', '29', '2', 'USA New York');
INSERT INTO `user` VALUES ('10', 'Andy', '29', '2', 'USA Seatu');
INSERT INTO `user` VALUES ('11', 'Blue', '18', '1', 'USA North');
INSERT INTO `user` VALUES ('12', 'Angila', '29', '2', 'Britain');
INSERT INTO `user` VALUES ('13', 'Candy', '29', '2', 'Germany');
INSERT INTO `user` VALUES ('14', 'John', '18', '1', 'Greece');
INSERT INTO `user` VALUES ('15', 'Susy', '29', '2', 'France');
INSERT INTO `user` VALUES ('16', 'Mandy', '29', '2', 'Italy');
INSERT INTO `user` VALUES ('17', 'Andy', '20', '2', 'China Dalian DLMU');
INSERT INTO `user` VALUES ('18', 'Blue', '19', '1', 'China Beijing');
INSERT INTO `user` VALUES ('19', 'Angila', '24', '2', 'USA LosAn');
INSERT INTO `user` VALUES ('20', 'Candy', '30', '2', 'Chian Shanghai');
INSERT INTO `user` VALUES ('21', 'John', '25', '1', 'USA New York');
INSERT INTO `user` VALUES ('22', 'Susy', '23', '2', 'China Harbin');
INSERT INTO `user` VALUES ('23', 'Mandy', '26', '2', 'USA Chicago');
