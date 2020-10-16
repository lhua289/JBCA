'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');
var axios = require('axios');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    // logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    // logData(req);
    res.send(200, 'Save');

};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
    var keyValue = '8509908153357152672'
    console.log("=======decoded-KEYVALUE========", keyValue);
    // console.log('senderName : ' + senderName);
    // axios({
    //     method: 'post',
    //     url: 'https://openapi.zalo.me/v2.0/oa/message?access_token=yNtFBRaj1c7wTCeYiom7OV1yoIcpCdyui63XTwzXLrNcSzr_sqeIFCbRhNJLTpbsa4AjGgzz7toe99GmZGqY1ujQfWkjR14MXKsXMOrREbcB3Pn7mZmZOkCrh5_9B09KydMdV-ud6LFQDB5pc0igIjmIeWATH6iFsalv1ln0G0-zQDeXWtbsCAGgmZw1Cbabb6RTBhP4Q1QFGzLUbqvk7OL5yGkjVpukcM-pOev5FbABVUzbebLRNfnnucYrQ4v6gqFURR9yPaRwJ-uEnKPL6iHV_p65JZfxS63yUh8p060',
    //     data: {
    //         "recipient": {
    //           "user_id": keyValue
    //         },
    //         "message":{
    //           "text":"Chào mừng bạn đến với keyValue"
    //         }
    //       }
    //   });

    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {
       
        
        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            var decodedArgs1 = decoded.outArguments[0];
            // var decodedArgs2 = decoded.inArguments[0].contact.key;
            // logData(req);
            // res.send(200, 'Execute');
            // console.log('decodedArgs',decodedArgs);
            console.log('decodedArgs',decodedArgs);
            console.log('decodedArgs1',decodedArgs1);
            

        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
    
    // console.log(req.body.length);
    // console.log(JSON.stringify(req.body.length));
    
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    // logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    // logData(req);
    res.send(200, 'Validate');
};