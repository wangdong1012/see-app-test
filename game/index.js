window.onload=function(){


    $('li').on('touchstart',function(){
        $(this).find('img').stop().animate({width:0},100,function(){
            $(this).hide().next().show();
            $(this).next().animate({width:'16.25rem'},100,function(){
                $('.box1').css('display','none');
                $('.box2').show(1,function(){
                    $('.box2').addClass('box3')
                })
            });
        });




    });
    // var turn = function(target,time,opts){
    //     target.find('li').on('touchstart',function(){
            
    //     })
    // }



    

    // var verticalOpts = [{'width':0},{'width':'16.25rem'}];

    // turn($('.brand ul'),100,verticalOpts);
    // $('.mr').on('touchstart',function(){
    //   console.log(123)
    // })
}