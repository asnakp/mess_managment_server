const { Db } = require('mongodb');

module.exports = function(app, db) {
   
    require('./server/service/user')(app, db);
    require('./server/service/services')(app, db);
    require('./server/service/booking')(app, db);
    require('./server/service/category')(app, db);
    require('./server/service/subcategory')(app, db);
    require('./server/service/products')(app, db);
    require('./server/service/order')(app, db);
    
    
    


    require('./server/service/upload/upload')(app, db);

};