window.onload=function(){
    var msg_id = window.location.search.substr(8);
    $.ajax({
        type:"GET",
        url:"http://www.xintusee.com/IOS/User/system_msg_info.html",
        data:{
            'id':msg_id
        },
        dataType:"JSON",
        success:function(data){
            var json=data.result
            if(json.url==null){
                $('.img').hide(4)
            }else{
                $('.img img').attr('src',json.url);
            }
            $('.title').html(json.title);
            $('.msg').html(json.msg);
        }
    });

    var headX=0;
    var headY=0;
    $('.foot')[0].addEventListener('touchstart',record);
    $('.img')[0].addEventListener('touchstart',record);
    function record(ev){
        headX = ev.changedTouches[0].clientX;
        headY = ev.changedTouches[0].clientY;
    }

    $('body')[0].addEventListener('touchend',function(ev){
        var headXx = ev.changedTouches[0].clientX;
        var headYy = ev.changedTouches[0].clientY;
        if(Math.abs(headX - headXx)<10&&Math.abs(headY - headYy)<10){
            var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if(isiOS){
                window.webkit.messageHandlers.messageDetailClick.postMessage('');
            }else{
                nativeMethod.toActivity('');
            }
        }else{
            return
        }
    });
};