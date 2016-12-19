 var app = angular.module('myApp', ['ionic', 'cyfDirectives', "ngCordova"])
     .config(['$stateProvider', '$ionicConfigProvider', function($stateProvider, $ionicConfigProvider) {
         $ionicConfigProvider.tabs.position('bottom');
         $stateProvider.state('tabs', {
             abstract: true,
             templateUrl: 'tplTabs'
         }).state('tab1', {
             url: '/tab1',
             parent: 'tabs',
             views: {
                 view1: {
                     templateUrl: 'home.html',
                     controller: "home"
                 }
             },

         }).state('tab2', {
             url: '/tab2',
             parent: 'tabs',
             views: {
                 view2: {
                     templateUrl: 'find.html',
                     controller: "find"
                 }
             },
         }).state('tab3', {
             url: '/tab3',
             parent: 'tabs',
             views: {
                 view3: {
                     templateUrl: 'places.html',
                     controller: "place"
                 }
             },
         }).state('tab4', {
             url: '/tab4',
             parent: 'tabs',
             views: {
                 view4: {
                     templateUrl: 'profile.html',
                     controller: "profile"
                 }
             },
         }).state('search', {
             url: '/search',
             templateUrl: 'index_search.html',
             controller: 'search'
         }).state('news', {
             url: '/news',
             templateUrl: 'index_news.html',
             controller: 'news'
         }).state('common1', {
                 url: '/common1/:id',
                 cache: false,
                 templateUrl: 'index-template-one.html',
                 controller: 'common1'
             }

         ).state('common2', {
                 url: '/common2/:index',
                 cache: false,
                 templateUrl: 'index-template-two.html',
                 controller: 'common2'
             }

         ).state('common3', {
                 url: '/common3/:index',
                 cache: false,
                 templateUrl: 'index-template-three.html',
                 controller: 'common3'
             }

         ).state('goods', {
             url: '/goods/:index/:id',
             cache: false,
             templateUrl: 'goods.html',
             controller: 'goods'
         }).state('log', {
             url: '/log',
             templateUrl: 'login.html'
         })
     }])
     .run(['$rootScope', '$ionicHistory', '$state', function($rootScope, $ionicHistory, $state) {
         $rootScope.back = function() {
             $ionicHistory.goBack();
         }
         $rootScope.search = function() {
             $state.go('search');
         };
     }])
     .controller('myController', ['$state', '$scope', function($state, $scope) {
         $state.go('tab1');

     }])
     .controller('profile', ['$scope', '$http', '$state', function($scope, $http, $state) {
         $scope.data1 = ['收藏', '足迹', '咨询', '订阅'];
         $scope.data2 = [{
             "ico": "icon-hand",
             "name": "待付款"
         }, {
             "ico": "icon-daibuchong",
             "name": "待补充"
         }, {
             "ico": "icon-daichuxing",
             "name": "待出行"
         }, {
             "ico": "icon-daipingjia",
             "name": "待评价"
         }, {
             "ico": "icon-shouhou2",
             "name": "售后"
         }]
         $scope.data3 = [{
             "ico": "icon-youhuiquan",
             "name": "优惠券"
         }, {
             "ico": "icon-yijianfankui",
             "name": "常见问题与意见反馈"
         }, {
             "ico": "icon-shezhi",
             "name": "更多设置"
         }]
         $scope.toLog = function() {
             $state.go('log')
         }
     }])
     .controller('home', ['$scope', '$state', '$http', '$ionicScrollDelegate', '$timeout', 'back', '$cordovaBarcodeScanner', function($scope, $state, $http, $ionicScrollDelegate, $timeout, back, $cordovaBarcodeScanner) {
         $scope.country = [
             '日本', '泰国', '香港', '新加坡', '马来西亚', '美国', '法国'
         ];
         $scope.trip = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];
         $scope.img = [{
                 url: 'img/loop1.jpeg',
                 con: '人的一生至少要有两次冲动'
             },
             {
                 url: 'img/loop2.png',
                 con: '一次奋不顾身的爱情'
             },
             {
                 url: 'img/loop3.jpg',
                 con: '一场说走就走的旅行'
             },
             {
                 url: 'img/loop4.jpg',
                 con: '你........心动了吗？'
             }
         ]
         $scope.place = [];
         $scope.top = false;
         $scope.news = function() {
             $state.go('news');
         };
         $scope.scanBarcode = function() {
             $cordovaBarcodeScanner.scan().then(function(imageData) {
                 alert(imageData.text);
                 console.log("Barcode Format -> " + imageData.format);
                 console.log("Cancelled -> " + imageData.cancelled);
             }, function(error) {
                 console.log("An error happened -> " + error);
             });
         };
         $scope.scroll = function() {
             var distance = $ionicScrollDelegate.$getByHandle('content1').getScrollPosition().top;
             if (distance >= 1000) {
                 $scope.top = true;
             } else {
                 $scope.top = false;
             }
         }
         $scope.toTop = function() {
             $ionicScrollDelegate.$getByHandle('content1').scrollTop(true);
             $scope.top = false;
         }
         $http.get('json/options.json').success(function(result) {
             $scope.options = result;
         })
         $http.get('json/json1.json').success(function(result) {
             $scope.service = result;
         })

         for (var i = 1; i <= 3; i++) {
             $http.get('json/templateOne-' + i + '.json').success(function(result) {
                 $scope.place.push(result.detail);
             })
         }
         back.run(['scroll0', 'scroll1'], $timeout, $ionicScrollDelegate)
         $scope.over = false;
         $scope.show = true;
         var page = 0;
         $scope.getData = function() {
             $http.get('json/templateOne-7.json').success(function(result) {
                 if (page == 2) {
                     $scope.show = false;
                     $scope.over = true;
                     $timeout(function() {
                         $scope.show = true;
                         $scope.$broadcast("scroll.infiniteScrollComplete");
                         $scope.over = false;
                     }, 2000);
                     $timeout(function() {
                         page = 0;
                     }, 100000)
                 } else {
                     $timeout(function() {
                             if ($scope.like == undefined) {
                                 $scope.like = result.detail
                             } else {
                                 $scope.like = $scope.like.concat(result.detail);
                             }
                             $scope.$broadcast("scroll.infiniteScrollComplete");
                             page++;

                         },
                         2000)
                 }
             });
         };
     }])

 .controller('place', ['$state', '$scope', '$http', function($state, $scope, $http) {
         var narion = [];
         $scope.area = ['海岛', '东南亚', '国内', '亚洲', '欧洲', '大洋洲', '北美', '非洲'];
         var icon = ['icon-miyuehaidao', 'icon-taiguoyiliao', 'icon-map', 'icon-yazhou', 'icon-icon001', 'icon-sydney1162852easyiconnet', 'icon-meiguoguan', 'icon-feizhou']
         $http.get('json/country.json').success(function(result) {
             nation = result;
             $scope.nation = nation[0];
             $scope.icon = icon[0];
             $scope.continent = '海岛';
         })

         $scope.country = function(i, con) {
             $scope.nation = nation[i];
             $scope.icon = icon[i];
             $scope.continent = con;
         }
     }])
     .controller('search', ['$state', '$scope', '$ionicHistory', function($state, $scope, $ionicHistory) {
         $scope.data = ['日本', '韩国', '泰国', '三亚', '巴厘岛', '马尔代夫', '台湾', '厦门', '美国', '东京', '大阪', '香港', '新加坡', '澳大利亚']

     }])
     .controller('news', ['$state', '$scope', function($state, $scope) {
         $scope.data = [{
             "ico": "icon-order",
             "name": "订单消息"
         }, {
             "ico": "icon-iconfontzhizuobiaozhun41",
             "name": "订单提醒"
         }, {
             "ico": "icon-youhuiquan1",
             "name": "优惠券消息"
         }];

     }])
     .controller('common1', ['$state', '$scope', '$http', '$stateParams', function($state, $scope, $http, $stateParams) {

         $http.get('json/templateOne-' + $stateParams.id + '.json').success(function(result) {
             $scope.num = $stateParams.id;
             $scope.data = result;
         })

     }])
     .controller('common2', ['$state', '$scope', '$http', '$stateParams', function($state, $scope, $http, $stateParams) {
         var swiper = new Swiper('.swiper', {
             pagination: '.swiper-pagination',
             effect: 'coverflow',
             grabCursor: true,
             centeredSlides: true,
             slidesPerView: 'auto',
             coverflow: {
                 rotate: 50,
                 stretch: 0,
                 depth: 100,
                 modifier: 1,
                 slideShadows: true
             }
         });
         $scope.ary = [
             ['热销', '自由行', 1],
             ['特价', '机票', 2],
             ['热销', '城市玩乐', 3],
             ['必备', '签证', 4],
             ['必备', '酒店', 5],
             ['必备', '接送机包车', 16]
         ];
         $http.get('json/options.json').success(function(result) {
             $scope.options = result;
         });
         $http.get('json/country.json').success(function(result) {
             var data = result;
             var nation = []
             for (var i = 0; i < data.length; i++) {
                 nation[i] = data[i].filter(function(obj) {
                     return (obj.id == $stateParams.index)
                 })
             }

             $scope.nation = nation.filter(function(e) {
                 return e.length != 0;
             })[0][0];
         });
         $scope.json = [];
         for (var i = 1; i <= $scope.ary.length; i++) {
             if (i == $scope.ary.length) {
                 i = 16;
             }
             $http.get('json/templateOne-' + i + '.json').success(function(result) {
                 $scope.json.push(result);
             })
         };

     }])
     .controller('common3', ['$state', '$scope', '$http', '$stateParams', function($state, $scope, $http, $stateParams) {
         var arr = [{
             "id": 1,
             "url": "img/banner1_03.png",
             "title": "限时特卖",
             "color": "#99e1ff"
         }, {
             "id": 3,
             "url": "img/banner2_02.png",
             "title": "尾货抢购",
             "color": "#e18522"
         }, {
             "id": 2,
             "url": "img/banner3_02.png",
             "title": "超值机票",
             "color": "#05c296"
         }, {
             "id": 9,
             "url": "img/banner4_02.png",
             "title": "手机专享",
             "color": "#f5f5f5"
         }]
         var tempt = arr[$stateParams.index]
         $scope.title = tempt.title;
         $scope.url = tempt.url;
         $scope.color = tempt.color;
         $http.get('json/templateOne-' + tempt.id + '.json').success(function(result) {
             $scope.data1 = result;
         });
         $http.get('json/templateOne-' + (tempt.id + 1) + '.json').success(function(result) {
             $scope.data2 = result;
         })
     }])



 .controller('goods', ['$stateParams', '$scope', '$http', function($stateParams, $scope, $http) {
     $http.get('json/templateOne-' + $stateParams.index + '.json').success(function(result) {
         var data = result.detail;
         data = data.filter(function(e) {
             return e.id == $stateParams.id;
         })
         $scope.goods = data[0];
     })
 }])

 .controller('find', ['$stateParams', '$scope', '$http', function($stateParams, $scope, $http) {
     $scope.rank = [{
         "img": "img/play6.jpg",
         "con": "酒店"
     }, {
         "img": "img/play5.jpg",
         "con": "目的地"
     }, {
         "img": "img/freetrip6.jpg",
         "con": "海岛"
     }, {
         "img": "img/country41.jpg",
         "con": "景点"
     }, {
         "img": "img/play4.jpg",
         "con": "餐厅"
     }]
     $http.get('json/date.json').success(function(result) {
         $scope.date = result;
     })
     var swiper = new Swiper('.swiper0', {
         effect: 'fade',
         grabCursor: true,
         centeredSlides: true,
         slidesPerView: 'auto',
         onSlideChangeEnd: function(swiper) {
             var i = swiper.activeIndex;
             for (var n = 0; n < 3; n++) {
                 if (i == n) {
                     $scope['nav' + i] = true;
                 } else {
                     $scope['nav' + n] = false;
                 }
             }
             $scope.$apply();
         }
     });
     $scope.nav0 = true;
     $scope.directTo = function(i) {
         swiper.slideTo(i, 1000, false);
         for (var n = 0; n < 3; n++) {
             if (i == n) {
                 $scope['nav' + i] = true;
             } else {
                 $scope['nav' + n] = false;
             }
         }

     }
     $http.get('json/country.json').success(function(result) {
         $scope.data1 = result[6];
         $scope.data2 = result[4];
     })
 }])


 app.service('back', function() {
     this.run = function(ary, $timeout, $ionicScrollDelegate) {
         $timeout(function() {
             for (var i = 0; i < ary.length; i++) {
                 var scroll0 = $ionicScrollDelegate.$getByHandle(ary[i]);
                 var view = scroll0.getScrollView();
                 var touchStart = view.touchStart;
                 var mouseDown = view.mouseDown;
                 var touchMove = view.touchMove;
                 var mouseMove = view.mouseMove;
                 var container = view.__container;
                 container.removeEventListener('touchstart', touchStart);
                 container.removeEventListener('mousedown', mouseDown);
                 document.removeEventListener('touchmove', touchMove);
                 document.removeEventListener('mousemove', mouseMove);
                 view.touchStart = function(evt) {
                     evt.preventDefault = function() {};
                     if (touchStart) {
                         touchStart.apply(view, [evt]);
                     }
                 };
                 view.mouseDown = function(evt) {
                     evt.preventDefault = function() {};
                     if (mouseDown) {
                         mouseDown.apply(view, [evt]);
                     }
                 };
                 view.touchMove = function(evt) {
                     evt.preventDefault = function() {};
                     if (touchMove) {
                         touchMove.apply(view, [evt]);
                     }

                 };
                 view.mouseMove = function(evt) {
                     evt.preventDefault = function() {};
                     if (mouseMove) {
                         mouseMove.apply(view, [evt]);
                     }
                 };
                 container.addEventListener('touchstart', view.touchStart, false);
                 container.addEventListener('mousedown', view.mouseDown, false);
                 document.addEventListener('touchmove', view.touchMove, false);
                 document.addEventListener('mousemove', view.mouseMove, false);
             }
         });

     }

 })