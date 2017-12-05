$(function () {
    $("#headerInput").focus();
    let arr1=[];
    let str1="";
    if(localStorage.history){
        str1=localStorage.history;
    }else{
        str1="";
    }
    let arr3=str1.split(",");
    $(".back").click(function (e) {
        e.preventDefault();
        history.back();
    });
    function interest(index) {
        let type = $("#headerInput").val();
        if (type == "") {
            return;
        }
        $.ajax({
            url: 'https://api.jisuapi.com/news/search?keyword=' + type + '&appkey=f9f083451dddad07',
            dataType: "jsonp",
            beforeSend:function () {
                $(".shade").show();
                $("#button").hide();
                $(".history").hide();
            },
            success: function (val) {
                $(".shade").hide();
                let arr = val.result.list;
                arr1=arr1.concat(arr);
                if(!arr){
                    return;
                }
                $("#button").show();
                let str = "";
                let newarr = arr.splice(index, 4);
                if(newarr.length==0){
                    return;
                }
                newarr.forEach(function (val, ind) {
                    val.pic=val.pic.replace("http","https");
                    console.log(val.pic);
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
                $("#button").css("display","block");
                flag=true;
            }
        })
    }
    let flag=true;
    $("#search").click(function (e) {
        e.preventDefault();
        $(".history").hide();
        if (!flag) {
            return;
        }
        flag = false;
        if (!($("#headerInput").val())) {
            flag = true;
            console.log(flag);
        }
        if (!arr3.includes($("#headerInput").val())) {
            str1 = "," + $("#headerInput").val() + str1;
            localStorage.history = str1;
        }
        $("#main").html("");
        interest(0);
    });
    $("#button").click(function () {
        let index = $("#main").children().length;
        interest(index);
    });
    $("#main").on("click","li",function () {
        let newindex=$("#main").children("li").index(this);
        let newobj=arr1[newindex];
        localStorage.media=JSON.stringify(newobj);
    });
    console.log(arr3);
    arr3=arr3.slice(0,11);
    if(arr3!=[]){
        let str2="";
        arr3.forEach(function (val) {
            if(val){
                str2+=`<p>${val}</p>`;
                $(".content").html(str2);
            }
        });
    }
    $(".content").on("click","p",function () {
        let val=$(this).text();
        $("#main").html("");
        $.ajax({
            url: 'https://api.jisuapi.com/news/search?keyword=' + val + '&appkey=f9f083451dddad07',
            dataType: "jsonp",
            beforeSend:function () {
                $(".shade").show();
                $("#button").hide();
                $(".history").hide();
            },
            success: function (val) {
                $(".shade").hide();
                let arr = val.result.list;
                arr1=arr1.concat(arr);
                if(!arr){
                    return;
                }
                let str = "";
                arr.forEach(function (val, ind) {
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
    })

});