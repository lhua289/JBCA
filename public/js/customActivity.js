define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    var contactid = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedSchema', function (data) {
        // save schema
        console.log('*** Schema ***', JSON.stringify(data['schema']));
     });
    connection.on('clickedNext', save);
    
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        // console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        // console.log('inArguments',inArguments);
        // console.log('inArguments222',inArguments.[2]);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                if (key === 'senderName') {
                    $("#comment").html(val);
                }
                
            });
        });
        

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        // console.log("onGetTokens function");
        // console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        // console.log(endpoints);
    }

    function save() {
        var postcardURLValue = $('#postcard-url').val();
        var postcardTextValue = $('#postcard-text').val();
        var senderName = $("#comment").val();
        // console.log('postcardURLValue : ' + postcardURLValue);
        // console.log('postcardTextValue : ' + postcardTextValue);
        // console.log('senderName : ' + senderName);
        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "ContactKey": "aaaaaaa",
            "senderName": senderName,
            "contactid": "{{Contact.Attribute.jbca_2.contactid}}" ,
            "FirstName": "{{Contact.Attribute.jbca_2.FirstName}}",
            "LastName": "{{Contact.Attribute.jbca_2.LastName}}"
        }];
        
        payload['metaData'].isConfigured = true;
        // console.log('*** Schema ***', JSON.stringify(data['schema']));
        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});