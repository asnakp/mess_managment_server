
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

    
        //This fucntion insert Category details.
    funSaveCategory: InsertCategoryDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              console.log("sadjhxb ---",obj)
                const newObject = {
                    pkIntCategoryId:ObjectID(),
                    name:obj.name,
                    logoUrl:obj.logoUrl,
                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'
                };

                db.collection(config.CATEGORY_COLLECTION).insert(newObject, (err, doc) => {
                    if (err)resolve({success: false, message: 'Booking Creation Failed.', arryEmpty});
                        else if(doc  && doc.ops && doc.ops.length === true) {
                    }
                    else{
                        resolve({success: true, message: 'Category saved successfully', data: [doc.ops[0]]});
                    };
                });

            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

       //This function update Category details form.
    funUpdateCategory: UpdateCategoryDetails = (obj, db) => {
        console.log("funUpdateCategoryDetails ---",obj)
        return new Promise((resolve, reject) => {
            try {
                  
                let intCategoryId = obj.intCategoryId;

                var match = {$match: {_id: ObjectID(intCategoryId)}};
                db.collection(config.CATEGORY_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {

                            name:obj.name,
                            logoUrl:obj.logoUrl,
                            datLastModifiedDateTime: new Date()
                           
                        };
                        var query = {_id: ObjectID(intCategoryId)};
                        db.collection(config.CATEGORY_COLLECTION).updateOne(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Category Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Category updated successfully', data: newObject});
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


       //This function delete details from category form.
    funCategoryDeleteDetails: DeleteCategoryDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              
                let intCategoryId = obj.intCategtoryId;
  
                var match = {$match: {_id: ObjectID(intCategoryId)}};
                db.collection(config.CATEGORY_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            datLastModifiedDateTime : new Date(),
                            strStatus: 'D',
                        };
                        var query = {_id: ObjectID(intCategoryId)};
                        db.collection(config.CATEGORY_COLLECTION).update(query, {$set: newObject}, (err) => {
                            if (err) throw err
                            
                            resolve({success: true, message: 'Category deleted successfully.', data: [newObject]});
                        })
                    } else {
                        resolve({success: false, message: 'Category not found', data: arryEmpty});
                    }
                });
          
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },
    

 


        //This function update category status details form.
    funUpdateCategoryStatusDetails: UpdateCategoryStatusDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                
            let intCategoryId = obj.intCategoryId;
            let IntLastModifiedId = obj.intLoginUserId;

            var match = {$match: {_id: ObjectID(intCategoryId)}};
            db.collection(config.CATEGORY_COLLECTION).aggregate([match]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
                        
                        categoryStatus:obj.categoryStatus,
                        datLastModifiedDateTime: new Date(),
                        fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                        
                    };
                    var query = {_id: ObjectID(intCategoryId)};
                    db.collection(config.CATEGORY_COLLECTION).update(query, {$set: newObject}, (err, doc) => {
                        if (err) resolve({success: false, message: 'Category Update Failed.', data: arryEmpty});
                        else{
                            resolve({success: true, message: 'Category status updated successfully', data: [doc]});
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






           //This fucntion validate details from category delete form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    funCategoryValidateDeleteDetails: CategoryValidateDeleteDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
          var obj = req.body;

           try {                  
            let fkIntLoginUserId = obj.intLoginUserId;
            let intCategoryId =obj.intCategoryId;
      
            fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ?ObjectID( fkIntLoginUserId.trim()) : null;
            intCategoryId = (intCategoryId && typeof intCategoryId === 'string') ? ObjectID(intCategoryId.trim()) : null;
            
            if (intCategoryId || strActionType === 'UPDATE') { 
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
                resolve({success: false, message: 'IntCategoryId Invalid', data: arryEmpty});
            }
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });
    

}    

}
     




