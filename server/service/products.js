module.exports = (app, db) => {

    const express = require('express');
    var ObjectID = require("mongodb").ObjectID;
    const router = express.Router();
    /* const csv = require('fast-csv');
    const fs = require('fs');*/
    const config = require('../config/config');
    const common = require('../globel/common');
    const MODELS = require('../models/products-model');
    const REPORT  = require('../models/products-report');
    const arryEmpty =[];

    /*
    TODO:This api use Save products details in Data Base
    @Function: Save products details Data
    */
    app.post('/api/products/SaveNewProducts' ,(req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
            if(common.isEmptyObject(obj)) {    
                res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
            } else {
                MODELS.funSaveProducts(obj,db).then(( result )=>{
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
    TODO:This api use update products details in Data Base.
    @Function:update api for products.
    */
    app.post('/api/products/UpdateProducts', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                MODELS.funUpdateProducts(obj,db).then(( result )=>{
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

    app.post('/api/products/DeleteProductsDetails', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                        MODELS.funProductsDeleteDetails(obj,db).then(( result )=>{
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


    app.post('/api/products/UpdateProductsStatusDetails', (req,res) => {
        try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
                MODELS.funUpdateProductsStatusDetails(obj,db).then(( result )=>{
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


    app.post('/api/products/DeleteProductsDetails', (req,res) => {
        try{
            var obj = req.body;
             var strActionType ="UPDATE";
         if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
         } else {
            MODELS.funProductsValidateDeleteDetails(strActionType,req,db).then(( result )=>{
                if(result && result.success === true) {
                    MODELS.funDeleteProductsDetails(obj,db).then(( result )=>{
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
    TODO:This api use List products details in Data Base
    @Function: Listing products details Data
    */
    app.post('/api/getProductsDetails',(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetAllProductsDetails(obj,db).then(( result )=>{
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

    app.post('/api/products/getByProductsIdDetails',(req,res) => {
        try{
            var obj = req.body
            console.log("here data",obj)
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetByProductsIdDetails(obj,db).then(( result )=>{
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


    app.post('/api/products/getByCategoryId',(req,res) => {
        try{
            var obj = req.body
            console.log("here data",obj)
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetByCategoryId(obj,db).then(( result )=>{
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

    
    app.post('/api/products/getByCategoryView',(req,res) => {
        try{
            var obj = req.body
            console.log("here data",obj)
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetByCategoryView(obj,db).then(( result )=>{
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










