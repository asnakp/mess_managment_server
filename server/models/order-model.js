
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

    
        //This fucntion insert Order details.
    funSaveOrder: InsertOrderDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              console.log("sadjhxb ---",obj)
                const newObject = {
                    pkIntOrderId:ObjectID(),
                    name:obj.name,
                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'
                    
                };

                db.collection(config.ORDER_COLLECTION).insert(newObject, (err, doc) => {
                    if (err)resolve({success: false, message: 'Products Creation Failed.', arryEmpty});
                        else if(doc && doc.ops && doc.ops.length === true) {
                    }
                    else{
                        resolve({success: true, message: 'Order saved successfully', data: [doc.ops[0]]});
                    };
                });

            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

       //This function update Order details form.
    funUpdateOrder: UpdateOrderDetails = (obj, db) => {
        console.log("funUpdateOrderDetails ---",obj)
        return new Promise((resolve, reject) => {
            try {
                  
                let intOrderId = obj.intOrderId;

                var match = {$match: {_id: ObjectID(intOrderId)}};
                db.collection(config.ORDER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {

                            name:obj.name,
                            datLastModifiedDateTime: new Date()
                           
                        };
                        var query = {_id: ObjectID(intOrderId)};
                        db.collection(config.ORDER_COLLECTION).updateOne(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Products Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Order updated successfully', data: newObject});
                            }

                        })

                    } else {
                        resolve({success: false, message: 'No Order found', data: arryEmpty});
                    }
                });
       
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },


       //This function delete details from Order form.
    funOrderDeleteDetails: DeleteOrderDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              
                let intOrderId = obj.intOrderId;
  
                var match = {$match: {_id: ObjectID(intOrderId)}};
                db.collection(config.ORDER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            datLastModifiedDateTime : new Date(),
                            strStatus: 'D',
                        };
                        var query = {_id: ObjectID(intOrderId)};
                        db.collection(config.ORDER_COLLECTION).update(query, {$set: newObject}, (err) => {
                            if (err) throw err
                            
                            resolve({success: true, message: 'Order deleted successfully.', data: [newObject]});
                        })
                    } else {
                        resolve({success: false, message: 'Order not found', data: arryEmpty});
                    }
                });
          
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },
    

 


        //This function update order status details form.
    funUpdateOrderStatusDetails: UpdateOrderStatusDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                
            let intOrderId = obj. intOrderId;
            let IntLastModifiedId = obj.intLoginUserId;

            var match = {$match: {_id: ObjectID( intOrderId)}};
            db.collection(config.ORDER_COLLECTION).aggregate([match]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
                        
                        orderStatus:obj.orderStatus,
                        datLastModifiedDateTime: new Date(),
                        fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                        
                    };
                    var query = {_id: ObjectID(intOrderId)};
                    db.collection(config.ORDER_COLLECTION).update(query, {$set: newObject}, (err, doc) => {
                        if (err) resolve({success: false, message: 'Order Update Failed.', data: arryEmpty});
                        else{
                            resolve({success: true, message: 'Order status updated successfully', data: [doc]});
                        }

                    })

                } else {
                    resolve({success: false, message: 'No order found', data: arryEmpty});
                }
            });
    
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });




},






           //This fucntion validate details from category delete form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    funOrderValidateDeleteDetails: OrderValidateDeleteDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
          var obj = req.body;

           try {                  
            let fkIntLoginUserId = obj.intLoginUserId;
            let intOrderId =obj.intOrderId;
      
            fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ?ObjectID( fkIntLoginUserId.trim()) : null;
            intOrderId = (intOrderId && typeof intOrderId === 'string') ? ObjectID(intOrderId.trim()) : null;
            
            if (intOrderId || strActionType === 'UPDATE') { 
                if (fkIntLoginUserId) {
                    var match = {$match: {_id:ObjectID(fkIntLoginUserId)}};
                    db.collection(config.USER_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                        if(response.length){
                            resolve({
                                success: true,
                                message: 'Pass validate',
                                data: arryEmpty
                            });
                        }else{
                            resolve({success: false, message: 'User not found', data: arryEmpty});
                        }
                    });
                } else {
                    resolve({success: false, message: 'IntLoginUserId Invalid', data: arryEmpty});
                }
            } else {
                resolve({success: false, message: 'intOrderId Invalid', data: arryEmpty});
            }
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });
    

}    

}
     




