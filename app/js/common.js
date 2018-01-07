


// 底部百度地图显示
(function() {
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    // 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
    });
    map.addControl(navigationControl);

    //坐标点
    var point = new BMap.Point(120.421601,36.170357);
    //缩放等级
    map.centerAndZoom(point, 18);
    //创建小狐狸
    var pt = new BMap.Point(120.421601,36.170357);
    var myIcon = new BMap.Icon("./favicon.ico", new BMap.Size(18, 18));
    var marker2 = new BMap.Marker(pt, {
        icon: myIcon
    }); // 创建标注
    map.addOverlay(marker2); // 将标注添加到地图中
    // 将标注添加到地图中
    map.addOverlay(marker2);
    //跳动的动画
    marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
})(window);

// 导航
$('#address,#address1').click(function() {
    getGps();
});

function getGps() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var x = r.point.lng;
            var y = r.point.lat;

            url_link(x, y, 120.513531, 36.169886);
        }
    }, {
        enableHighAccuracy: true
    })
}

function url_link(lng, lat, dest_lng, dest_lat) {

    // var buttonObj = document.getElementById('address_map');
    map = new AMap.Map("mapContainer");
    AMap.plugin(["AMap.Driving"], function() {
        var drivingOption = {
            policy: AMap.DrivingPolicy.LEAST_TIME,
            map: map
        };
        var driving = new AMap.Driving(drivingOption); //构造驾车导航类
        //根据起终点坐标规划驾车路线
        var LngLat = new AMap.LngLat(lng, lat);
        var destLngLat = new AMap.LngLat(120.513531, 36.169886);
        driving.search(LngLat, destLngLat, function(status, result) {
            // buttonObj.onclick = function () {
            driving.searchOnAMAP({
                origin: result.origin,
                destination: result.destination
            });
            // }

        });

    });
    map.addControl(new AMap.ToolBar());

}
