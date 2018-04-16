window.onload = function(){
    //轮播图
    var imgList = [{'url':'./img/zjdqj.jpg','msg':'1'},{'url':'./img/21.jpg','msg':'2'},{'url':'./img/3.bmp','msg':'3'},{'url':'./img/4.bmp','msg':'4'},{'url':'./img/5.jpg','msg':'5'}];

    fnMake(imgList);
    function fnMake(imgList){
        var strimg='';
        var stra='';
        $('.conment_top_left ul').css('width',(imgList.length+1)*415);
        $(imgList).each(function(a,b){
            strimg+='<li><img src="'+b.url+'" alt="'+b.msg+'"></li>';
            stra+='<a href="javascript:;"></a> ';
        });
        $('.conment_top_left ul').html(strimg+'<li><img src="'+imgList[0].url+'" alt="'+imgList[0].msg+'"></li>');
        $('.yuan').html(stra);
    };    
   



    var num=0;
    var numYuan=0;
    var moveOff=true;
    
    var time = setInterval(function(){
        sub();
    },3000)   

    $('.left').on('click',function(){
        clearInterval(time);
        if(moveOff){
            moveOff=false;
            sub();
        }else{
            return
        }
    });
    
    $('.right').on('click',function(){
        clearInterval(time);
        if(moveOff){
            moveOff=false;
            add();
        }else{
            return
        }
    });  
    
    $('.yuan a').on('mouseover',function(){
        clearInterval(time);
        $('.yuan a').eq(numYuan).css('opacity','.3');
        $(this).css('opacity','1');
        $('.conment_top_left ul').stop().animate({'left':$(this).index('.yuan a')*-415},400);
        numYuan = $(this).index('.yuan a');
        num=numYuan;
    });



    function sub(){
        $('.yuan a').eq(numYuan).css('opacity','.3');
        num >= imgList.length ? imgList.length : num++;
        $('.conment_top_left ul').animate({'left':num*-415},800,function(){
           moveOff = true;
            if(numYuan>=imgList.length-1){
                numYuan=0;
            }else{
                numYuan++;
            }
           $('.yuan a').eq(numYuan).css('opacity','1');
           if(num>=imgList.length){
                $('.conment_top_left ul').css('left','0px');
                num = 0;
           }
        })
    };

    function add(){
        $('.yuan a').eq(numYuan).css('opacity','.3')
        if(num <=0){
            num = imgList.length;
            $('.conment_top_left ul').css('left',5*-415);
            num--
        }else{
            num--
        }
        $('.conment_top_left ul').animate({'left':num*-415},800,function(){
            moveOff = true;
            if(numYuan<=0){
                numYuan=imgList.length-1;

            }else{
                numYuan--;
            }
            $('.yuan a').eq(numYuan).css('opacity','1');
        })
    };



};