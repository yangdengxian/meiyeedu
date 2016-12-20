/**
 * Created by sixf on 2015/9/14.
 */
wx.config({
    debug:false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: ['onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'scanQRCode',
        'addCard',
        'chooseCard',
        'hideOptionMenu',
        'showOptionMenu',
        'openCard']
});
wx.ready(function () {
    shareData.trigger=function trigger(res){
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        //alert('用户点击分享到朋友圈');
        //alert(JSON.stringify(res));
    }
    shareData.success=function success(res){
        alert('已分享');
    }
    shareData.cancel=function cancel(res){
        //alert('已取消');
    }
    shareData.fail=function fail(res){
        //alert(JSON.stringify(res));
    }
    shareData.complete=function complete(res){
        //alert('已完成');
    }
    wx.onMenuShareAppMessage({title: shareData.title,desc:shareData.desc,link: shareData.link,imgUrl:shareData.imgUrl,trigger:shareData.trigger,success:shareData.success,cancel:shareData.cancel,fail:shareData.fail});
    wx.onMenuShareTimeline({title: shareData.title,link: shareData.link,imgUrl:shareData.imgUrl,trigger:shareData.trigger,success:shareData.success,cancel:shareData.cancel,fail:shareData.fail});
    wx.onMenuShareQQ({title: shareData.title,desc:shareData.desc,link: shareData.link,imgUrl:shareData.imgUrl,trigger:shareData.trigger,success:shareData.success,cancel:shareData.cancel,fail:shareData.fail});
    wx.onMenuShareWeibo({title: shareData.title,desc:shareData.desc,link: shareData.link,imgUrl:shareData.imgUrl,trigger:shareData.trigger,success:shareData.success,cancel:shareData.cancel,fail:shareData.fail});
    wx.onMenuShareQZone({title: shareData.title,desc:shareData.desc,link: shareData.link,imgUrl:shareData.imgUrl,trigger:shareData.trigger,success:shareData.success,cancel:shareData.cancel,fail:shareData.fail});
});
wx.error(function (res) {
    //alert(JSON.stringify(res));
});