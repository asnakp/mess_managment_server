module.exports = (app, db) => {

    const express = require('express');
    var ObjectID = require("mongodb").ObjectID;
    const router = express.Router();
    /* const csv = require('fast-csv');
    const fs = require('fs');*/
    const config = require('../config/config');
    const common = require('../globel/common');
    const MODELS = require('../models/order-model');
    const REPORT  = require('../models/order-report');
    const arryEmpty =[];

    /*
    TODO:This api use Save products details in Data Base
    @Function: Save products details Data
    */
    app.post('/api/order/SaveNewOrder' ,(req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
            if(common.isEmptyObject(obj)) {    
                res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
            } else {
                MODELS.funSaveOrder(obj,db).then(( result )=>{
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
    app.post('/api/order/UpdateOrder', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                MODELS.funUpdateOrder(obj,db).then(( result )=>{
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

    app.post('/api/order/DeleteOrderDetails', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                        MODELS.funOrderDeleteDetails(obj,db).then(( result )=>{
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


    app.post('/api/order/UpdateOrderStatusDetails', (req,res) => {
        try{
        var obj = req.body;
        var strActionType ="UPDATE";
        if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
        } else {
                MODELS.funUpdateOrderStatusDetails(obj,db).then(( result )=>{
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


    app.post('/api/order/DeleteOrderDetails', (req,res) => {
        try{
            var obj = req.body;
             var strActionType ="UPDATE";
         if(!obj) {
            res.json({success: false, message: 'Parameter missing',data:arryEmpty});
         } else {
            MODELS.funOrderValidateDeleteDetails(strActionType,req,db).then(( result )=>{
                if(result && result.success === true) {
                    MODELS.funDeleteOrderDetails(obj,db).then(( result )=>{
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
    app.post('/api/getOrderDetails',(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetAllOrderDetails(obj,db).then(( result )=>{
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

    app.post('/api/order/getByOrderIdDetails',(req,res) => {
        try{
            var obj = req.body
            console.log("here data",obj)
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                REPORT.funGetByOrderIdDetails(obj,db).then(( result )=>{
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










