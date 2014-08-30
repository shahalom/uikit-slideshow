/* *
 *  FFmedia
 *  bixslidenav.js
 *  Created on 30-8-14 12:27
 *  
 *  @author Matthijs
 *  @copyright Copyright (C)2014 Bixie.nl
 *
 */

(function (addon) {
    "use strict";

    var component;

    if (jQuery && jQuery.UIkit) {
        component = addon(jQuery, jQuery.UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-bixslidenav", ["uikit"], function () {
            return component || addon(jQuery, jQuery.UIkit);
        });
    }


})(function ($, UI) {

    UI.component('bixslidenav', {

        defaults: {
            target: '#bix-slideshow',
            index: 0
        },

        init: function () {
            var $this = this, slideshowEle = $(this.options.target);
            //get/create slideshow
            this.slideshow = slideshowEle.data('bixslideshow') || UI.bixslideshow(slideshowEle, UI.Utils.options(slideshowEle.attr('data-bix-slideshow')));
            //set event
            this.on('click', function (e) {
                e.preventDefault();
                if ($.inArray($this.options.index,['prev', 'next']) > -1) {
                    var dir = $this.options.index == 'next' ? 1 : -1;
                    $this.slideshow.navigate(dir);
                } else {
                    $this.slideshow.showSlide($this.options.index);
                }
                //reset interval
                $this.slideshow.reset();
            });
            //unblock element when in slide
            if (this.element.closest('[data-bix-slideshow]').length) {
                this.on('mouseenter mouseleave', function (e) {
                    $this.slideshow.blocked = e.type == 'mouseleave';
                });
            }
        }
    });

    // init code
    UI.ready(function (context) {

        $("[data-bix-slidenav]", context).each(function () {

            var $ele = $(this);

            if (!$ele.data("bixslidenav")) {
                UI.bixslidenav($ele, UI.Utils.options($ele.attr('data-bix-slidenav')));
            }
        });

    });

    return $.fn.ukbixslidenav;
});
