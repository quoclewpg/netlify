/**
 * custom.js
 * custom JavaScript functions and plugin initialization
 */
$(function () {

    'use strict';

    /* Link highlight on scroll */

    function linkScrollSpy() {
        var navHeight = $('.navbar-header').outerHeight(),
            el = $('body');
        el.scrollspy({
            target: '.navbar',
            offset: navHeight + 1
        });
    }

    linkScrollSpy();


    /* Scroll to top button */

    function scrollToTop() {
        var btn = $('.scroll-to-top');
        btn.hide();
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                btn.fadeIn(300);
            } else {
                btn.fadeOut(300);
            }
        });
    }

    scrollToTop();


    /* Navbar Animation */

    function animateNav() {
        var offset = $(window).scrollTop(),
            target = $('body.enable-sticky-nav').find('.navbar');
        if (offset > 24) {
            target.addClass('nav-sticky');
        } else {
            target.removeClass('nav-sticky');
        }
    }

    animateNav();

    $(window).scroll(function () {
        animateNav();
    });

}); // end $(function () {})


$(document).ready(function () {

    'use strict';

    /* Form validation and submit */

    function formValidation() {
        var register_form = $('#register-form, #register-form-1, #register-form-2, #register-form-3, #register-form-4, #register-form-5');
        register_form.each(function () {
            var $this = $(this);
            $this.validate({

                // Validation rules
                rules: {
                    reg_name: {
                        required: true,
                        minlength: 2
                    },
                    reg_email: {
                        required: true,
                        email: true
                    },
                    reg_phone: {
                        required: true,
                        number: true,
                        minlength: 7
                    },
                    /*                    reg_check: {
                                            required: true
                                        }*/
                },

                // Validation error messages
                messages: {
                    reg_name: {
                        required: 'Your name is required',
                        minlength: 'Please enter at least 2 characters'
                    },
                    reg_phone: {
                        required: 'Your phone number is required',
                        number: 'Please enter only numbers',
                        minlength: 'Please enter at least 7 digits'
                    },
                    reg_email: {
                        required: 'Your email is required',
                        email: 'Please enter a valid email address'
                    },
                    /*                    reg_check: {
                                            required: 'This field is required'
                                        }*/
                },

                submitHandler: function (form) {
                    var $item = $(form),
                        output = '';

                    // Send Ajax post data
                    $.post($item.attr('action'), $item.serialize(), function (response) {

                        // Get response from server
                        if (response.type === 'error') {
                            output = '<div class="error-box">' + response.text + '</div>';
                        } else {
                            output = '<div class="success-box">' + response.text + '</div>';

                            // Reset form
                            form.reset();
                        }
                        $item.parent().parent().find('.result').hide().html(output).slideDown();
                    }, 'json');
                }
            });
        });
    }

    formValidation();


    /**
     * Smooth scrolling
     * Adapted from: http://css-tricks.com/snippets/jquery/smooth-scrolling/
     */

    function smoothLinkScroll() {
        var scroll_links = $("a[href*=#]:not([href=#], [role='tab'], .panel-title a)");
        scroll_links.each(function () {
            var $this = $(this);
            $this.click(function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash),
                        offset = $(".navbar-header").outerHeight();
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - offset + 1
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    }

    smoothLinkScroll();


    /**
     * Parallax Scrolling
     * Adapted from: http://code.tutsplus.com/tutorials/simple-parallax-scrolling-technique--net-27641
     */

    function parallaxScroll() {
        var section = $('section.parallax');
        section.each(function () {
            var $this = $(this),
                $offset = $this.data('speed') || 3,
                $window = $(window);

            function scrollbg() {
                var yPos = -(($window.scrollTop() - $this.offset().top) / $offset),
                    coords = '50% ' + yPos + 'px';
                $this.css({
                    backgroundPosition: coords
                });
            }
            scrollbg();
            $window.scroll(function () {
                scrollbg();
            });
        });
    }

    parallaxScroll();

    $(document).on('load', 'window', function () {
        parallaxScroll();
    });


    /* Image Background using data-background="xx" */

    function sectionbg() {
        var elem = $('.section');
        elem.each(function () {
            var $this = $(this),
                bgimage = $this.data('background');
            if (bgimage) {
                $this.css({
                    backgroundImage: 'url(' + bgimage + ')'
                });
            }
        });
    }

    sectionbg();


    /**
     * Animate items as they appear
     * uses jQuery viewport checker plugin
     */

    function animateWhenVisible() {
        var anim_items = $('.animated'),
            no_animation = $('body').hasClass('no-animation');
        if (anim_items.length && !no_animation) {
            anim_items.addClass('invisible').viewportChecker({
                classToAdd: null,
				classToRemove: null,
                offset: 100,
                callbackFunction: function (elem) {
                    var animclass = elem.data('animation'),
                        animdelay = elem.data('animdelay');
                    if (animdelay) {
                        setTimeout(function () {
                            elem.addClass('visible ' + animclass);
                        }, animdelay);
                    } else {
                        elem.addClass('visible ' + animclass);
                    }
                }
            });
        }
    }

    animateWhenVisible();


    /* Owl Slider and Carousel */

    function initOwlSliders() {
        var owl = $("#owl-slider, #owl-testimonials");
        if (owl.length) {
            owl.owlCarousel({
                singleItem: true,
                autoPlay: true,
                stopOnHover: true,
                navigation: false
            });
        }
    }

    initOwlSliders();

    function initOwlCarousels() {
        var owl = $(".carousel-only"),
            item_num = owl.data("items");
        if (owl.length) {
            owl.owlCarousel({
                items: item_num,
                itemsCustom: false,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [980, 3],
                itemsTablet: [768, 2],
                itemsTabletSmall: false,
                itemsMobile: [479, 1],
                singleItem: false,
                itemsScaleUp: false
            });
        }
    }

    initOwlCarousels();


    /* Tabs */

    function initTabs() {
        var tab_items = $('.nav-tabs a');
        tab_items.each(function () {
            var $this = $(this);
            $this.click(function (e) {
                e.preventDefault();
                $this.tab('show');
            });
        });
    }

    initTabs();

    /* Member profile actions */
    $(document).on("click", 'a.card-actions-trigger', function (e) {
        e.preventDefault();
        var t = $(this).parent().find('div.card-actions-overlay'),
            panels = $('div.card-actions-overlay');
        $(t).toggleClass('card-active');
        $(panels).not(t).removeClass('card-active');
    });

    /* Member actions submenu when clicking on document body */
    $(document).on("click", function () {
        $('.card-actions-overlay').removeClass('card-active');
    });

    /* Stop propagation for various selectors */
    $(document).on('click', 'a.card-actions-trigger', function (e) {
        e.stopPropagation();
    });


}); // end $(document).ready(function () {})