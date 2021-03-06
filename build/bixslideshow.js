/* *
 *  bixslideshow.js
 *  Created on 18-8-14 23:06
 *  
 *  @author Matthijs Alles
 *  @copyright Copyright (C)2014 Bixie.nl
 *
 *  uses dotnav css component
 */


(function (addon) {
    "use strict";

    var component;

    if (jQuery && jQuery.UIkit) {
        component = addon(jQuery, jQuery.UIkit);
    }

    if (typeof define == "function" && define.amd) {
        define("uikit-bixslideshow", ["uikit"], function () {
            return component || addon(jQuery, jQuery.UIkit);
        });
    }


})(function ($, UI) {

    UI.component('bixslideshow', {

        defaults: {
            delay: 5000,
            nav: true
        },

        init: function () {
            var $this = this, i = 0;
            //init nav
            this.navList = $('<ul class="uk-dotnav"></ul>').css({
                position: 'absolute', bottom: '0px'
            }).on('mouseenter mouseleave', function (e) {
                $this.blocked = e.type == 'mouseleave';
            });
            //get slides
            this.slides = {};
            this.find('> div').hide().each(function () {
                $this.navList.append($('<li><a href="#">Slide ' + (i + 1) + '</a></li>').data('bixSlideIndex', i).click(function (e) {
                    e.preventDefault();
                    $this.showSlide($(this).data('bixSlideIndex'));
                }));
                $this.slides[i] = $(this);
                i++;
            });
            //init vars
            this.currentIndex = -1;
            this.count = i;
            this.blocked = false;
            this.showSlide(0);
            //slide it!
            setInterval(function () {
                var index = $this.currentIndex < ($this.count - 1) ? $this.currentIndex + 1 : 0;
                $this.showSlide(index);
            }, this.options.delay);
            //show nav
            if (this.options.nav) {
                this.element.append(this.navList);
            }
            //prevent slide when mouse is in
            this.element.on('mouseenter mouseleave', function (e) {
                $this.blocked = e.type == 'mouseenter';
            });

        },
        showSlide: function (index) {
            if (index == this.currentIndex || this.blocked) return;
            if (this.currentIndex !== -1) this.slides[this.currentIndex].fadeOut();
            this.currentIndex = index;
            this.slides[index].show();
            this.navList.find('li').removeClass('uk-active');
            this.navList.find('li:nth-child(' + (index + 1) + ')').addClass('uk-active');
            //fire scrollspy elements in slide
            UI.$doc.trigger('uk-scroll');
        }
    });

    // init code
    UI.ready(function (context) {

        $("[data-bix-slideshow]", context).each(function () {

            var $ele = $(this);

            if (!$ele.data("bixslideshow")) {
                UI.bixslideshow($ele, UI.Utils.options($ele.attr('data-bix-slideshow')));
            }
        });

    });

    return $.fn.ukbixslideshow;
});
