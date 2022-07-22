
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

 
        //This fucntion insert cart details.
    funSaveCartDetails: InsertCartDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              console.log("sadjhxb ---",obj)
                const newObject = {
                    pkIntCartId:ObjectID(),
                    product:obj.product,

                    price:obj.product.price,
                    name:obj.product.name,
                    logoUrl:obj.product.logoUrl,

                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'
                    
                };

                db.collection(config.CART_COLLECTION).insert(newObject, (err, doc) => {
                    if (err)resolve({success: false, message: 'Cart Creation Failed.', arryEmpty});
                        else if(doc && doc.ops && doc.ops.length === true) {
                    }
                    else{
                        resolve({success: true, message: 'Cart saved successfully', data: [doc.ops[0]]});
                    };
                });

            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

       //This function update booking details form.
    funUpdateBookingDetails: UpdateBookingDetails = (obj, db) => {
        console.log("funUpdateBookingDetails ---",obj)
        return new Promise((resolve, reject) => {
            try {
                  
                let intBookingId = obj.intBookingId;
                let IntLastModifiedId = obj.intLoginUserId;

                var match = {$match: {_id: ObjectID(intBookingId)}};
                db.collection(config.BOOKING_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                           
                            time:obj.time,
                            date: obj.date,
                            address:obj.address,
                            fkIntServiceId: ObjectID(obj.intServiceId),
                            datLastModifiedDateTime: new Date(),
                            fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                           
                        };
                        var query = {_id: ObjectID(intBookingId)};
                        db.collection(config.BOOKING_COLLECTION).updateOne(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Booking Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Booking updated successfully', data: [doc]});
                            }

                        })

                    } else {
                        resolve({success: false, message: 'No category found', data: arryEmpty});
                    }
                });
       
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

        //This function update booking status details form.
    funUpdateBookingStatusDetails: UpdateBookingStatusDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                    
                let intBookingId = obj.intBookingId;
                let IntLastModifiedId = obj.intLoginUserId;

                var match = {$match: {_id: ObjectID(intBookingId)}};
                db.collection(config.BOOKING_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            
                            bookingStatus:obj.bookingStatus,
                            datLastModifiedDateTime: new Date(),
                            fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                            
                        };
                        var query = {_id: ObjectID(intBookingId)};
                        db.collection(config.BOOKING_COLLECTION).update(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Booking Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Booking status updated successfully', data: [doc]});
                            }

                        })

                    } else {
                        resolve({success: false, message: 'No booking found', data: arryEmpty});
                    }
                });
        
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

        //This fucntion validate details from booking delete form.
    funBookingValidateDeleteDetails: BookingValidateDeleteDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
            var obj = req.body;

            try {                  
                let fkIntLoginUserId = obj.intLoginUserId;
                let intBookingId =obj.intBookingId;
          
                fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ?ObjectID( fkIntLoginUserId.trim()) : null;
                intBookingId = (intBookingId && typeof intBookingId === 'string') ? ObjectID(intBookingId.trim()) : null;
                
                if (intBookingId || strActionType === 'UPDATE') { 
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
                    resolve({success: false, message: 'IntBookingId Invalid', data: arryEmpty});
                }
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });
    },

       //This function delete details from booking form.
    funDeleteBookingDetails: DeleteBookingDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              
                let intBookingId = obj.intBookingId;
                let IntLastModifiedId = obj.intLoginUserId;
  
                var match = {$match: {_id: ObjectID(intBookingId)}};
                db.collection(config.BOOKING_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            datLastModifiedDateTime : new Date(),
                            fkIntLastModifiedId: ObjectID(IntLastModifiedId),
                            strStatus: 'D',
                        };
                        var query = {_id: ObjectID(intBookingId)};
                        db.collection(config.BOOKING_COLLECTION).update(query, {$set: newObject}, (err) => {
                            if (err) throw err
                            
                            resolve({success: true, message: 'Booking deleted successfully.', data: [newObject]});
                        })
                    } else {
                        resolve({success: false, message: 'Booking not found', data: arryEmpty});
                    }
                });
          
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },
    

 
}


