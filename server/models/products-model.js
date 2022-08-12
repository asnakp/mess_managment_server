
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

    
        //This fucntion insert Products details.
    funSaveProducts: InsertProductsDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              console.log("sadjhxb ---",obj)
                const newObject = {
                    pkIntProductsId:ObjectID(),
                    name:obj.name,
                    logoUrl:obj.logoUrl,
                    category:obj.category,
                    subcategory:obj.subcategory,
                    price:obj.price,
                    description:obj.description,
                    status:obj.status,

                    fkCategoryId: ObjectID(obj.category._id),
                    fkSubCategoryId: ObjectID(obj.subcategory._id),

                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'
                    
                };

                db.collection(config.PRODUCTS_COLLECTION).insert(newObject, (err, doc) => {
                    if (err)resolve({success: false, message: 'Products Creation Failed.', arryEmpty});
                        else if(doc && doc.ops && doc.ops.length === true) {
                    }
                    else{
                        resolve({success: true, message: 'Products saved successfully', data: [doc.ops[0]]});
                    };
                });

            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

       //This function update Products details form.
    funUpdateProducts: UpdateProductsDetails = (obj, db) => {
        console.log("funUpdateProductsDetails ---",obj)
        return new Promise((resolve, reject) => {
            try {
                  
                let intProductsId = obj.intProductsId;

                var match = {$match: {_id: ObjectID(intProductsId)}};
                db.collection(config.PRODUCTS_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {

                            name:obj.name,
                            logoUrl:obj.logoUrl,
                            category:obj.category,
                            subcategory:obj.subcategory,
                            price:obj.price,
                            description:obj.description,
                            status:obj.status,
        
                            fkCategoryId: ObjectID(obj.category._id),
                            fkSubCategoryId: ObjectID(obj.subcategory._id),
                            datLastModifiedDateTime: new Date()
                           
                        };
                        var query = {_id: ObjectID(intProductsId)};
                        db.collection(config.PRODUCTS_COLLECTION).updateOne(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Products Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Products updated successfully', data: newObject});
                            }

                        })

                    } else {
                        resolve({success: false, message: 'No Products found', data: arryEmpty});
                    }
                });
       
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },


       //This function delete details from Products form.
    funProductsDeleteDetails: DeleteProductsDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              
                let intProductsId = obj.intProductsId;
  
                var match = {$match: {_id: ObjectID(intProductsId)}};
                db.collection(config.PRODUCTS_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            datLastModifiedDateTime : new Date(),
                            strStatus: 'D',
                        };
                        var query = {_id: ObjectID(intProductsId)};
                        db.collection(config.PRODUCTS_COLLECTION).update(query, {$set: newObject}, (err) => {
                            if (err) throw err
                            
                            resolve({success: true, message: 'Products deleted successfully.', data: [newObject]});
                        })
                    } else {
                        resolve({success: false, message: 'Products not found', data: arryEmpty});
                    }
                });
          
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },
    

 


        //This function update products status details form.
    funUpdateProductsStatusDetails: UpdateProductsStatusDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                
            let intProductsId = obj. intProductsId;
            let IntLastModifiedId = obj.intLoginUserId;

            var match = {$match: {_id: ObjectID( intProductsId)}};
            db.collection(config.PRODUCTS_COLLECTION).aggregate([match]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
                        
                        productsStatus:obj.productsStatus,
                        datLastModifiedDateTime: new Date(),
                        fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                        
                    };
                    var query = {_id: ObjectID(intProductsId)};
                    db.collection(config.PRODUCTS_COLLECTION).update(query, {$set: newObject}, (err, doc) => {
                        if (err) resolve({success: false, message: 'products Update Failed.', data: arryEmpty});
                        else{
                            resolve({success: true, message: 'Products status updated successfully', data: [doc]});
                        }

                    })

                } else {
                    resolve({success: false, message: 'No products found', data: arryEmpty});
                }
            });
    
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });




},






           //This fucntion validate details from category delete form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    funProductsValidateDeleteDetails: ProductsValidateDeleteDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
          var obj = req.body;

           try {                  
            let fkIntLoginUserId = obj.intLoginUserId;
            let intProductsId =obj.intProductsId;
      
            fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ?ObjectID( fkIntLoginUserId.trim()) : null;
            intProductsId = (intProductsId && typeof intProductsId === 'string') ? ObjectID(intProductsId.trim()) : null;
            
            if (intProductsId || strActionType === 'UPDATE') { 
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
                resolve({success: false, message: 'intProductsId Invalid', data: arryEmpty});
            }
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });
    

}    

}
     




