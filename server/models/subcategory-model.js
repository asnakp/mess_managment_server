
const config = require('../config/config');
var strQryCount = { $group: { _id: null, count: { $sum: 1 }}};

const express = require('express');
var ObjectID = require("mongodb").ObjectID;
const router = express.Router();

var arryEmpty = [];
var upperCase = require('upper-case');

module.exports = {

    
        //This fucntion insert Subcategory details.
    funSaveSubcategory: InsertSaveSubcategoryDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
            if(obj &&  obj.category  &&  obj.category._id ){
                obj.category._id = ObjectID(obj.category._id) 
            }
              console.log("sadjhxb ---",obj)
                const newObject = {
                    pkIntSubcategoryId:ObjectID(),
                    name : obj.name,
                    logoUrl:obj.logoUrl,
                    category:obj.category,
                    fkCategoryId:ObjectID(obj.category._id),
                    fkIntCreateUserId: ObjectID(obj.intLoginUserId),
                    datCreateDateAndTime: new Date(),
                    datLastModifiedDateTime: null,
                    fkIntLastModifiedId: null,
                    strStatus: 'N'
                    
                };

                db.collection(config.SUBCATEGORY_COLLECTION).insert(newObject, (err, doc) => {
                    if (err)resolve({success: false, message: 'Booking Creation Failed.', arryEmpty});
                        else if(doc && doc.ops && doc.ops.length === true) {
                    }
                    else{
                        resolve({success: true, message: 'Subcategory saved successfully', data: [doc.ops[0]]});
                    };
                });

            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },

       //This function update subategory details form.
    funUpdateSubcategory: UpdateSubcategoryDetails = (obj, db) => {
        console.log("funUpdateSubcategoryDetails ---",obj)
        return new Promise((resolve, reject) => {
            try {
                if(obj &&  obj.category  &&  obj.category._id ){
                    obj.category._id = ObjectID(obj.category._id) 
                }
                let intSubcategoryId = obj.intSubcategoryId;

                var match = {$match: {_id: ObjectID(intSubcategoryId)}};
                db.collection(config.SUBCATEGORY_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            name : obj.name,
                            logoUrl:obj.logoUrl,
                            category:obj.category,
                            fkCategoryId:ObjectID(obj.category._id),
                            datLastModifiedDateTime: new Date()
                           
                        };
                        var query = {_id: ObjectID(intSubcategoryId)};
                        db.collection(config.SUBCATEGORY_COLLECTION).updateOne(query, {$set: newObject}, (err, doc) => {
                            if (err) resolve({success: false, message: 'Subcategory Update Failed.', data: arryEmpty});
                            else{
                                resolve({success: true, message: 'Subcategory updated successfully', data: newObject});
                            }

                        })

                    } else {
                        resolve({success: false, message: 'No subcategory found', data: arryEmpty});
                    }
                });
       
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }
        });

    },


       //This function delete details from subcategory form.
    funSubcategoryDeleteDetails: DeleteSubcategoryDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
              
                let intSubcategoryId = obj.intSubcategoryId;
  
                var match = {$match: {_id: ObjectID(intSubcategoryId)}};
                db.collection(config.SUBCATEGORY_COLLECTION).aggregate([match, strQryCount]).toArray().then((response) => {
                    if (response.length) {
                        const newObject = {
                            datLastModifiedDateTime : new Date(),
                            strStatus: 'D',
                        };
                        var query = {_id: ObjectID(intSubcategoryId)};
                        db.collection(config.SUBCATEGORY_COLLECTION).update(query, {$set: newObject}, (err) => {
                            if (err) throw err
                            
                            resolve({success: true, message: 'Subcategory deleted successfully.', data: [newObject]});
                        })
                    } else {
                        resolve({success: false, message: 'Subcategory not found', data: arryEmpty});
                    }
                });
          
            } catch (e) {
                throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
            }

        });
    },
    

 


        //This function update category status details form.
    funUpdateSubcategoryStatusDetails: UpdateSubcategoryStatusDetails = (obj, db) => {
        return new Promise((resolve, reject) => {
            try {
                
            let intSubcategoryId = obj.intSubcategoryId;
            let IntLastModifiedId = obj.intLoginUserId;

            var match = {$match: {_id: ObjectID(intSubcategoryId)}};
            db.collection(config.SUBCATEGORY_COLLECTION).aggregate([match]).toArray().then((response) => {
                if (response.length) {
                    const newObject = {
                        
                        subcategoryStatus:obj.subcategoryStatus,
                        datLastModifiedDateTime: new Date(),
                        fkIntLastModifiedId: ObjectID(IntLastModifiedId)
                        
                    };
                    var query = {_id: ObjectID(intSubcategoryId)};
                    db.collection(config.SUBCATEGORY_COLLECTION).update(query, {$set: newObject}, (err, doc) => {
                        if (err) resolve({success: false, message: 'Subcategory Update Failed.', data: arryEmpty});
                        else{
                            resolve({success: true, message: 'subcategory status updated successfully', data: [doc]});
                        }

                    })

                } else {
                    resolve({success: false, message: 'No Subcategory found', data: arryEmpty});
                }
            });
    
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });




},






           //This fucntion validate details from subcategory delete form.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    funSubcategoryValidateDeleteDetails: SubcategoryValidateDeleteDetails = (strActionType, req, db) => {
        return new Promise((resolve, reject) => {
          var obj = req.body;

           try {                  
            let fkIntLoginUserId = obj.intLoginUserId;
            let intSubcategoryId =obj.intSubcategoryId;
      
            fkIntLoginUserId = (fkIntLoginUserId && typeof fkIntLoginUserId === 'string') ?ObjectID( fkIntLoginUserId.trim()) : null;
            intSubcategoryId = (intSubcategoryId && typeof intSubcategoryId === 'string') ? ObjectID(intSubcategoryId.trim()) : null;
            
            if (intSubcategoryId || strActionType === 'UPDATE') { 
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
                resolve({success: false, message: 'IntSubcategoryId Invalid', data: arryEmpty});
            }
        } catch (e) {
            throw resolve({success: false, message: 'System ' + e, data: arryEmpty});
        }
    });
    

}    

}
     




