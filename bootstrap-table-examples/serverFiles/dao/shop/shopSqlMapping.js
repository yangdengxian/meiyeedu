// dao/shopSqlMapping.js
// CRUD SQL语句
var shop = {
    insert:'INSERT INTO shop(name, tel,address) VALUES(?,?)',
    update:'update shop set name=?, tel=? ,address=? where id=?',
    delete: 'delete from shop where id=?',
    queryById: 'select * from shop where id=?',
    queryAll: 'select * from shop'
};

module.exports = shop;