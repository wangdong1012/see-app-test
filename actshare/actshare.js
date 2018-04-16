  
function boxHead(json){
    
    var str = `<!-- 头部主图  -->
    <div class="head">
        <img src="${json.img_lists[0].url}" alt="活动主图">
    </div>
    <!-- 标题 -->
    <div class="title">
        <div class="title_activity">
            <h3>活 动</h3>
        </div>
        <div class="title_name">
            <h2 >
                ${json.name}
            </h2>
            <div class="title_tame">
                <i></i>
                <span>
                    ${json.start_time}至${json.end_time}
                </span>
            </div>
        </div>
    </div>   
    <!-- 参与 -->
    <div class="participate_in">
        <span class="left">参与</span>
        <span class="right">立即参与</span>
    </div>`

    return str
};

function ranking(json){
    var str = '';
    var name='';
    var num = json.length;
    if(num<3){
        num = json.length;
        name = 'mr0';
    }else{
        num = 3;
    }
    for(var i=num;i>0;i--){
        str += '<li class="l'+(i)+' '+name+'"><img src="'+glurl(json[i-1].head_img_url)+'"></li>';
    }
    return str
};

var json = '';
$.ajax({
type:"post",
url:"/IOS/Activity/Info.html",
data:{
    activity_id:Number.parseInt(activity_id)
}, 
dataType:'JSON',
success:function(data){
    $('.loging').css('display','none');
    $('.box').css('display','block');
    json = data.result;
    $('.box_head').html(boxHead(json));
    if(data.result.start_status==2){
        $('.participate_in .right').css({'background':'#e5e5e5','color':'#6c6c6c'});
    }else{
        //如果正在进行的活动点击立即参与可以触发
        $('.participate_in .right').on('touchstart',function(event){
                var str=window.location.search.substr()
                if(str.indexOf('source')<0){
                    new Mlink({
                        mlink: "https://skl3ip.mlinks.cc/Absb",
                        button: $(this),
                        autoLaunchApp : false,
                        autoRedirectToDownloadUrl: true,
                        downloadWhenUniversalLinkFailed: false,
                        inapp : false,
                        params: {'id':Number.parseInt(activity_id),'type':'activity'}
                    })
                 return
                }else if(str.substr(str.indexOf('source')+7,3)=='iOS'){
                    window.webkit.messageHandlers.webTopicPublishClick.postMessage(activity_id);
                }else if(str.substr(str.indexOf('source')+7,3)=='an'){
                    nativeMethod.toActivity(activity_id);
                }
                event.preventDefault();
            });
    }
    //生成页面
    $('.box_ranking_right ul').html(ranking(json.like_lists));

    $('.box_rule_content').html(json.bewrite);
    $('.box_introduce_content').html(json.prize);
    //跳转原生人物列表
    fnlike();
    function fnlike(){
        var headY=0;
        var headX = 0;
        var str=window.location.search.substr();
               
        $('.box_ranking_right')[0].addEventListener('touchstart',function(ev){
            headX = ev.changedTouches[0].clientX;
            headY = ev.changedTouches[0].clientY;
        });
        
        $('.box_ranking_right')[0].addEventListener('touchend',function(ev){
            var headYy = ev.changedTouches[0].clientY;
            var headXx = ev.changedTouches[0].clientX;
            if(Math.abs(headY-headYy)<10&&Math.abs(headX-headXx)<10){
                if(str.indexOf('source')<0){
                    return
                }else if(str.substr(str.indexOf('source')+7,3)=='iOS'){
                    window.webkit.messageHandlers.webActivityRankingClick.postMessage(activity_id);
                }else if(str.substr(str.indexOf('source')+7,3)=='an'){
                    nativeMethod.toActivity(activity_id);
                }
            }else{
                return
            }
        });
    };
   
//获取人数
    $.ajax({
        type:"post",
        url:"/IOS/Activity/apply_users.html",
        data:{
            activity_id:Number.parseInt(activity_id)
        },
        dataType:'JSON',
        success:function(data){
            $('.left').html(data.result.total+' 参与');
        }
    });
}
});
//生成列表视图
var pjajaxNum=1;
var str=window.location.search.substr();
function pjajax(fn){
    $.ajax({
        type:"post",
        url:"applytNew.html",
        data:{
            activity_id:Number.parseInt(activity_id),
            user_id:str.indexOf('uid')<0? 0:Number.parseInt(str.substring(str.indexOf('uid')+4)),
            page:pjajaxNum
        }, 
        dataType:'JSON',
        success:function(data){
            imgLists(data.result.lists);
            //点赞
            
            var headY=0;
            var headX = 0;
            var num= 0;
            $('.imgList_head_right').each(function(a,b){
                b.addEventListener('touchstart',function(ev){
                    headX = ev.changedTouches[0].clientX;
                    headY = ev.changedTouches[0].clientY;
                    num = a;
                });
            });

            
            $('.imgList_head_right').each(function(a,b){
                b.addEventListener('touchend',function(ev){
                    var headYy = ev.changedTouches[0].clientY;
                    var headXx = ev.changedTouches[0].clientX;
                    if(Math.abs(headY-headYy)<10&&Math.abs(headX-headXx)<10){
                        if( $('.imgList_head_right img').eq(num).attr('src')=='/Public/home/img/redxin.png'){
                            return
                        }else{
                            if(str.indexOf('source')<0){
                                return
                            }else{
                                $('.imgList_head_right span').eq(num).html( $('.imgList_head_right span').eq(num).html()*1+1);
                                $('.imgList_head_right img').eq(num).attr('src','/Public/home/img/redxin.png');
                                $.ajax({
                                    type:"post",
                                    url:"/IOS/Text/like.html",
                                    data:{
                                        from_id:str.substring(str.indexOf('uid')+4),
                                        text_id:$('.imgList_head_right img').eq(a).attr('alt')
                                    }, 
                                    dataType:'JSON',
                                    success:function(data){
                                        console.log(data.info=='成功')
                                    }
                                });
                            }
                            
                        }


                    }
                    
                }); 
            });
            //图说调用
           
            $('.imgList_img img').each(function(a,b){
                b.addEventListener('touchstart',function(ev){
                    headX = ev.changedTouches[0].clientX;
                    headY = ev.changedTouches[0].clientY;
                    num = a;
                });
            });

            $('.imgList_img img').each(function(a,b){
                b.addEventListener('touchend',function(ev){
                    var headYy = ev.changedTouches[0].clientY;
                    var headXx = ev.changedTouches[0].clientX;
                    if(Math.abs(headY-headYy)<10&&Math.abs(headX-headXx)<10){
                        if(str.indexOf('source')<0){
                            window.location.href="http://www.xintusee.com/IOS/Text/testshare.html?text_id="+$(this).attr('alt');
                            return
                        }else if(str.substr(str.indexOf('source')+7,3)=='iOS'){
                            window.webkit.messageHandlers.webActivityTextClick.postMessage($(this).attr('alt'));
                        }else if(str.substr(str.indexOf('source')+7,3)=='an'){
                            nativeMethod.toActivity($(this).attr('alt'));
                        }
                    }else{
                        return
                    }
                    
                }); 
            });

            //上啦刷新后回掉函数
            pjajaxNum++;
            if(typeof(fn)=='function'){
                fn();
            }
        }
    });
    
};

