
/托拽生成/
function drag(){
    var drag = $('.box_NameList_centent ul');
    var dragFatherH = $('.box_NameList_centent')[0].clientHeight;
    var div = $('.box_NameList_centent_float');
    var dragNum = 0;
    var open = true;
    var num = 0;
    var numBj = Number.parseInt(drag.css('height'))-Number.parseInt(dragFatherH);
    function _preventDefault(e) { e.preventDefault(); }//禁止触摸用
    if(drag[0].clientHeight>dragFatherH){
        $('.box_NameList_centent_strip').show();
        $(drag)[0].addEventListener('touchstart',function(ev){
            dragNum = ev.changedTouches[0].clientY;
            num = Number.parseInt($(drag).css('top'));  
        });

        $(drag)[0].addEventListener('touchmove',function(ev){
            //当滑动名单时候屏幕互动自动静止
            document.body.style.overflow = 'hidden';
            window.addEventListener('touchmove', _preventDefault);
            var dragNumY = ev.changedTouches[0].clientY;
            var topNum = dragNum-dragNumY;
            var topNum1 = num-(topNum);
            if(topNum1 <= -numBj){
                topNum1 = -numBj;
            }else if(topNum1 >= 0){
                topNum1 = 0
            }
            $(drag).css('top',topNum1);
            $(div).css('top',-topNum1*1.33)
        });
        $(drag)[0].addEventListener('touchend',function(ev){
             //当滑动名单结束时候屏幕可以滑动
            document.body.style.overflow = 'auto';
            window.removeEventListener('touchmove', _preventDefault);
        });
        
    }else{
        return
    }
    
};
$(document).ready(function(){
    drag();
})

