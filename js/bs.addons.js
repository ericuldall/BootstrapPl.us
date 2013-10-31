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
 *
 */
var bs_addons = {
    glyphicons: false,
    hasGlyphicons: function(bool){
        if( bool !== undefined ) this.glyphicons = bool;
        return this.glyphicons;
    },
    collapsePanelsInit: false,
    collapsePanels: function(){
        var $this = this;
        var collapse_down = '<span class="pull-right collapse-handle ' + (this.hasGlyphicons() ? 'glyphicon glyphicon-collapse-down' : 'caret') + '"></span>';
        var collapse_up = '<span class="pull-right collapse-handle ' + (this.hasGlyphicons() ? 'glyphicon glyphicon-collapse-up' : 'caret caret-up') + '"></span>';
        //collapsable panel
        $('.panel.collapsable').each(function(key, val){
            var panel = $(this);
            if( $(this).data('is-collapsable') == true ){
                return;
            }else{
                $(this).attr('data-is-collapsable', 'true');
            }
            var heading = panel.find('.panel-heading');
            var body = panel.find('.panel-body');
            if( body.is(':visible') ){
                heading.append(collapse_up);
            }else{
                heading.append(collapse_down);
            }
            heading.attr('data-toggle', 'collapse');
            heading.attr('data-target', '#panelBody'+key);
            body.insertBefore('<div id="panelBody'+key+'" class="panel-collapse collapse'+(body.hasClass('closed') ? '' : ' in' )+'">');
            body.insertAfter('</div>');
        });
        if( this.collapsePanelsInit === false ){
            $('.modal').on('shown.bs.modal', function () {
                bs_addons.collapsePanels();
            });
            this.collapsePanelsInit = true;
        }
    }
};
