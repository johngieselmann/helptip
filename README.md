Helptip jQuery Plugin
=====================

This is a jQuery plugin that generates a "help tip" for the targeted element(s) when hovered over. The content for the help tip comes from the title attribute of the targeted element(s).

Requirements
------------
- jQuery v1.4.2+


How to Use
----------

Include these files in your project:
- jquery.helptip.min.js
- jquery.helptip.css

Call the helptip function on a targeted element: 

    $('.example').helptip();


Options
-------

**arrowWidth (int)** _default: 7_

The pixel value of how wide to make the arrow.


**helperClass (string)** _default: 'helptip'_

The class applied to the helper.


**helperId (string)** _default: 'helptip'_

The ID applied to the helper.


**helperStyles (object)** _default: { }_

Associative array of inline styles and values to be applied to the helper that override the style sheet. These styles are applied with the jQuery .css() method and should match the optional object parameter passed into it.


**innerClass (string)** _default: 'helptip-inner'_

The class applied to the inner helper.


**innerId (string)** _default: 'helptip-inner'_

The ID applied to the inner helper.


**innerStyles (object)** _default: { }_

Associative array of inline styles and values to be applied to the inner helper that override the style sheet. These styles are applied with the jQuery .css() method and should match the optional object parameter passed into it.


**position (string)** _default: 'top-center'_

Where to position the helper in relation to the targeted element. Possible values:
- top-left
- top-center
- top-right
- right
- left
- bottom-left
- bottom-center
- bottom-right


**showArrow (boolean)** _default: true_

Whether or not to show the arrow.
- **true:** show the arrow
- **false:** do not show the arrow


**showHidden (boolean)** _default: false_

Whether or not to ignore elements with opacity styles.
- **true:** show the tip on non-visible elements
- **false:** do not show the tip on non-visible elements


**spacing (int)** _default: 3_

The number of pixels of spacing between the helper and the targeted element.


    var options = {
        arrowWidth: 3,
        helperClass: 'helptip',
        helperId: 'helptip',
        helperStyles: {
            'border': '1px solid #000'
        },
        innerClass: 'helptip-inner',
        innerId: 'helptip-inner',
        innerStyles: {
            'border': '1px solid #000'            
        },
        position: 'top-center',
        showArrow: true,
        showHidden: false,
        spacing: 3        
    };
    
    var helptip = $('.example').helptip(options);


Callbacks
---------

**onHide (function)** _default: false_

Callback function executed with the helper is hidden. It is only executed if the user passes in a function to be called.

The onHide method passes in three parameters: (event,target,helper)
- **event:** the triggered event passed from jQuery
- **target:** the jQuery object of the element(s) targeted for the help tip
- **helper:** the jQuery object of the helper


**onShow (function)** _default: false_

Callback function executed with the helper is shown. It is only executed if the user passes in a function to be called.

The onShow method passes in three parameters: (event,target,helper)
- **event:** the triggered event passed from jQuery
- **target:** the jQuery object of the element(s) targeted for the help tip
- **helper:** the jQuery object of the helper

    var onHideCallback = function(event, target, helper) {
        //do work here
    };
    
    var onShowCallback = function(event, target, helper) {
        //do work here
    };
    
    var callbacks = {
        'onHide': onHideCallback,
        'onShow': onShowCallback
    };
    
    var helptip = $('.example').helptip(callbacks);


Methods
-------

**disable()**

Calling this method disables the showing of the help tip during hover.


**enable()**

Calling this method enables the showing of the help tip if it had been previously disabled. By default, the help tip is enabled.


    var helptip = $('.example').helptip();
    
    function toggleHelptip() {
    
        if (disabled) {
            helptip.enable();
        }
        else {
            helptip.disable();
        }
    
    }