// $('.zg_wrapper').height($(window).height());

function GetCookie(cookename){
    var arr=document.cookie.match(new RegExp("(^| )"+cookename+"=([^;]*)(;|$)"));
    if(arr!=null){
    	$('.lginsecc').show();
        $('.lginsecc span').html(arr[2]);
    }else{
        console.log(arr+"1")
    }
}
$("#zhuce").click(function() {
	var formid = $("#zcformid").val();
	var username = $("#username").val();
	var Myphone = $("#phone").val();
	var yzm = $("#yzm").val();
	// var zkz = $("#zkz").val();
	//alert(username);alert(Myphone);alert(yzm);
	if(username == '') { //验证用户名号是否为空
		alert('请填写用户名');
		return false;
	}
	if(Myphone == '') { //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	// if(zkz == '') { //验证准考证号是否为空
	// 	alert('请填写准考证号');
	// 	return false;
	// }
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请填写正确的手机号！');
		return false;
	}
	// if(zkz == '') { //验证准考证是否为空
	// 	alert('请填写准考证');
	// 	return false;
	// }
	if(yzm == '') { //验证码是否为空
		alert('请填写验证码');
		return false;
	}
	// var zkzreg = /^\d{15}$/;
	// if(!zkzreg.test(zkz)) {
	// 	alert('请填入正确的准考证号！');
	// 	return false;
	// }
	$.getJSON("http://bj.offcn.com/index.php?m=formguide&c=index&a=formlogin&type=zhuce&formid=" + formid + "&username=" + username + "&mobile=" + Myphone + "&yzm=" + yzm + "&callback=?", function(json) {
		if(json.status == 1) {
			alert("注册成功，去登陆");
			submitswitch = true;
			$('.container').find('.agileits').hide().eq(0).show();
			$('.bd_nav').find('span').removeClass('active').eq(0).addClass('active');
			
			return false;
		} else if(json.status == 3) {
			alert("验证码不对");
		} else {
			alert("注册失败");
		}
	})
})
//获取验证码
$('#getyzm').click(function() {
	var formid = $(this).attr("data");
	var Myphone = $('#phone').val();
	if(Myphone == '') { //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请填写正确的手机号！');
		return false;
	}
	$('#getyzm').hide();
	$('#daojishi').show();
	$.getJSON("http://bj.offcn.com/index.php?m=formguide&c=index&a=formyzm&formid=" + formid + "&mobile=" + Myphone + "&callback=?", function(json) {
		if(json.status == 1) {
			alert('正在发送验证码');
			//倒计时
			runcount(120);
		} else if(json.status == 2) {
			alert('您已注册,去登陆吧');
			$('#getyzm').show(0);
			$('#daojishi').hide(0);
			$('.container').find('.agileits').hide().eq(0).show();
			$('.bd_nav').find('span').removeClass('active').eq(0).addClass('active');
			return false;
		}
	})
});
//登录
$("#denglu").click(function() {
	var formid = $("#dlformid").val();
	var username = $("#loginName").val();
	var Myphone = $("#loginPhone").val();
	if(username == '') { //验证手机号是否为空
		alert('请填写用户名'); 
		return false;
	}
	if(Myphone == '') { //验证手机号是否为空
		alert('请填写手机号');
		return false;
	}
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请填写正确的手机号！');
		return false;
	}
	$.getJSON("http://bj.offcn.com/index.php?m=formguide&c=index&a=formlogin&type=login&formid=" + formid + "&username=" + username + "&mobile=" + Myphone + "&callback=?", function(json) {
		if(json.status == 1) {
			alert("登录成功");
			$('.zg_cover').hide();
			$('.container').hide();
			submitswitch = true;
			$('.btn_wrap').hide();
			GetCookie('phone')
			console.log(GetCookie('phone'))
		} else {
			alert("请先注册，再登录");
			$('.container').find('.agileits').hide().eq(1).show();
			$('.bd_nav').find('span').removeClass('active').eq(1).addClass('active');
		}
	})
})

//倒计时函数
function runcount(t) {
	if(t > 0) {
		document.getElementById('daojishi').innerHTML = t + 'S后重新获取';
		t--;
		setTimeout(function() {
			runcount(t)
		}, 1000)
	} else {
		$('#getyzm').show();
		$('#daojishi').hide();
	}
}
//验证是否登录
function Islogin() {

}

