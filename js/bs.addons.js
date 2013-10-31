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
        if( bool !== undefined ) bs_addons.glyphicons = bool;
        return bs_addons.glyphicons;
    },
    collapsePanelsInit: false,
    collapsePanelKey: 0,
    incrementCollapsePanelKey: function(){
        bs_addons.collapsePanelKey++;
    },
    getCollapsePanelKey: function(){
        return bs_addons.collapsePanelKey;
    },
    collapsePanels: function(){
        var collapse_down = '<span class="pull-right collapse-handle ' + (bs_addons.hasGlyphicons() ? 'glyphicon glyphicon-collapse-down' : 'caret') + '"></span>';
        var collapse_up = '<span class="pull-right collapse-handle ' + (bs_addons.hasGlyphicons() ? 'glyphicon glyphicon-collapse-up' : 'caret caret-up') + '"></span>';
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
            heading.attr('data-toggle', 'collapse');
            heading.attr('data-target', '#panelBody' + bs_addons.getCollapsePanelKey());
            $('<div id="panelBody' + bs_addons.getCollapsePanelKey() + '" class="panel-collapse collapse"></div>').insertBefore(body);
            $('#panelBody' + bs_addons.getCollapsePanelKey()).html(body.clone());
            body.remove();
            if( $(this).hasClass('closed') ){
                $(this).collapse('toggle');
                heading.append(collapse_down);
            }else{
                heading.append(collapse_up);
            }
            bs_addons.incrementCollapsePanelKey();
        });
        if( bs_addons.collapsePanelsInit === false ){
            $('.modal').on('shown.bs.modal', function () {
                bs_addons.collapsePanels();
            });
            $('div[id^="panelBody"]').on('show.bs.collapse', function(){
                $(this).closest('.panel-heading')
                       .find('.collapse-handle')
                       .removeClass(bs_addons.hasGlyphicons() ? 'glyphicon-collapse-down' : '')
                       .addClass(bs_addons.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up');
            });
            $('div[id^="panelBody"]').on('hide.bs.collapse', function(){
                $(this).closest('.panel-heading')
                       .find('.collapse-handle')
                       .removeClass(bs_addons.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up')
                       .addClass(bs_addons.hasGlyphicons() ? 'glyphicon-collapse-down' : '');
            });
            bs_addons.collapsePanelsInit = true;
        }
    }
};
