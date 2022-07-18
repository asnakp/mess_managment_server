module.exports = (app, db) => {

    const express = require('express');
    var ObjectID = require("mongodb").ObjectID;
    const router = express.Router();
    /* const csv = require('fast-csv');
    const fs = require('fs');*/
    const config = require('../config/config');
    const common = require('../globel/common');
    const MODELS = require('../models/subcategory-model');
    const REPORT  = require('../models/subcategory-report');
    const arryEmpty =[];

    /*
    TODO:This api use Save subcategory details in Data Base
    @Function: Save subcategory details Data
    */
    app.post('/api/subcategory/SaveNewSubcategory' ,(req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
            if(common.isEmptyObject(obj)) {    
                res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
            } else {
                MODELS.funSaveSubcategory(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    } else {
                        res.status(200).json(result)
                    }
                });
            }
    
        } catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }
 
    });

     /*
    TODO:This api use update subcategory details in Data Base.
    @Function:update api for subcategory.
    */
    app.post('/api/subcategory/UpdateSubcategory', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                MODELS.funUpdateSubcategory(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    } else {
                        res.status(200).json(result)
                    }
                });
            }
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }

    });
    app.post('/api/subcategory/DeleteSubcategoryDetails', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                        MODELS.funSubcategoryDeleteDetails(obj,db).then(( result )=>{
                            if(result && result.success === true) {
                                res.status(200).json(result)
                            }
                            else {
                                res.status(200).json(result)
                            }
                        });
                
            }
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }

    });


    app.post('/api/subcategory/UpdateSubcategoryStatusDetails', (req,res) => {
        try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
                MODELS.funUpdateSubcategoryStatusDetails(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    } else {
                        res.status(200).json(result)
                    }
                });
        }
    }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
    }
 });


    app.post('/api/subcategory/DeleteSubcategoryDetails', (req,res) => {
        try{
            var obj = req.body;
             var strActionType ="UPDATE";
         if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
         } else {
            MODELS.funSubcategoryValidateDeleteDetails(strActionType,req,db).then(( result )=>{
                if(result && result.success === true) {
                    MODELS.funDeleteSubcategoryDetails(obj,db).then(( result )=>{
                        if(result && result.success === true) {
                            res.status(200).json(result)
                        }
                        else {
                            res.status(200).json(result)
                        }
                    });
              } else {
                    res.status(200).json(result)
                }
            });
         }
        }catch (e) {
        console.log("Error",e);
        res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
         
         

    
    
    
}   
});


  /*
    TODO:This api use List category details in Data Base
    @Function: Listing category details Data
    */
    app.post('/api/subcategory/getSubcategoryDetails',(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetAllSubcategoryDetails(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    }else {
                        res.status(200).json(result)
                    }
                });
            }
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }
    });

    app.post('/api/subcategory/getBySubcategoryIdDetails',(req,res) => {
        console.log("getBySubcategoryIdDetails ---",req.body)
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetBySubcategoryIdDetails(obj,db).then(( result )=>{
                    if(result && result.success === true) {
                        res.status(200).json(result)
                    }else {
                        res.status(200).json(result)
                    }
                });
            }
        }catch (e) {
            console.log("Error",e);
            res.status(500).json({success: false, message: "Error:"+e, data:arryEmpty});
        }
    });

} 










