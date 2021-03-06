$(window).load(function(){

    var animating = false;
    var menu = $(".side-nav");
    var activeMenuItem = $('.side-nav ul li.active');

    $('.side-nav ul li').not('.navigation ul li ul li').click(function(e){
        e.preventDefault();

        if(animating){
            return;
        }

        var delay = 0,
            el = $(this),
            color = $(this).find('.left-menu-item').css('background-color'),
            prev = $('.side-nav ul li:first'),
            distance = el.offset().top  - menu.offset().top,
            hasSubMenu = el.find('.sublevel-menu').length == 1,
            isActiveItem = el.hasClass('active'),
            url = el.find('a').attr('href');

        if($('.sublevel-menu').is(':visible')){
            $('.sublevel-menu').slideUp(function(){
                $(this).parent().find('.left-menu-item i').removeClass('fw-up').addClass('fw-down');
            });
            delay = 700;
        }

        if(isActiveItem && hasSubMenu){
            if(el.find('.sublevel-menu').is(':visible')){
                el.find('.sublevel-menu').slideUp(function(){
                    el.find('.left-menu-item i').removeClass('fw-up').addClass('fw-down');
                });
            }else{
                el.find('.sublevel-menu').slideDown(function(){
                    el.find('.left-menu-item i').removeClass('fw-down').addClass('fw-up');
                });
            }
            return;
        };

        if (el.prev().length > 0) {
            animating = true;
            $(el).find('.left-menu-item').css('background-color',color);
            $.when(
                el.delay(delay).animate({
                    top: -distance + 'px'
                },{
                    duration:0,
                    step:function(now,fx){
                        if(now == 0){
                            fx.end = -($(fx.elem).offset().top  - menu.offset().top);
                        }
                    }
                })
            ).done(function () {
                activeMenuItem.removeClass('active');
                el.insertBefore(prev).css('top','0px').addClass('active');
                //el.find('.left-menu-item').removeAttr('style');
                animating = false;

                if(hasSubMenu){
                    el.find('.sublevel-menu').slideDown(function(){
                        el.find('.left-menu-item i').removeClass('fw-down').addClass('fw-up');
                    });
                }

                el.is(':hidden') ? el.show():'';

                setTimeout(function(){
                    //location.replace(url);
                },500)

            });
        }
    }).children('.sublevel-menu').find('li').click(function(e){
        e.stopImmediatePropagation();
    });

    if(!activeMenuItem.is(':first-child')){
        activeMenuItem.trigger('click');
    }

});