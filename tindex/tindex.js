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
            // $(img).css();//等比缩放宽度
            // $(img).css();//跟div高度一致
            $(img).css({'width':(box_width/realHeight)*realWidth,'height':box_height,'left':-((box_width/realHeight)*realWidth-box_width)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的宽度-高度的一半
        }else if (realWidth < realHeight){
            // $(img).css();//跟div高度一致
            // $(img).css();//等比缩放高度
            $(img).css({'width':box_width,'height':(box_height/realWidth)*realHeight,'top':-((box_height/realWidth)*realHeight-box_height)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的高度-宽度的一半
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


function strPj(arrList){
    var urls = [];
    var uls=[];
    var str='';
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
        urls.push(b.img_lists[0].url);
        
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
                <img src="${b.img_lists[0].url}" alt="第一张图">
                
            </div>
        <!-- 学校 -->
            <div class="content_school">
                <div class="content_school_left">
                    <i></i>
                    <span>${b.tab_area =="" ? "地球":b.tab_area}</span>
                </div>
                <div class="content_school_right">
                    <span>${b.see} </span>人阅读
                </div>
            </div>
            <!-- 详情 -->
            <div class="caption">
               <div class="caption_content">
                        ${b.msg}
                </div>
                <ul>
                    <li>二次元</li>
                    <li>手绘</li>
                    <li>萝莉</li>
                </ul>
            </div>
            <!-- 评论详细 -->
            ${uls[a] == undefined ? "":uls[a]}
        </li>`;
    });
    $('.content ul').html(str);
    $(urls).each(function(a,b){
        middle($('.content_img img').eq(a),b,$('.content_img').eq(a)[0].clientWidth,$('.content_img').eq(a)[0].clientHeight);
    })
};