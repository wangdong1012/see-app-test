$.ajax({
    type:"POST",
    url:"/IOS/Text/getReviewList.html",
    data:{
        text_id:text_id
    },
    dataType:'JSON',
    async:false,
    success:function(data){
        var comment = data.result;
        var str = '';
        $('.see_num2').html(comment.total);
        $(comment.lists).each(function(a,b){
            str += '<li><span class="span1">'+b.nickname+'</span><span class="span2">：</span><span class="span3">'+b.content+'</span></li>'
        });
        $('.comment ul').html(str);
    }
});

function imgs(json){
    var str = '';
    $(json.img_lists).each(function(a,b){
        urls.push(b.url);
        str += '<li><img src="'+b.url+'" alt="'+b.img_id+'"></li>'
    });
    
    return str
};

function caption(json){
    var li = '';
   $( json.tab_lists).each(function(a,b){
       li += '<li>'+b.text+'</li>'
   });

    var str = `<!-- 图说描述 -->
    <div class="caption">
        <div class="caption_content">
            ${json.msg}
        </div>
        <ul>
            ${li}
        </ul>
    </div>`

    return str
};

function user(json){

    var str = `<!-- 用户信息 -->
    <div class="user">
        <div class="user_bor">
            <div class="img">
                <img src="${json.head_img_url}">
            </div>
            <div class="middle">
                <div class="middle_name">${json.nickname}</div>
                <div class="middle_describe">暂无数据</div>
            </div>
            <div class="right">
                关注
            </div>
        </div>
    </div>`

    return str
};


