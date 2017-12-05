let myScroll;
function loaded () {
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false, mouseWheel: true });
}
$(function () {
    $.ajax({
        url:"https://api.jisuapi.com/news/channel?appkey=f9f083451dddad07",
        dataType:"jsonp",

        success:function (val) {
            let arr=val.result;
            let str="";
            arr.forEach(function (val,index) {
                if(index==0){
                    str+=`<li class="color">${val}</li>`;
                }else{
                    str+=`<li>${val}</li>`;
                }
            });
            $("#scroller ul").html(str);
            let arr1=[];
            function news(type, start) {
                $.ajax({
                    url: "https://api.jisuapi.com/news/get?channel=" + type + "&start=" + start + "&num=10&appkey=f9f083451dddad07",
                    dataType: "jsonp",
                    beforeSend:function () {
                        $(".shade").show();
                        $("#button").hide();
                    },
                    success: function (val) {
                        $(".shade").hide();
                        $("#button").show();
                        let arr = val.result.list;
                        arr1=arr1.concat(arr);
                        let str = "";
                        arr.forEach(function (val, index) {
                            val.pic=val.pic.replace("http","https");
                            if (!val.pic) {
                                str += `<li><a href="dd.html">
                                    <div class="title">${val.title}</div>
                                    <div class="message">
                                        <div class="from"><span>${val.src}</span></div>
                                        <div class="time">${val.time}</div>
                                    </div>
                                  </a>
                                  </li>`
                            } else {
                                str += `<li class="mark"><a href="dd.html">
                                <div class="left">
                                    <div class="leftBox">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                </div>
                                <div class="right">${val.title}</div>
                                <div class="bottom">
                                    <div class="from"><span>${val.src}</span></div>
                                    <div class="time">${val.time}</div>
                                </div>
                              </a>
                               </li>`
                            }
                        });
                        $("#main").html(function (index, html) {
                            return html + str;
                        });
                    }
                })
            }
            let type="头条";
            let index=0;
            news(type, index);
            $("#scroller > ul").on("click","li",function () {
                if($(this).hasClass("color")){
                    return;
                }
                $("#scroller > ul >li").removeClass("color");
                $(this).addClass("color");
                $("#main").html("");
                type=$(this).html();
                news(type,0);
            });
            $("#button").on("click", function (e) {
                e.preventDefault();
                index = $("#main").children("li").length;
                    news(type, index);
            });
            $("#main").on("click","li",function () {
                let newindex=$("#main").children("li").index(this);
                let newobj=arr1[newindex];
                localStorage.media=JSON.stringify(newobj);
            });
        }
    });
});