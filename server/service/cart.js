module.exports = (app, db) => {

    const express = require('express');
    var ObjectID = require("mongodb").ObjectID;
    const router = express.Router();
    /* const csv = require('fast-csv');
    const fs = require('fs');*/
    const config = require('../config/config');
    const common = require('../globel/common');
    const CARTREPORT = require('../models/cart-report');
    const CARTMODELS  = require('../models/cart-model');
    const arryEmpty =[];

    /*
    TODO:This api use Save cart details in Data Base
    @Function: Save cart details Data
    */
    app.post('/api/cart/SaveNewCart',(req,res) =>  { 
        try{
             var obj = req.body;
             var strActionType ="SAVE";
             
            if(common.isEmptyObject(obj)) {    
                res.status(200).json({success: false, message: 'Params missing', data:arryEmpty});    
            } else {
                CARTMODELS.funSaveCartDetails(obj,db).then(( result )=>{
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
    TODO:This api use update booking details in Data Base.
    @Function:update api for booking.
    */
    app.post('/api/booking/UpdateBookingDetails', (req,res) => {
        try{
            var obj = req.body;
            var strActionType ="UPDATE";
            if(!obj) {
                res.json({success: false, message: 'Parameter missing',data:arryEmpty});
            } else {
                BOOKINGMODELS.funBookingValidateDetails(strActionType,req,db).then(( result )=>{
                    if(result && result.success === true) {
                        BOOKINGMODELS.funUpdateBookingDetails(obj,db).then(( result )=>{
                            if(result && result.success === true) {
                                res.status(200).json(result)
                            } else {
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
    TODO:This api use List booking details in Data Base
    @Function: Listing booking details Data
    */
    app.post('/api/cart/getCartDetails ',common.verifyToken,(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                CARTREPORT.funGetAllCartDetails(obj,db).then(( result )=>{
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

      /*
    TODO:This api use List by booking id details in Data Base
    @Function: Listing by booking id details Data
    */
    app.post('/api/booking/getByBookingIdDetails',common.verifyToken,(req,res) => {
        try{
            var obj = req.body
            if(!obj){
                res.json({success: false, message: 'Params missing',data:arryEmpty});
            } else {
                BOOKINGREPORT.funGetByBookingIdDetails(obj,db).then(( result )=>{
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