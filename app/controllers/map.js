app.controller('MapController', ['$scope', function ($scope) {
    console.log("MapController");
    $scope.markert_work={ radius: 1, title: "1",desc: "blin",lat: 0, lng: 0,id:0 };
    $scope.select_marker="null select marker";

    $scope.add_my_geo = function () {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(location) {
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                console.log(location.coords.accuracy);
                places.push(
                    {
                        title : 'Are you here!',
                        desc : 'measurement accuracy \ radius: '+location.coords.accuracy+"meters",
                        lat : location.coords.latitude,
                        lng : location.coords.longitude,
                        radius:  (location.coords.accuracy/1000),
                        color: '#70e470',
                    }
                );
                createMarker(places[places.length-1],places.length-1);
                createCircle(places[places.length-1]);
                $scope.$apply();
            },function (err) {
                console.log("error geo:",err);
                alert(err.message);
            });
        } else {
            alert("geo недоступно...")
        }

    }
    $scope.My_slider = new Slider('#ex1');
    $scope.My_slider.on('change', function (sliderValue) {
        $scope.markert_work.radius = sliderValue.newValue;
        if ( $scope.markert_work.id >= 0 ) {
            places[$scope.markert_work.id].radius = sliderValue.newValue;
            $scope.Circle[$scope.markert_work.id].setRadius(sliderValue.newValue*1000);
        }
        $scope.$apply();
    });

    var places = [
        {
            title : 'неопределился что тут ..',
            desc : 'что то тут по любому есть -)))',
            lat : 50.054833,
            lng : 36.231320,
            radius: 2
        },
        {
            title : 'тут что то ... ',
            desc : 'гномы клад закапали!',
            lat : 49.961029,
            lng : 36.333798,
            radius: 4
        },
        {
            title : 'A-Level',
            desc : 'тут мы учимся и мучимся',
            lat : 49.987393,
            lng : 36.230676,
            radius: 1
        },
        {
            title : 'Дом',
            desc : 'я тут иногда живу',
            lat : 50.143060,
            lng : 36.255986,
            radius: 1
        },
        {
            title : 'Дом - 2 ',
            desc : 'и тут я иногда живу',
            lat : 50.148136,
            lng : 36.275531,
            radius: 1
        },
        {
            title : 'Дом 3',
            desc : 'не оч часто тут .. ',
            lat : 50.003964,
            lng : 36.213791,
            radius: 1
        },

    ];
    $scope.places=places;
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.047634, 36.421734),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    $scope.Circle = [];

    var infoWindow = new google.maps.InfoWindow();

    //добавить маркер
    google.maps.event.addListener($scope.map, 'click', function(event) {
        places.push(
            {
                title : 'заголовок точки',
                desc : 'Описание точки',
                lat : event.latLng.lat(),
                lng : event.latLng.lng(),
                radius:  $scope.My_slider.getValue()
            }
        );
        createMarker(places[places.length-1],places.length-1);
        createCircle(places[places.length-1]);
        $scope.$apply();
    });
    $scope.changeDesc = function(){
        places[$scope.markert_work.id].desc  = $scope.markert_work.desc;
        $scope.markers[$scope.markert_work.id].content=$scope.markert_work.desc;
    };
    $scope.changeTitle = function(){
        places[$scope.markert_work.id].title  = $scope.markert_work.title;
        $scope.markers[$scope.markert_work.id].title= $scope.markert_work.title;
    };
    var createCircle = function (info) {
        var color="";
        if ( info.color ) { color = info.color} else { color = "#FF0000";}
        if ( info.title.indexOf("Дом") >=0 ) { color = "#00FF00";}
        var cityCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: $scope.map,
            center: new google.maps.LatLng(info.lat, info.lng),
            radius: info.radius * 1000
        });
        $scope.Circle.push(cityCircle);
    };
    $scope.del_dot = function(index) {
        console.log(index, "del dot");
        //arr.splice(index, 1);
        $scope.markers[index].setMap(null);
        $scope.Circle[index].setMap(null);
        $scope.markers.splice(index, 1);
        $scope.Circle.splice(index, 1);
        places.splice(index,1);

    };

    var createMarker = function (info,index){
        function pinSymbol(color) {
            return {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                fillColor: color,
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 1,
            };
        }
        var color="";
        if ( info.color ) { color = info.color} else { color = "#FF0000";}
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lng),
            title: info.title,
            draggable: true,
            icon: pinSymbol(color),
        });
        marker.content = '<div id="'+index+'" class="infoWindowContent">' + info.desc + '</div>';
        google.maps.event.addListener(marker, 'click', function(){
            $scope.select_marker = marker.title;
            $scope.markert_work.radius = info.radius;
            $scope.My_slider.setValue(info.radius);
            $scope.markert_work.title = info.title;
            $scope.markert_work.desc = info.desc;
            $scope.markert_work.id=places.indexOf(info);
            $scope.$apply();
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        google.maps.event.addListener(marker,'dragend',function(event) {
            for ( i =0; i < $scope.markers.length; i++){
                if ( marker.title == $scope.markers[i].title && marker.content== $scope.markers[i].content){
                    $scope.Circle[i].setCenter(this.position);
                    places[i].lat = this.position.lat();
                    places[i].lng= this.position.lng();
                    $scope.$apply();
                }
            }
        });
        $scope.markers.push(marker);
    };
    for (i = 0; i < places.length; i++){
        createMarker(places[i],i);
        createCircle(places[i]);
    }
    function addMarker(location, title, map) {
        var marker = new google.maps.Marker({
            position: location,
            label: title,
            map: map
        });
    }

}]);


