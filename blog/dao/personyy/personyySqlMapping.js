
var personyy = {
    insert:'INSERT INTO personyy(username,preItemName,preItemPrice,userPhone,isUse,date,preItemID) VALUES(?,?,?,?,?,?,?)',
    update:'update personyy set username=?, preItemName=? ,preItemPrice=?,userPhone=?, isUse=?,date=?,preItemID=? where id=?',
    delete: 'delete from personyy where id=?',
    queryById: 'select * from personyy where id=?',
    queryAll: 'select * from personyy'
};

module.exports = personyy;