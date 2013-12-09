/**
 *
 * Bootstrap Addons JS
 *
 * @author Eric Uldall
 * @version 0.0.1
 *
 * @requires bs.addons.css
 * @requires bootstrap.css
 * @requires bootstrap.js
 * @requires jquery 1.8+
 *
 */
//define global object
var bootstrappl = {};
(function($){
    //set golbal configs
    bootstrappl.us = {
        glyphicons: false,
        hasGlyphicons: function(bool){
            if( bool !== undefined ) bootstrappl.us.glyphicons = bool;
            return bootstrappl.us.glyphicons;
        },
        getClosestArrayKey: function(stack, val){
            var closest=new Object();
            for(var i in stack){
                if(typeof closest.diff=='undefined'){
                    closest.diff=Math.abs(val-i);
                    closest.val=[i];
                }else{
                    if(closest.diff==Math.abs(val-i)){
                        closest.val.push(i);
                    }else if(closest.diff>Math.abs(val-i)){
                        closest.diff=Math.abs(val-i);
                        closest.val=[i];
                    }
                }
            }

            return closest;
        },
        deleteArrayKeys: function(stack, val, operator){
            for(var i in stack){
                if(eval(i + ' ' + operator + ' ' + val)){
                    delete stack[i];
                }
            }

            return stack;
        }
        
    };

    /**
    *
    * BEGIN PLUGINS
    *
    */

    //Collapsable Panels
    $.fn.collapsePanel = function(){
        //define instance for use in child functions
        var $this = $(this);
        //define properties and methods
        $this.collapsePanelsInit = false;
        $this.collapsePanelKey = 0;
        $this.incrementCollapsePanelKey = function(){
            $this.collapsePanelKey++;
        };
        $this.getCollapsePanelKey = function(){
            return $this.collapsePanelKey;
        };
        //initialize the plugin
        $this.init = function(options){
            var collapse_down = '<span class="pull-right collapse-handle ' + (bootstrappl.us.hasGlyphicons() ? 'glyphicon glyphicon-collapse-down' : 'caret') + '"></span>';
            var collapse_up = '<span class="pull-right collapse-handle ' + (bootstrappl.us.hasGlyphicons() ? 'glyphicon glyphicon-collapse-up' : 'caret caret-up') + '"></span>';
            //collapsable panel
            $this.each(function(){
                var panel = $(this);
                if( $(this).data('is-collapsable') == true ){
                    return;
                }else{
                    $(this).attr('data-is-collapsable', 'true');
                }
                var heading = panel.find('.panel-heading');
                var body = panel.find('.panel-body');
                heading.attr('data-toggle', 'collapse');
                heading.attr('data-target', '#panelBody' + $this.getCollapsePanelKey());
                $('<div id="panelBody' + $this.getCollapsePanelKey() + '" class="panel-collapse '+($(this).hasClass('closed') ? 'collapse' : 'in')+'"></div>').insertBefore(body);
                $('#panelBody' + $this.getCollapsePanelKey()).html(body.clone());
                body.remove();
                if( $(this).hasClass('closed') ){
                    heading.append(collapse_down);
                }else{
                    heading.append(collapse_up);
                }
                $this.incrementCollapsePanelKey();
            });
            if( $this.collapsePanelsInit === false ){
                $('.modal').on('shown.bs.modal', function () {
                    $($this.selector).collapsePanel();
                });
                $('.panel-collapse').on('show.bs.collapse', function(){
                    $(this).prev()
                           .find('.collapse-handle')
                           .removeClass(bootstrappl.us.hasGlyphicons() ? 'glyphicon-collapse-down' : '')
                           .addClass(bootstrappl.us.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up');
                });
                $('.panel-collapse').on('hide.bs.collapse', function(){
                    $(this).prev()
                           .find('.collapse-handle')
                           .removeClass(bootstrappl.us.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up')
                           .addClass(bootstrappl.us.hasGlyphicons() ? 'glyphicon-collapse-down' : '');
                });
                $this.collapsePanelsInit = true;
            }
        };
        $this.init();
    };

    //Progress Bar Control
    $.fn.progressBar = function(options){
        //define instance for use in child functions
        var $this = $(this);
        //set default options
        $this.defaults = {
            bar: {
                style: 'primary',
                type: 'increment',
                striped: false,
                animated: false,
                min_pct: 0,
                max_pct: 100,
                pct: 0,
            },
            checkpoint: Array,
            onInit: function(){},
            beforeUpdate: function(){},
            onUpdate: function(){},
            onMin: function(){},
            onMax: function(){}
        };
        //extend options
        $this.options = $.extend(true, {}, $this.defaults, options);
        $this.last_pct = $this.options.bar.pct;
        //process options
        $this.processOptions =  function(update){
            $this.children('.progress-bar')
                 .removeClass('progress-bar-primary progress-bar-info progress-bar-warning progress-bar-danger progress-bar-success')
                 .addClass('progress-bar-'+$this.options.bar.style)
                 .attr({
                    "aria-valuemin": $this.options.bar.min_pct,
                    "aria-valuemax": $this.options.bar.max_pct,
                 });
            if(update){
                var last_pct;
                //checks for incrementing progress
                if( $this.options.bar.type == 'increment' && $this.last_pct != $this.options.bar.pct ){
                    if( $this.options.bar.pct >= $this.options.bar.max_pct ){
                        $this.children('.progress-bar')
                             .attr({
                                "aria-valuenow": $this.options.bar.max_pct
                             })
                             .css({
                                "width": $this.options.bar.max_pct+'%'
                             })
                             .children('.sr-only')
                             .html($this.options.bar.max_pct+'% Complete');
                        last_pct = $this.options.bar.max_pct;
                    }else{
                        $this.children('.progress-bar')
                             .attr({
                                "aria-valuenow": $this.options.bar.pct
                             })
                             .css({
                                "width": $this.options.bar.pct+'%'
                             })
                             .children('.sr-only')
                             .html($this.options.bar.pct+'% Complete');
                        last_pct = $this.options.bar.pct;
                    }
                    var checkpoint_key = bootstrappl.us.getClosestArrayKey($this.options.checkpoint, last_pct);
                        checkpoint_key = checkpoint_key.val;
                    if( checkpoint_key <= last_pct ){
                        $this.options.checkpoint[checkpoint_key]();
                        bootstrappl.us.deleteArrayKeys($this.options.checkpoint, checkpoint_key, '<=');
                    }
                }
                //checks for decrementing progress
                else if( $this.options.bar.type == 'decrement' && $this.last_pct != $this.options.bar.pct ){
                    if( $this.options.bar.pct <= $this.options.bar.min_pct ){
                        $this.children('.progress-bar')
                             .attr({
                                "aria-valuenow": $this.options.bar.min_pct
                             })
                             .css({
                                "width": $this.options.bar.min_pct+'%'
                             })
                             .children('.sr-only')
                             .html($this.options.bar.min_pct+'% Complete');
                        last_pct = $this.options.bar.min_pct;
                    }else{
                        $this.children('.progress-bar')
                             .attr({
                                "aria-valuenow": $this.options.bar.pct
                             })
                             .css({
                                "width": $this.options.bar.pct+'%'
                             })
                             .children('.sr-only')
                             .html($this.options.bar.pct+'% Complete');
                        last_pct = $this.options.bar.pct;
                    }
                    var checkpoint_key = bootstrappl.us.getClosestArrayKey($this.options.checkpoint, last_pct);
                        checkpoint_key = checkpoint_key.val;
                    if( checkpoint_key >= last_pct ){
                        $this.options.checkpoint[checkpoint_key]();
                        bootstrappl.us.deleteArrayKeys($this.options.checkpoint, checkpoint_key, '>=');
                    }
                }
                if( last_pct == $this.options.bar.max_pct ){ $this.options.onMax(); }
                if( last_pct == $this.options.bar.min_pct ){ $this.options.onMin(); }
            }else{
                $this.children('.progress-bar')
                     .attr({
                        "aria-valuenow": $this.options.bar.pct
                     })
                     .css({
                        "width": $this.options.bar.pct+'%'
                     })
                     .children('.sr-only')
                     .html($this.options.bar.pct+'% Complete');
            }
            if( $this.options.bar.striped ){
                $this.addClass('progress-striped');
            }else{
                $this.removeClass('progress-striped');
            }
            if( $this.options.bar.animated ){
                $this.addClass('progress-striped active');
            }else{
                $this.removeClass('active');
            }
        };
        //update method
        $this.update = function(updates){
            $this.options.beforeUpdate();
            $this.options = $.extend(true, {}, $this.options, updates);
            $this.processOptions(true);
            $this.options.onUpdate();
        };
        //initialize the plugin
        $this.init = function(){
            $this.processOptions(false);
            $this.options.onInit();
        };
        $this.init();

        return $this;
    };
    //check if #document is loaded
    $(document).ready(function(){
        //emit ready event
        $.event.trigger({
            type: "bootstrappl.us.ready",
            message: "BootstrapPl.us is ready!",
            time: new Date()
        });
    });
})(jQuery);