function _preventDefault(e) { e.preventDefault();}//禁止触摸用
//小图初始化
function glurl(str){
    var url = str.indexOf('www');
    var num = str.lastIndexOf('.');
    if(str=='http://www.xintusee.com/Public/static/img/default_head.jpg'){
        return str
    }else{
        if(url>=0){
            return str.substring(0,num)+'-260-260.png';
        }else{
            return str+'_min';
        }
    }
};
//中图初始化
function glurlMiddle(str){
    var url = str.indexOf('www');
    var num = str.lastIndexOf('.');
    if(str=='http://www.xintusee.com/Public/static/img/default_head.jpg'){
        return str
    }else{
        if(url>=0){
            return str.substring(0,num)+'-768-720.png';
        }else{
            return str+'_middle';
        }
    }
};
    //调用列表视图
    pjajax(123);
    //列表视图生成函数
    var urls=[];
    function imgLists(json){
        var str='';
        $(json).each(function(a,b){
            if(b.img_lists==undefined){
                return
            }else{
                str+=`<li>
                <div class="imgList_head">
                        <div class="imgList_head_left">
                            <img src="${glurl(b.head_img_url)}" alt="">
                            <span>${b.nickname}</span>
                        </div>
                        <div class="imgList_head_right">
                            <img src="${b.like_status==1?'/Public/home/img/redxin.png':'/Public/home/img/xin.png'}" alt="${b.text_id}">
                            <span>${b.like_count}</span>
                        </div>
                    </div>
                    <div class="imgList_img">
                        <img src="${ glurlMiddle(b.img_lists[0])}" alt="${b.text_id}">
                    </div>
                    <div class="content_school">
                        <div class="content_school_left">
                            <i></i>
                            <span>${b.tab_area == '' ? '地球':b.tab_area}</span>
                        </div>
                        <div class="content_school_right">
                            ${b.create_time_info}
                        </div>
                    </div>
                    <div class="caption_content">
                        ${b.msg}
                    </div>
                </li>`
                urls.push(glurlMiddle(b.img_lists[0]));
            }
               

        });
        $('.imgList ul').html( $('.imgList ul').html()+str);

        $(urls).each(function(a,b){
            middle($('.imgList_img img').eq(a),b,fontNum*36.76,fontNum*24.375);
        });
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
            if(realWidth/realHeight>=1.51){
                $(img).css({'width':(box_height/realHeight)*realWidth,'height':box_height,'left':-((box_height/realHeight)*realWidth-box_width)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的宽度-高度的一半
            }else{
                $(img).css({'width':box_width*1.51,'height':box_height*1.51,'left':-(box_width*1.51-box_width)/2,'top':-(box_height*1.51-box_height)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的宽度-高度的一半
            }
        }else if (realWidth < realHeight){
            $(img).css({'width':box_width,'height':(box_width/realWidth)*realHeight,'top':-((box_width/realWidth)*realHeight-box_height)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的高度-宽度的一半
        }else {
           
            $(img).css({'width':box_width,'height':box_height,'opacity':'1'})
        }
    };
    //图片加载失败的处理
    img.onerror = function () {
        img.src = img_url;
        $(img).css({'width':box_width,'height':box_height,'opacity':'1'})
    }
};

window.onload = function(){
    
    //活动奖品函数
    function pjjp(json){
        var str='';
        $(json).each(function(a,b){
            str+=`<li>
                    <h4>${b.prize_grade_name}</h4>
                    <div>
                        <img src="${b.url}" alt="iphone">
                    </div>
                    <span>${b.prize_name}</span>
                </li>`;
        });
        $('.box_reward ul').html(str);
    };

//活动名单函数
    function pjmd(json){
        var str='';
        $(json).each(function(a,b){
            
            str+=`<li>
                    <img src="${glurl(b.head_img_url)}" alt="头像">
                    <span>${b.nickname}</span>
                    <div class="right">
                        <h4>${b.description}</h4>
                    </div>
                </li>`;
        });
        $('.box_NameList_centent ul').html(str);
    };

    

 //奖品和名单调用
    $.ajax({
        type:"post",
        url:"activityPrize.html",
        data:{
            activity_id:Number.parseInt(activity_id)
        }, 
        dataType:'JSON',
        success:function(data){
            if(data.result.length==0){
                $('.box_reward').css('display','none');
            }else{
                pjjp(data.result);
                $('.box_reward').show(100);
            }
            
        }
    });

    $.ajax({
        type:"post",
        url:"activityWinners.html",
        data:{
            activity_id:Number.parseInt(activity_id)
        }, 
        dataType:'JSON',
        success:function(data){
            if(data.result.length==0){
                $('.box_NameList').css('display','none');
            }else{
                pjmd(data.result);
                $('.box_NameList').show(100);
                drag();
            }
            
        }
    });
    //判断是否ios写注意
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isiOS){
        $('.box_foot span').html( $('.box_foot span').html()+'本活动最终解释权归看见app所有，与苹果公司无关。')
    }else{
        $('.box_foot span').html( $('.box_foot span').html()+'本活动最终解释权归看见app所有。')
    }

    //上啦无限刷新
    var num =0;
    var off = true;
    
    $('body').on('touchmove',function(){
        num = document.body.scrollTop-(Number.parseInt($('.box_foot').offset().top)-window.innerHeight);
    
        if(num >= $('.box_foot')[0].clientHeight&off){
            off = false;
            pjajax(function(){
                $('.f5').hide();
                off = true;
            });
            $('.f5').show();

        }
    })
};





//拖拽 获奖名单
function drag(){
    var drag = $('.box_NameList_centent ul');
    var dragFatherH = $('.box_NameList_centent')[0].clientHeight;
    var div = $('.box_NameList_centent_float');
    var dragNum = 0;
    var open = true;
    var num = 0;
    var numBj = Number.parseInt(drag.css('height'))-$('.box_NameList_centent_strip').height();

    var hdbl = ($('.box_NameList_centent_strip').height()-$('.box_NameList_centent_float').height())/numBj;//滑动比例

    function preventDefault(e) { e.preventDefault(); }//禁止触摸用
    
    if(drag[0].clientHeight> $('.box_NameList_centent_strip').height()){
        $('.box_NameList_centent_strip').show();
        $(drag)[0].addEventListener('touchstart',function(ev){
            dragNum = ev.changedTouches[0].clientY;
            num = Number.parseInt($(drag).css('top'));  
            $('body')[0].addEventListener('touchmove',preventDefault,{passive:false});
        });

        $(drag)[0].addEventListener('touchmove',function(ev){
            //当滑动名单时候屏幕互动自动静止
            document.body.style.overflow = 'hidden';
            // window.addEventListener('touchmove', _preventDefault);
            var dragNumY = ev.changedTouches[0].clientY;
            var topNum = dragNum-dragNumY;
            var topNum1 = num-(topNum);
            if(topNum1 <= -numBj){
                topNum1 = -numBj;
            }else if(topNum1 >= 0){
                topNum1 = 0
            }
            $(drag).css('top',topNum1);
            $(div).css('top',-topNum1*hdbl)
        });

        $(drag)[0].addEventListener('touchend',function(ev){
            // 当滑动名单结束时候屏幕可以滑动
            document.body.style.overflow = 'auto';
            // window.removeEventListener('touchmove', _preventDefault);
            $('body')[0].removeEventListener('touchmove',preventDefault);
        });
        
    }else{
        $('.box_NameList_centent ul').css('position','relative');
        return
    }
    
};
