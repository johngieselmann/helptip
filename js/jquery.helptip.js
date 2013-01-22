/**
 * Helptip - jQuery Plugin
 * Displays a help tip for the target element(s) on hover or touch.
 *
 * Source files and information can be found here:
 *  https://github.com/untapped/helptip
 *  
 * Copyright (c) 2012 - 2013 Untapped Venue, LLC
 * www.untappedvenue.com
 *
 * Version: 1.0
 * Requires : jQuery Version 1.4.2 + (this is what it was built on)
 *
 */

(function($){
    
    $.fn.helptip = function(options){
        var self = this;
    
        ///////////////
        // VARIABLES //
        ///////////////
        
        //helper defaults
        this.defaults = {
            arrowWidth: 7,
            helperClass: 'helptip',
            helperId: 'helptip',
            helperStyles: {},
            innerClass: 'helptip-inner',
            innerId: 'helptip-inner',
            innerStyles: {},
            onHide: false,
            onShow: false,
            position: 'top-center',
            showArrow: true,
            showHidden: false,
            spacing: 3
        };
        
        //extend the defaults to the options the user passes in
        this.options = $.extend({},this.defaults,options);
        
        //create the helper div
        this.space = {
            top: parseInt(this.options.spacing),
            left: parseInt(this.options.spacing),
            arrowHor: 10,
            arrowVer: 2
        };
        
        //disabled variable
        this.disabledTip = false;
        
        //helper variables
        this.helper;
        this.helperArrow1;
        this.helperArrow2;
        this.helperArrow3;
        this.helperInner;
        this.info = {helper:null,helperInner:null,element:null};
        
        //remember the targeted element
        this.element = null;
        this.elementTitle = null;
        this.prevElement = null;
        this.prevTitle = null;
        
        //device distinction
        this.isTouch = (/iphone|ipad|ipod|android/i).test(navigator.userAgent);
        this.isWebkit = (/AppleWebKit/).test(navigator.userAgent);
        this.isGecko = !self.isWebkit && (/Gecko/).test(navigator.userAgent);
        this.isIE = (/MSIE/).test(navigator.userAgent);
        this.isIE6 = self.isIE && /MSIE [56]/.test(navigator.userAgent);
        this.isIE7 = self.isIE && /MSIE [7]/.test(navigator.userAgent);
        this.isIE8 = self.isIE && /MSIE [8]/.test(navigator.userAgent);
        this.isIE9 = self.isIE && /MSIE [9]/.test(navigator.userAgent);
        
        //events
        this.OVER = self.isTouch ? 'touchend' : 'mouseover';
        this.OUT = self.isTouch ? 'touchend' : 'mouseout';
        
        //////////////////////
        // ELEMENT CREATION //
        //////////////////////
        
        //create the helper and its inner div
        this.createHelper = function(){
            //create the helper inner
            self.helperInner = $('<div></div>');
            self.helperInner.attr('id',self.options.innerId);
            self.helperInner.addClass(self.options.innerClass);
            for(var i in self.options.innerStyles){
                self.helperInner.css(i,self.options.innerStyles[i]);
            }
            
            //create the helper wrapper
            self.helper = $('<div></div>');
            self.helper.attr('id',self.options.helperId);
            self.helper.addClass(self.options.helperClass);
            self.helper.append(self.helperInner);
            for(var j in self.options.helperStyles){
                self.helper.css(j,self.options.helperStyles[j]);
            }
            
            //append the helper to the document
            self.helper.appendTo(document.body);
            
            //append the arrow to the helper
            if(self.options.showArrow) self.createArrow();
        }
        
        //create the arrow according to the helper
        this.createArrow = function(){

            //arrow 1 = the "border" arrow
            //create the outermost helptip arrow (border)
            self.helperArrow1 = $('<div></div>');
            self.helperArrow1.addClass('helptip-arrow');
            /* if(parseInt(self.helper.css('border-width')) > 0) */ self.helperArrow1.appendTo(self.helper);
            
            //arrow 2 = the "padding" arrow    
            //create the middle helptip arrow  
            self.helperArrow2 = $('<div></div>');
            self.helperArrow2.addClass('helptip-arrow');
            self.helperArrow2.appendTo(self.helper);  

            //arrow 3 = the "colored" arrow
            //create the inner helptip arrow   
            self.helperArrow3 = $('<div></div>');
            self.helperArrow3.addClass('helptip-arrow');
            self.helperArrow3.appendTo(self.helper);
        }
        
        
        ////////////////////////
        // SHOW / HIDE HELPER //
        ////////////////////////
         
        //show the helper if it is not already being shown for the element
        this.showHelper = function(event,targ){
            if(self.disabledTip) return;
        
            //stop the propagation
            event.stopPropagation();
            
            //touch special case
            if(self.isTouch && self.element == targ){
                self.hideHelper();
                return;
            }
            
            //assign the element
            self.element = targ;
            
            //don't show tip for transparent elements
            if(!self.options.showHidden){
                var alpha = 0;
                var opacity = parseInt($(self.element).css('opacity'));

                if((/msie/i).test(navigator.userAgent))
                    alpha = parseInt($(self.element).css('opacity').replace(/\D/,''));
                
                if(opacity == 0 && alpha == 0){
                    self.prevElement = self.element;
                    self.element = null;
                    return;
                }
            }
            
            //hide any other helper
            self.helper.hide();
            
            //get/remove the title and set the text
            self.elementTitle = $(self.element).attr('title');
            $(self.element).removeAttr('title');
            self.helperInner.text(self.elementTitle);
            
            //set the info/values associated with the element and helper
            self.calcElementInfo();
            self.calcInfo('helper');
            self.calcInfo('helperInner');
            
            //set the position of the helper
            var pos = self.calcHelperPosition();
            self.helper.css({
                left: pos.left,
                top: pos.top            
            });
            
            //reset the info/values associated with the helper
            self.calcInfo('helper');
            self.calcInfo('helperInner');
            
            //set the arrows if necessary
            if(self.options.showArrow){
                var arrowPos = self.calcArrowPosition();
                
                //apply the styles/positions
                for(var i in arrowPos.a1) self.helperArrow1.css(i,arrowPos.a1[i]);
                for(var j in arrowPos.a2) self.helperArrow2.css(j,arrowPos.a2[j]);
                for(var k in arrowPos.a3) self.helperArrow3.css(k,arrowPos.a3[k]);
                
                //options.arrowWidth can change with left and right arrows
                //reset the position of the helper to compensate
                if(self.options.position == 'left' || self.options.position == 'right'){
                    pos = self.calcHelperPosition();
                    self.helper.css({
                        left: pos.left,
                        top: pos.top            
                    });
                }
            }
            
            //show helper and execute callback
            self.helper.show();
            if(typeof self.options.onShow == 'function') self.options.onShow(event,$(self.element),self.helper);
        }
        
        //hide the helper when done
        this.hideHelper = function(event){            
            //empty the elementTitle - store it in prevTitle and put it back in the element 
            $(self.element).attr('title',self.elementTitle);
            self.prevTitle = self.elementTitle;
            self.elementTitle = null;

            //empty the element - store it in prev
            self.prevElement = self.element;
            self.element = null;
            
            //hide the tip
            self.helper.hide();
            
            //stop the propagation
            if(event)
                event.stopPropagation();
            
            //execute callback
            if(typeof self.options.onHide == 'function') self.options.onHide(event,$(self.prevElement),self.helper);
        }


        ///////////////
        // POSITIONS //
        ///////////////
        
        //calculate the position of the helper based on the option
        this.calcHelperPosition = function(){
            var pos = {left:self.info.element.offset.left,top:self.info.element.offset.top};
            self.space = self.options.showArrow ? self.calcSpacing() : self.space;

            switch(self.options.position){
                case 'top-left':
                    pos.top -= (self.info.helper.outerHeight + self.space.top);
                    pos.left -= (self.info.helper.outerWidth - self.space.left);
                    break;
                case 'top-center':
                    pos.top -= (self.info.helper.outerHeight + self.space.top);
                    pos.left -= ((self.info.helper.outerWidth - self.info.element.outerWidth) / 2);
                    break;
                case 'top-right':
                    pos.top -= (self.info.helper.outerHeight + self.space.top);
                    pos.left += (self.info.element.width + self.space.left);
                    break;
                case 'bottom-left':
                    pos.top += (self.info.element.height + self.space.top);
                    pos.left -= (self.info.helper.outerWidth - self.space.left);
                    break;
                case 'bottom-center':
                    pos.top += (self.info.element.height + self.space.top);
                    pos.left -= ((self.info.helper.outerWidth - self.info.element.outerWidth) / 2);
                    break;
                case 'bottom-right':
                    pos.top += (self.info.element.height + self.space.top);
                    pos.left += (self.info.element.width + self.space.left);
                    break;
                case 'left':
                    pos.top -= ((self.info.helper.outerHeight - self.info.element.height) / 2);
                    pos.left -= (self.info.helper.outerWidth + self.space.left);
                    break;
                case 'right':
                    pos.top -= ((self.info.helper.outerHeight - self.info.element.height) / 2);
                    pos.left += (self.info.element.width + self.space.left);
                    break;
            }
            return pos;
        }
        
        //calculate the position of the arrow based on option size and position of helper
        this.calcArrowPosition = function(){
            var pos = {
                a1:{},  //a1 = border arrow
                a2:{},  //a2 = padding arrow
                a3:{}   //a3 = color arrow
            };
        
            //set the arrow colors
            var a1Color;
            var a2Color = self.info.helper.background.color;    
            var a3Color = self.info.helperInner.background.color; 
            switch(self.options.position){
                case 'top-left':
                case 'top-center':
                case 'top-right':
                    a1Color = self.info.helper.border.bottom.color;
                    break;
                case 'bottom-left':
                case 'bottom-center':
                case 'bottom-right':
                    a1Color = self.info.helper.border.top.color;
                    break;
                case 'left':
                    a1Color = self.info.helper.border.right.color;
                    break;
                case 'right':
                    a1Color = self.info.helper.border.left.color;
                    break;
            }
        
            //calculate the arrow widths
            var side;
            switch(self.options.position){
                case 'top-left':
                case 'top-center':
                case 'top-right':
                    side = 'bottom';
                    break;
                    
                case 'bottom-left':
                case 'bottom-center':
                case 'bottom-right':
                    side = 'top';
                    break;
                    
                case 'left':
                case 'right':
                    //reset the helper inner values
                    self.calcInfo('helperInner');
                                     
                    //need an even number for the heights
                    if(self.info.helper.outerHeight % 2 != 0){                        
                        //reset the heights
                        self.helper.height(self.info.helper.height + 1);
                        self.helperInner.height(self.info.helperInner.height + 1);
                        self.calcInfo('helper');
                        self.calcInfo('helperInner');
                    }
                    
                    //differentiate between left and right here instead of another switch case with a lot of the same code
                    var r1 = self.options.position == 'left' ? self.info.helperInner.border.radius.topRight : self.info.helperInner.border.radius.topLeft;
                    var r2 = self.options.position == 'left' ? self.info.helperInner.border.radius.bottomRight : self.info.helperInner.border.radius.bottomLeft;
                    side = self.options.position == 'left' ? 'right' : 'left';
                
                    //the arrow width (or in this case height) shouldn't be taller than where the border radius starts
                    var innerTotal = self.info.helperInner.height + self.info.helperInner.padding.top + self.info.helperInner.padding.bottom;
                    var availableHeight = (innerTotal - r1 - r2) / 2;
                    self.options.arrowWidth = self.options.arrowWidth > availableHeight ? availableHeight - self.space.arrowVer : self.options.arrowWidth;
                    break;
            }
            var a3Width = self.options.arrowWidth.toString() + 'px';
            var a2Width = (self.options.arrowWidth + self.info.helper.padding[side]).toString() + 'px';
            var a1Width = (parseInt(a2Width) + self.info.helper.border[side].width - 1).toString() + 'px';
                                    
            //set the top position
            switch(self.options.position){
                case 'bottom-left':
                case 'bottom-center':
                case 'bottom-right':
                    //calculate the top positions
                    var a1Top = '-' + (parseInt(a1Width) + self.info.helper.border.top.width).toString() + 'px';
                    var a2Top = '-' + a2Width;
                    var a3Top = '-' + (parseInt(a3Width) - self.info.helper.padding.top).toString() + 'px';
                    
                    //set the top positions
                    pos.a1['top'] = a1Top;
                    pos.a2['top'] = a2Top;
                    pos.a3['top'] = a3Top;
                    break;
                case 'left':
                case 'right':
                    //set the top position
                    pos.a1['top'] = pos.a2['top'] = pos.a3['top'] = '50%';
                    
                    //set the left margin
                    pos.a1['margin-top'] = '-' + a1Width;
                    pos.a2['margin-top'] = '-' + a2Width;
                    pos.a3['margin-top'] = '-' + a3Width;
                    break;
            }
            
            //set the right position
            switch(self.options.position){
                case 'top-left':
                case 'top-right':
                case 'bottom-left':
                case 'bottom-right':
                
                    //right and mid offset of the arrows
                    var arrowRight = self.info.helper.offset.right - self.info.helper.border.right.width;
                    var a1Mid = arrowRight - parseInt(a1Width);
                    var a2Mid = arrowRight - parseInt(a2Width);
                    var a3Mid = arrowRight - parseInt(a3Width);
                    
                    //move left difference between arrow mid and element mid
                    pos.a1['right'] = a1Mid - self.info.element.offset.midH;
                    pos.a2['right'] = a2Mid - self.info.element.offset.midH;
                    pos.a3['right'] = a3Mid - self.info.element.offset.midH;
                    break;
                case 'right':
                    //set the right position
                    pos.a1['right'] = pos.a2['right'] = pos.a3['right'] = '100%';
                    
                    //set the left margin
                    pos.a1['margin-right'] = (self.info.helper.border.right.width - 1).toString() + 'px';
                    pos.a2['margin-right'] = -1;
                    pos.a3['margin-right'] = '-' + (self.info.helper.padding.right).toString() + 'px';
                    break;
            }  
            
            //set the bottom position
            switch(self.options.position){
                case 'top-left':
                case 'top-center':
                case 'top-right':
                
                    //calc the bottom position
                    var a1Bottom = '-' + (parseInt(a1Width) + self.info.helper.border.bottom.width).toString() + 'px';
                    var a2Bottom = '-' + a2Width;
                    var a3Bottom = '-' + (parseInt(a3Width) - self.info.helper.padding.bottom).toString() + 'px';
                    
                    //set the bottom position
                    pos.a1['bottom'] = a1Bottom;
                    pos.a2['bottom'] = a2Bottom;
                    pos.a3['bottom'] = a3Bottom;
                    break;
            }
            
            //set the left position
            switch(self.options.position){
                case 'top-center':
                case 'bottom-center':
                    //set the left position
                    pos.a1['left'] = pos.a2['left'] = pos.a3['left'] = '50%';
                    
                    //set the left margin
                    pos.a1['margin-left'] = '-' + a1Width;
                    pos.a2['margin-left'] = '-' + a2Width;
                    pos.a3['margin-left'] = '-' + a3Width;
                    break;
                case 'left':
                    //set the left position
                    pos.a1['left'] = pos.a2['left'] = pos.a3['left'] = '100%';
                    
                    //set the left margin
                    pos.a1['margin-left'] = (self.info.helper.border.right.width - 1).toString() + 'px';
                    pos.a2['margin-left'] = -1;
                    pos.a3['margin-left'] = '-' + (self.info.helper.padding.right).toString() + 'px';
                    break;
            }        
            
            //set the top borders
            switch(self.options.position){
                case 'top-left':
                case 'top-center':
                case 'top-right':
                    pos.a1['border-top'] = a1Width + ' solid ' + a1Color;
                    pos.a2['border-top'] = a2Width + ' solid ' + a2Color;
                    pos.a3['border-top'] = a3Width + ' solid ' + a3Color;
                    break;
                case 'left':
                case 'right':
                    pos.a1['border-top'] = a1Width + ' solid transparent';
                    pos.a2['border-top'] = a2Width + ' solid transparent';
                    pos.a3['border-top'] = a3Width + ' solid transparent';
                    break;
            }
            
            //set the left and right borders
            switch(self.options.position){
                case 'top-left':
                case 'top-center':
                case 'top-right':
                case 'bottom-left':
                case 'bottom-center':
                case 'bottom-right':
                    pos.a1['border-left'] = pos.a1['border-right'] = a1Width + ' solid transparent';
                    pos.a2['border-left'] = pos.a2['border-right'] = a2Width + ' solid transparent';
                    pos.a3['border-left'] = pos.a3['border-right'] = a3Width + ' solid transparent';
                    break;
                case 'right':
                    pos.a1['border-right'] = a1Width + ' solid ' + a1Color;
                    pos.a2['border-right'] = a2Width + ' solid ' + a2Color;
                    pos.a3['border-right'] = a3Width + ' solid ' + a3Color;
                    break;
                case 'left':
                    pos.a1['border-left'] = a1Width + ' solid ' + a1Color;
                    pos.a2['border-left'] = a2Width + ' solid ' + a2Color;
                    pos.a3['border-left'] = a3Width + ' solid ' + a3Color;
                    break;
            }
            
            //set the bottom borders
            switch(self.options.position){
                case 'bottom-left':
                case 'bottom-center':
                case 'bottom-right':
                    pos.a1['border-bottom'] = a1Width + ' solid ' + a1Color;
                    pos.a2['border-bottom'] = a2Width + ' solid ' + a2Color;
                    pos.a3['border-bottom'] = a3Width + ' solid ' + a3Color;
                    break;
                case 'left':
                case 'right':
                    pos.a1['border-bottom'] = a1Width + ' solid transparent';
                    pos.a2['border-bottom'] = a2Width + ' solid transparent';
                    pos.a3['border-bottom'] = a3Width + ' solid transparent';
                    break;
            }
            
            return pos;
        }
        
        //calculate the additional spacing needed when showing the arrow
        this.calcSpacing = function(){
        
            //reset space top and left
            self.space.top = parseInt(self.options.spacing);
            self.space.left = parseInt(self.options.spacing);
            
            //padding
            var helperPadHor = parseInt(self.helper.css('padding-top')) + parseInt(self.helper.css('padding-bottom'));
            var helperPadVer = parseInt(self.helper.css('padding-left')) + parseInt(self.helper.css('padding-right'));
            
            //calc the space object based on helper settings
            switch(self.options.position){
                case 'top-left':
                    self.space.top += self.options.arrowWidth + self.info.helper.padding.bottom + self.info.helper.border.bottom.width - self.space.arrowVer;
                    self.space.left += self.info.element.width + self.info.helper.padding.right + self.info.helper.padding.left 
                                    + self.info.helper.border.right.width + self.info.helper.border.left.width + self.space.arrowHor;
                    break;
                case 'top-center':
                    self.space.top += self.options.arrowWidth + self.info.helper.padding.bottom + self.info.helper.border.bottom.width - self.space.arrowVer;
                    break;
                case 'top-right':
                    self.space.top += self.options.arrowWidth + self.info.helper.padding.bottom + self.info.helper.border.bottom.width - self.space.arrowVer;
                    self.space.left -= self.info.element.width + self.info.helper.padding.right + self.info.helper.padding.left 
                                    + self.info.helper.border.right.width + self.info.helper.border.left.width + self.space.arrowHor;
                    break;
                case 'bottom-left':
                    self.space.top += self.options.arrowWidth + self.info.helper.padding.top + self.info.helper.border.top.width - self.space.arrowVer;
                    self.space.left += self.info.element.width + self.info.helper.padding.right + self.info.helper.padding.left
                                    + self.info.helper.border.right.width + self.info.helper.border.left.width + self.space.arrowHor;
                    break;
                case 'bottom-center':
                    self.space.top += self.options.arrowWidth + self.info.helper.padding.top + self.info.helper.border.top.width - self.space.arrowVer;
                    break;
                case 'bottom-right':
                    self.space.top += self.options.arrowWidth + self.info.helper.padding.top + self.info.helper.border.top.width - self.space.arrowVer;
                    self.space.left -= self.info.element.width + self.info.helper.padding.right + self.info.helper.padding.left 
                                    + self.info.helper.border.right.width + self.info.helper.border.left.width + self.space.arrowHor;
                    break;
                case 'left':
                    self.space.left += self.options.arrowWidth + self.info.helper.padding.right + self.info.helper.border.right.width - 2; // 2 = go figure
                    break;
                case 'right':
                    self.space.left += self.options.arrowWidth + self.info.helper.padding.left + self.info.helper.border.left.width;
                    break;
            }
            
            return self.space;
        }


        /////////////////////////
        // HELPER/ELEMENT INFO //
        /////////////////////////

        //calculate the info for a given jq object
        this.calcInfo = function(targ){
            var prefix = self.isWebkit ? '-webkit-' : self.isIE9 ? '' : false;
            var jqs = targ == 'helper' ? self.helper : self.helperInner;
            
            self.info[targ] = {
                background:{
                    color: jqs.css('background-color')
                },
                border: {
                    top: {
                        color: jqs.css('border-top-color'),
                        width: parseInt(jqs.css('border-top-width'))
                    },
                    right: {
                        color: jqs.css('border-right-color'),
                        width: parseInt(jqs.css('border-right-width'))
                    },
                    bottom: {
                        color: jqs.css('border-bottom-color'),
                        width: parseInt(jqs.css('border-bottom-width'))
                    },
                    left: {
                        color: jqs.css('border-left-color'),
                        width: parseInt(jqs.css('border-left-width'))
                    }
                },
                height: parseInt(jqs.height()) == 0 ? parseInt(jqs.css('height')) : parseInt(jqs.height()),
                offset: {
                    top: parseInt(jqs.css('top')),
                    right: parseInt(jqs.css('left')) + parseInt(jqs.outerWidth()) - 1,
                    bottom: parseInt(jqs.outerHeight()) + parseInt(jqs.css('top')) - 1,
                    left: parseInt(jqs.css('left')),
                    midH: parseInt(jqs.css('left')) + (parseInt(jqs.outerWidth()) / 2),
                    midV: parseInt(jqs.css('top')) + (parseInt(jqs.outerHeight()) / 2)
                },
                outerHeight: parseInt(jqs.outerHeight()),
                outerWidth: parseInt(jqs.outerWidth()),
                padding: {
                    top: parseInt(jqs.css('padding-top')),
                    right: parseInt(jqs.css('padding-right')),
                    bottom: parseInt(jqs.css('padding-bottom')),
                    left: parseInt(jqs.css('padding-left')),
                },
                width: parseInt(jqs.width())               
            };
            
            //get the border radius
            if(self.isGecko){ //mozilla ff
                self.info[targ].border.radius = {
                    topLeft: parseInt(jqs.css('-moz-border-radius-topleft')),
                    topRight: parseInt(jqs.css('-moz-border-radius-topright')),
                    bottomLeft: parseInt(jqs.css('-moz-border-radius-bottomleft')),
                    bottomRight: parseInt(jqs.css('-moz-border-radius-bottomright'))
                };
            }
            else if(prefix){ //webkit (safari, chrome) && html5 (ie9)
                self.info[targ].border.radius = {
                    topLeft: parseInt(jqs.css(prefix + 'border-top-left-radius')),
                    topRight: parseInt(jqs.css(prefix + 'border-top-right-radius')),
                    bottomLeft: parseInt(jqs.css(prefix + 'border-bottom-left-radius')),
                    bottomRight: parseInt(jqs.css(prefix + 'border-bottom-right-radius'))
                };
            }
            else{ //no border radius support
                self.info[targ].border.radius = {
                    topLeft: 0,
                    topRight: 0,
                    bottomLeft: 0,
                    bottomRight: 0
                };
            }
            
            return self.info[targ];
        }
        
        //calculates values associated with the element
        this.calcElementInfo = function(){
        
            //set the element values that may be needed
            self.info.element = {
                border: {
                    top: {
                        color: $(self.element).css('border-top-color'),
                        width: parseInt($(self.element).css('border-top-width'))
                    },
                    right: {
                        color: $(self.element).css('border-right-color'),
                        width: parseInt($(self.element).css('border-right-width'))
                    },
                    bottom: {
                        color: $(self.element).css('border-bottom-color'),
                        width: parseInt($(self.element).css('border-bottom-width'))
                    },
                    left: {
                        color: $(self.element).css('border-left-color'),
                        width: parseInt($(self.element).css('border-left-width'))
                    }
                },
                height: parseInt($(self.element).height()),
                offset: {
                    top: parseInt($(self.element).offset().top),
                    right: parseInt($(self.element).offset().left) + parseInt($(self.element).outerWidth()),
                    bottom: parseInt($(self.element).outerHeight()) + parseInt($(self.element).offset().top),
                    left: parseInt($(self.element).offset().left),
                    midH: parseInt($(self.element).offset().left) + (parseInt($(self.element).outerWidth()) / 2),
                    midV: parseInt($(self.element).offset().top) + (parseInt($(self.element).outerHeight()) / 2)
                },
                outerHeight: parseInt($(self.element).outerHeight()),
                outerWidth: parseInt($(self.element).outerWidth()),
                padding: {
                    top: parseInt($(self.element).css('padding-top')),
                    right: parseInt($(self.element).css('padding-right')),
                    bottom: parseInt($(self.element).css('padding-bottom')),
                    left: parseInt($(self.element).css('padding-left')),
                },
                width: parseInt($(self.element).width())                
            };
            
            return self.info.element;
        }
        
        //ensure the options will not cause unexpected results
        this.correctOptions = function(){
        
            //line height
            if(typeof self.options.lineHeight  == 'number'){
                self.options.lineHeight = self.options.lineHeight.toString() + 'px';
            }
            else if(typeof self.options.lineHeight == 'string'){
                if(!self.options.lineHeight.match(/px$|%$|em$/)){
                    self.options.lineHeight = parseInt(self.options.lineHeight).toString() + 'px';
                }
            }
        }
        
        //////////////////
        // USER METHODS //
        //////////////////
        
        //allows disabling of the helptip
        this.disable = function(){
            self.disabledTip = true;
            if(self.element) self.hideHelper(window.event);
        };
        
        //allows enabling the helptip after disabling has occured
        this.enable = function(){
            self.disabledTip = false;
        };
        
        ////////////
        // RETURN //
        ////////////
                
        self.correctOptions();
        self.createHelper();
            
        //setup the events for the targeted elements
        return this.each(function(){
            //trying to show the element
            $(this).unbind(self.OVER).bind(self.OVER,function(event){
                if($(this).attr('title') != '')
                    self.showHelper(event,this);
            });
            
            //remove just the tip for touch/non touch
            if(self.isTouch)
                $(document).bind(self.OVER,self.hideHelper);
            else
                $(this).unbind(self.OUT).bind(self.OUT,self.hideHelper);
                
        });
    };
    
})(jQuery);