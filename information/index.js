// window.onload=function(){
//     $('.flex').css('height',document.body.scrollHeight);
//     var obj = {
//         '0':{
//             'title':'小见抖着单子问一下，这位同学你可否有性别？',
//             'cotent':['男','女','其他'],
//             'off':true
//         },
//         '1':{
//             'title':'那么顺便也告诉小见你学校吧，我打算悄悄地潜入进去认识你',
//             'cotent':[],
//             'off':false,
//             'nr':'嘿嘿，我记下来咯，下次小见去你们学校，记得出来见我哦，一定要和我打招呼。'
//         },
//         '2':{
//             'title':'梦想的有啊！万一见鬼了呢。我先许为敬，我希望你能喜欢我。',
//             'cotent':[],
//             'off':false,
//             'nr':'小见不能这么主动的帮你去实现愿望，但是我希望你的愿望可以早日实现。'
//         },
//     };

//     fnmake($('.question').eq(0),$('.smallsee_say span').eq(0),footstr,obj[0].title,obj[0].cotent);
//     var off = false;
//     var num = $('.box')[0].scrollHeight;
    
//     function fnmake(ev,ev1,fn,title,cotent){
//         var stri = '';
//         $(ev).show(function(){
//             $(".box").scrollTop($('.box')[0].scrollHeight-num);
//             var time = setTimeout(function(){
//                     clearInterval(time);
//                     $(ev1).html(title);
//                     if(typeof(fn)=='function'){
//                         fn(cotent);
//                     }else{
//                         return off = true;
//                     }
//             },800);
//         });
//     };
    

//     function footstart(){
//         $('.send_out').show();
//         if( $('.choice').html()=='消失'){
//             $('input').on('focus',function(){
//                 setTimeout(function(){
//                     // $('.foott').show(4);
//                     // $('.foott').scrollIntoView(true); 
//                     // setTimeout(function(){
//                         // alert(123)
//                     //     $('.foott').hide();
//                     // },300)
                   
                  
//                 },300)
                
//             });
//             $("input").on('input',function(){
//                $('.text').html($(this).val());
//             });
//         }else{
//             $('.choice').css('display','flex');
//         }
//         $('.foot').animate({'bottom':0},300,function(){
            
//             $('.foot').off('touchstart',footstart);
//             $('.choice div').on('touchstart',function(){
//                 $(this).css('background','#fdefee');
//                 $('.text').html($(this).html());
//             });
//             $('.choice div').on('touchend',function(){
//                 $(this).css('background','');
//             });
//         });
//         $('.ico_more').hide();
//     };

//     function footstr(arr){
//         if(arr.length==0){
//             $('.choice').html('消失');
//             $('.choice').hide(4,function(){
//                 $('.foot').css('bottom',0)
//                 $('.foot').on('touchstart',footstart);
//             });
//             $('input').show(4);
           
//         }else{
//             var str='';
//             $('.choice').html(str);
//             $(arr).each(function(a,b){
//                 str+='<div>'+b+'</div>'
//             });
//             $('.choice').html(str);
//             $('.foot').on('touchstart',footstart);
//         }
//     };
//     var index = 0;  
//     var index1=0;
    
//     $('.send_out').on('touchstart',function(){
//         $('.foott').css('display','none');
//         if($('.text').html()==''){
//             $('.alert').show(function(){
//                 setTimeout(function(){
//                     $('.alert').hide();
//                 },300)
//             })
//         }else{
//             $('input').blur();
//             $('.send_out').hide(4);
//             $('.choice').hide(4);
//             $('.choice').html('123');
//             $('.ico_more').show();
//             $('.answer span').eq(index1).html( $('.text').html());
//             if(obj[index1].off){
//                var str ='好了我知道你是个有故事的'+$('.text').html()+'同学,人家小见也是有很多内容的，你等下进去看看就知道。'
//                  $('.foot').animate({'bottom':-$('.choice')[0].clientHeight},300,function(){
//                     setTimeout(function(){
//                         index++;
//                         fnmake($('.question').eq(index),$('.smallsee_say span').eq(index),123,str,str);
//                     },200)
//                     var time = setInterval(function(){
//                         if(off){
//                             clearInterval(time);
//                             off=false;
//                             setTimeout(function(){
//                                 index++;
//                                 fnmake($('.question').eq(index),$('.smallsee_say span').eq(index),footstr,obj[1].title,obj[1].cotent);
//                             },400)
//                         }
//                     },200)
//                 });
//             }else{
//                 $('input').hide(4);
//                 $('input').val('');
//                 var str = obj[index1].nr;
//                 $('.foot').animate({'bottom':-$('.choice')[0].clientHeight},300,function(){
//                     setTimeout(function(){
//                         ;
//                         $('.box').scrollTop($('.box')[0].scrollHeight-num);
//                         index++;
//                         fnmake($('.question').eq(index),$('.smallsee_say span').eq(index),123,str,str);
//                     },200)
//                     var time = setInterval(function(){
//                         if(off){
//                             clearInterval(time);
//                             off=false;
//                             setTimeout(function(){
//                                 index++;
//                                 fnmake($('.question').eq(index),$('.smallsee_say span').eq(index),footstr,obj[2].title,obj[2].cotent);
//                             },400)
//                         }
//                     },200)
//                 });

//             }
//             $('.answer').eq(index1).show(4);
//             $(".box").scrollTop($('.box')[0].scrollHeight-num);
//             $('.text').html('');
            
//             index1++;
           
//         }
//         return false;
//     });
// }