// 图片处理函数
function middle(img,img_url,box_width,box_height){
    var image = new Image();
    var realWidth = 0;//储存图片实际宽度
    var realHeight = 0;//储存图片实际高度
    //获取图片的宽高
    image.src = img_url;
    //加载成功的处理
    image.onload = function () {
        realWidth = image.width;//获取图片实际宽度
        realHeight = image.height;//获取图片实际高度
        //让img的宽高相当于图片实际宽高的等比缩放，然后再偏移
        if (realWidth > realHeight){
            // $(img).css();//等比缩放宽度
            // $(img).css();//跟div高度一致
            $(img).css({'width':(box_width/realHeight)*realWidth,'height':box_height,'left':-((box_width/realHeight)*realWidth-box_width)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的宽度-高度的一半
        }else if (realWidth < realHeight){
            // $(img).css();//跟div高度一致
            // $(img).css();//等比缩放高度
            $(img).css({'width':box_width,'height':(box_width/realWidth)*realHeight,'top':-((box_width/realWidth)*realHeight-box_height)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的高度-宽度的一半
            // $(img).css({'width':box_width,'height':(box_height/realWidth)*realHeight,'top':-((box_height/realWidth)*realHeight-box_height)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的高度-宽度的一半
        }else {
            $(img).css({'width':box_width,'height':box_height,'opacity':'1'})
        }
    };
    //图片加载失败的处理
    img.onerror = function () {
        img.src = img_url;
        $(img).css({'width':box_width,'height':box_height,'opacity':'1'});
    }
};


$('body').ready(function(){
    $('.open span').on('touchstart',function(){
        $('.imgs').css({'max-height':'999999999999px','overflow':'visible'});
        $('.user').show();
        $('.caption').show();
        $(this).hide();
        return false; //阻止事件冒泡
    });
    
    $('.head h1').on('touchend',function(){
        if($('.xz').length==0){
            $(this).addClass('xz');
            this.addEventListener('transitionend',function(){
                $(this).removeClass('xz');
            });
        }
        return false; //组织事件冒泡
    });
  
});

   

    //所有点击触摸交互
    function fnshow(imgWidth){
        var handY = 0;
        function _preventDefault(e) { e.preventDefault(); }//禁止触摸用
        var ev = '';
        var evnum = '';
        $('.imgs').eq(0)[0].addEventListener('touchstart',fnstratBody,false);
        // 点击body
        function fnstratBody(ev){
            handY = ev.changedTouches[0].clientY;
        };
        $('.imgs ul li').on('touchstart',function(){
            evnum = $(this).index('.imgs ul li');
        })
        $('.imgs')[0].addEventListener('touchend',fnend,false);

        // 抬起函数
        function fnend(ev){
            var handYy = ev.changedTouches[0].clientY;
            if(handYy-handY<10&handYy-handY>-10){
                document.body.style.overflow = 'hidden';
                window.addEventListener('touchmove', _preventDefault);
                $('.ul').css('left',-evnum*imgWidth);
                $('.hide_foot li').eq(evnum).css('opacity',1);
                $('.hide').show();
                $('.hide_foot ul').css({'margin-left':-$('.hide_foot ul')[0].clientWidth/2});
                $('.li img').each(function(a,b){
                    $(this).css('margin-top',-$(this)[0].clientHeight/2);
                });

                //禁用图片点击
                $('.imgs')[0].removeEventListener("touchend", fnend, false); 
                $('.imgs').eq(0)[0].removeEventListener('touchstart',fnstratBody,false);
                //激活图片轮播
                $('.hide .ul')[0].addEventListener('touchstart',fnhandx,false);
                $('.hide .ul')[0].addEventListener('touchend',fnrecovery,false);
            }
        };

        var fnhadnx = '';
        var fnleft = '';
        //恢复记录坐标
        function fnhandx(ev){
            fnhadnx = ev.changedTouches[0].clientX;
            fnleft =Number.parseInt($('.hide .ul').css('left'))
        };

        $('.hide .ul')[0].addEventListener('touchmove',fnmove,false);

        function fnmove(ev){
            var handx = ev.changedTouches[0].clientX-fnhadnx;
            $('.hide .ul').css('left',handx+fnleft);
        };
        function fnrecovery(ev){
            var handx = ev.changedTouches[0].clientX;
            var timenum =(imgWidth - Math.abs(handx-fnhadnx))/(imgWidth/200);
            var timenum1 = 200-timenum;
            fnjz();
             if(handx-fnhadnx <5 & handx-fnhadnx>-5){
                $('.hide').hide();
                //移除当年事件
                $('.hide .ul')[0].removeEventListener('touchend',fnrecovery,false);
                $('.hide .ul')[0].removeEventListener('touchstart',fnhandx,false);

                //激活列表点击
                $('.imgs')[0].addEventListener('touchend',fnend,false);
                $('.imgs').eq(0)[0].addEventListener('touchstart',fnstratBody,false);
                //激活滑动屏幕
                document.body.style.overflow = 'auto';
                window.removeEventListener('touchmove', _preventDefault);
                $('.hide_foot li').eq(evnum).css('opacity','');

            }else if(handx-fnhadnx<150&handx-fnhadnx>5||handx-fnhadnx>-150&handx-fnhadnx<-5){
                
                $('.hide .ul').animate({'left':fnleft},timenum1,function(){
                    fnjh();
                });
            }else if(handx-fnhadnx>150){
                $('.hide_foot li').eq(evnum).css('opacity','');

                $('.hide .ul').stop().animate({'left':(fnleft+imgWidth)>=0 ? 0 : fnleft+imgWidth},timenum,function(){
                    evnum <= 0 ? 0 : evnum--;
                    $('.hide_foot li').eq(evnum ).css('opacity','1');
                    fnjh();
                });
            }else if(handx-fnhadnx<-150){
                $('.hide_foot li').eq(evnum).css('opacity','');
                $('.hide .ul').stop().animate({'left':(fnleft+(-imgWidth))<=-imgWidth*($('.ul li').length-1) ? -imgWidth*($('.ul li').length-1) : fnleft+(-imgWidth)},timenum,function(){
                    evnum >=$('.ul li').length-1 ? $('.ul li').length-1:evnum++;
                    $('.hide_foot li').eq(evnum ).css('opacity','1');
                    fnjh();
                });
            }
        };
        function fnjh(){
            $('.hide .ul')[0].addEventListener('touchmove',fnmove,false);
            $('.hide .ul')[0].addEventListener('touchstart',fnhandx,false);
            $('.hide .ul')[0].addEventListener('touchend',fnrecovery,false);
        };
        function fnjz(){
            $('.hide .ul')[0].removeEventListener('touchmove',fnmove,false);
            $('.hide .ul')[0].removeEventListener('touchstart',fnhandx,false);
            $('.hide .ul')[0].removeEventListener('touchend',fnrecovery,false);
        };
    };

    
    function back(backHight,imgWidth,urls){
        
        $('.hide').css('height',backHight);
        $('.ul').css('width',imgWidth*urls.length);
        var str = '';
        var str1 = '';
        if(urls.length>1){
            for(var i=0;i<urls.length;i++){
                str += '<li></li>';
            }
            $('.hide_foot ul').html(str);
        }
        $(urls).each(function(a,b){
            str1 += '<li class="li" style="width:'+imgWidth+'px;"><img src="'+b+'"></li>' 
        });
        $('.ul').html(str1);
    };