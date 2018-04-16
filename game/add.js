window.onload = function(){
    off = true;
    $('.img_foot i').on('touchstart',function(event){
        if(off){
            $('.img_head img').css('display','none');
            $('.dw').css('display','none');
            $(this).removeClass('up');
            $('.img_head').css({'position':'absolute'})
        }else{
            $('.img_head img').css('display','');
            $('.dw').css('display','');
            $(this).addClass('up');
            $('.img_head').css('position','');
            $('.img_foot').css({'position':''})
        }
        off = !off
        return false
    });


    $('input')[0].addEventListener('change',readFile,false);
                
    function readFile(){
        var file = this.files[0];
        if(!/image\/\w+/.test(file.type)){
            alert("请确保文件为图像类型");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            console.log(this.result)
            var str = '<li><img src="'+this.result+'" alt="图片"></li>'
            $('.img_list ul').prepend(str)
        }
    }
};