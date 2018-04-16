// css出来初始化
function setCss(){
    var time = setInterval(function(){
        $('.head_top img').css('marginTop',-($('.head_top img')[0].clientHeight/2));
        if($('.head_top img').css('marginTop')!='0px'){
            $('.head_top img').css('opacity',1);
            clearInterval(time)
        }
    },100)
};

setCss();


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

var urls = [];
function strPj(data){
    var uls=[];
    var str='';
    var arrList = data.result;
    $(arrList.lists).each(function(a,b){
        var text_id = b.id;
        $.ajax({
            type:"POST",
            url:"/IOS/Text/getReviewList.html",
            data:{
                text_id:text_id
            },
            dataType:'JSON',
            async:false,
            success:function(data){
                var li='';
                var arr = data.result.lists;
                 if(arr.length){
                    $(arr).each(function(a,b){
                        li +=`<li>
                            <span class="span1">${b.nickname}</span>
                            <span class="span2">：</span>
                            <span class="span3">${b.content}</span>
                        </li>`
                    })  
                    uls.push(' <div class="comment"><ul>'+li+'</ul></div>');
                }else{
                    uls.push(" ")
                }
            }
        });
        urls.push(b.url == undefined ? b.img_lists[0].url : b.url);
        str += `<li class="li">
            <div class="content_head">
                <div class="content_head_user">
                    <img src="${user_img}" alt="">
                    <span>${user_name}</span>
                </div>
                <div class="content_head_time">
                    ${b.create_time_info}
                </div>
            </div>
            <!-- 图片 -->
            <div class="content_img">
                <span class="${b.ltype=="topic" ? "show":"hide"}"></span>
                <img type="${b.ltype}" id="${b.id}" src="${b.url == undefined ? b.img_lists[0].url : b.url}" alt="第一张图">
            </div>
        <!-- 学校 -->
            <div class="content_school">
                <div class="content_school_left">
                    <i></i>
                    <span>${b.area =="" || b.area ==null ? "地球":b.area}</span>
                </div>
                <div class="content_school_right">
                    <span>${b.see} </span>人阅读
                </div>
            </div>
            <!-- 详情 -->
            <div class="caption">
               <div class="caption_content">
                    ${b.msg == undefined ? b.description:b.msg}
                </div>
                <ul>${fnbq(b.tab_lists)}</ul>
            </div>
            <!-- 评论详细 -->
            ${uls[a] == undefined ? "":uls[a]}
        </li>`;
    });
    $('.content ul').html($('.content ul').html()+str);



    $('.content_img img').each(function(a,b){
            var headY=0;
            var headX = 0;
            var num= 0;
            var that='';
            b.addEventListener('touchstart',function(ev){
                headX = ev.changedTouches[0].clientX;
                headY = ev.changedTouches[0].clientY;
                num = a;
                that =this;
            });
            
            b.addEventListener('touchend',function(ev){
                var headYy = ev.changedTouches[0].clientY;
                var headXx = ev.changedTouches[0].clientX;
                if(Math.abs(headY-headYy)<10&&Math.abs(headX-headXx)<10){
                    new Mlink({
                        mlink: "https://skl3ip.mlinks.cc/Absb",
                        button: $(that),
                        autoLaunchApp : false,
                        autoRedirectToDownloadUrl: true,
                        downloadWhenUniversalLinkFailed: false,
                        inapp : false,
                        params: {'id':$(that).attr('id'),'type':$(that).attr('type')}
                    })
                }
            }); 
    });

    $('.head_foot span').html(data.result.total);

    $(urls).each(function(a,b){
        middle($('.content_img img').eq(a),b,$('.content_img').eq(a)[0].clientWidth,$('.content_img').eq(a)[0].clientHeight);
    })
};

function fnbq(tab){
    var str='';
    if(tab.length<=0){
        return ''
    }else{
        $(tab).each(function(a,b){
            str+='<li>'+b.text+'</li>';
        });
        return str
    }
    
};
$('body').ready(function(){
    var num =0;
    var off = true;
    
    $(this).on('touchmove',function(){
        num = $(this).scrollTop()-(Number.parseInt($('.foot').offset().top)-window.innerHeight);
        if(num >= $('.foot')[0].clientHeight&off){
            off = false;
            ajax(function(){
                $('.f5').hide();
                off = true;
            });
            $('.f5').show();

        }
    })
})