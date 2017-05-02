
var peritem = {
    insert:'INSERT INTO peritem(preferid,name,oPrice,cPrice,count) VALUES(?,?,?,?,?)',
    update:'update peritem set preferid=?, name=? ,oPrice=?,cPrice=? count=? where id=?',
    delete: 'delete from peritem where id=?',
    queryById: 'select * from peritem where id=?',
    queryAll: 'select * from peritem'
};

module.exports = peritem;