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
        $('.panel.collapsable').each(function(){
            if( $(this).data('is-collapsable') == true ){
                return;
            }else{
                $(this).attr('data-is-collapsable', 'true');
            }
            var heading = $(this).find('.panel-heading');
            var body = $(this).find('.panel-body');
            var body_height = body.height();
            var body_top_padding = body.css('paddingTop');
            var body_bottom_padding = body.css('paddingBottom');
                body_height = body_height + parseInt(body_top_padding) + parseInt(body_bottom_padding);
                body.css({'overflow': 'hidden'});
            if( $(this).hasClass('closed') ){
                body.hide();
                body.css({
                    height: '0px',
                    paddingTop: '0',
                    paddingBottom: '0'
                });
            }
            if( body.is(':visible') ){
                heading.append(collapse_up);
            }else{
                heading.append(collapse_down);
            }
            heading.on('click', function(){
                if( body.is(':visible') ){
                    heading.find('.collapse-handle').removeClass($this.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up').addClass($this.hasGlyphicons() ? 'glyphicon-collapse-down' : '');
                    body.animate({
                        height: '0px',
                        paddingTop: '0',
                        paddingBottom: '0'
                    }, function(){
                        $(this).hide();
                    });
                }else{
                    heading.find('.collapse-handle').removeClass($this.hasGlyphicons() ? 'glyphicon-collapse-down' : '').addClass($this.hasGlyphicons() ? 'glyphicon-collapse-up' : 'caret-up');
                    body.show();
                    body.animate({
                        height: body_height + 'px',
                        paddingTop: body_top_padding,
                        paddingBottom: body_bottom_padding
                    });
                }
            });
        });
        if( this.collapsePanelsInit === false ){
            $('.modal').on('shown.bs.modal', function () {
                bs_addons.collapsePanels();
            });
            this.collapsePanelsInit = true;
        }
    }
};
