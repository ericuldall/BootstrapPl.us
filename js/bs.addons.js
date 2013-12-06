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
