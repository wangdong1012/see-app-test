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
        <h4>暂无数据</h4>
        <div class="caption_content">
            <span>
            ${json.msg}
            </sapn>
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
            $(img).css({'width':box_width,'height':(box_height/realWidth)*realHeight,'top':-((box_height/realWidth)*realHeight-box_height)/2,'opacity':1});//设置图片相对自己位置偏移为img标签的高度-宽度的一半
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
    });
    
    
});