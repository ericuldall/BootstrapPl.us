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
var bs_addons = {
    glyphicons: false,
    hasGlyphicons: function(bool){
        if( bool !== undefined ) this.glyphicons = bool;
        return this.glyphicons;
    },
    collapsePanelsInit: false,
    collapsePanelsKey: 0,
    incrementCollapsePanelsKey: function(){
        collapsePanelsKey++;
    },
    getCollapsePanelKey: function(){
        return this.collapsePanelsKey;
    },
    collapsePanels: function(){
        var collapse_down = '<span class="pull-right collapse-handle ' + (this.hasGlyphicons() ? 'glyphicon glyphicon-collapse-down' : 'caret') + '"></span>';
        var collapse_up = '<span class="pull-right collapse-handle ' + (this.hasGlyphicons() ? 'glyphicon glyphicon-collapse-up' : 'caret caret-up') + '"></span>';
        //collapsable panel
        $('.panel.collapsable').each(function(){
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
            heading.attr('data-target', '#panelBody' + bs_addons.getCollapsePanelKey());
            $('<div id="panelBody' + bs_addons.getCollapsePanelKey() + '" class="panel-collapse collapse"></div>').insertBefore(body);
            $('#panelBody' + bs_addons.getCollapsePanelKey()).html(body.clone());
            body.remove();
            if( $(this).hasClass('closed') ){
                $(this).collapse('toggle');
            }
            $this.incrementCollapsePanelKey();
        });
        if( this.collapsePanelsInit === false ){
            $('.modal').on('shown.bs.modal', function () {
                bs_addons.collapsePanels();
            });
            $('div[id^="panelBody"]').on('show.bs.collapse', function(){
                $(this).closest('.panel-heading')
                       .find('.collapse-handle')
                       .removeClass($this.hasGlyphicons() ? 'glyphicon-collapse-down' : '')
                       .addClass($this.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up');
            });
            $('div[id^="panelBody"]').on('hide.bs.collapse', function(){
                $(this).closest('.panel-heading')
                       .find('.collapse-handle')
                       .removeClass($this.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up')
                       .addClass($this.hasGlyphicons() ? 'glyphicon-collapse-down' : '');
            });
            this.collapsePanelsInit = true;
        }
    }
};
