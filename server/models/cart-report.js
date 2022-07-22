
const config = require('../config/config');
const express = require('express');

var arryEmpty = [];
var ObjectID = require("mongodb").ObjectID;
module.exports = {

  
  
        //This function listing by booking id form.
    funGetByUserIdDetails: GetByCategoryDetails=(obj,db)=> {
            return new Promise((resolve, reject) => {
                try{
                    var arrayAllObjData =[];
                    var query= { fkIntCreateUserId: ObjectID(obj.intUserId) , strStatus: "N" }
                    
                    var intSkipCount =0;
                    var intPageLimit =0;
                    if(obj.intSkipCount)
                        intSkipCount = parseInt(obj.intSkipCount);
                    if(obj.intPageLimit)
                        intPageLimit = parseInt(obj.intPageLimit);
                        
                    var Project = { $project : {
                        _id:"$_id",
                        product:"$product",
                        name:"$name",
                        price:"$price",
                        logoUrl:"$logoUrl",
                    
                    }};
        
                    db.collection(config.CART_COLLECTION).find(query).count()
                        .then((totalPageCount) => {
                            if(totalPageCount){
                                if(!intPageLimit)
                                    intPageLimit =parseInt(totalPageCount);
                                db.collection(config.CART_COLLECTION).aggregate([{$match:query},
                                    {$sort:{date:-1}},
                                    { "$skip": intSkipCount }, { "$limit": intPageLimit },
                                    Project
                                ]).toArray( (err,doc) => {
                                    if (err) throw err;
                                    if(doc){
                                        var objTotal ={intTotalCount :totalPageCount};
                                        arrayAllObjData.push(doc);
                                        arrayAllObjData.push(objTotal);
                                        resolve({success: true,message: 'Successfully.', data: doc});
                                    }
            
                                });
                            } else {
                                resolve({success: false, message: ' No Data Found', data: arryEmpty});
                            }
                        })
            
                } catch (e) {
                    throw resolve( { success: false, message: 'System '+e, data: arryEmpty });
                }
            });
        
        },

}