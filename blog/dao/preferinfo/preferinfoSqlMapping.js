// dao/preferinfoSqlMapping.js
// CRUD SQL语句
var preferinfo = {
    insert:'INSERT INTO preferinfo(shopID, timeBegin,timeEnd,timeSection) VALUES(?,?,?,?)',
    update:'update preferinfo set shopID=?, timeBegin=? ,timeEnd=?,timeSection=? where id=?',
    delete: 'delete from preferinfo where id=?',
    queryById: 'select * from preferinfo where id=?',
    queryAll: 'select * from preferinfo'
};

module.exports = preferinfo;