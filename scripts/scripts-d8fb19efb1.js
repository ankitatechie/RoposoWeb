"use strict";angular.module("roposoApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angular-growl","LocalStorageModule","roposoWrapper","roposoUtil"]).config(["$routeProvider",function(o){o.when("/",{templateUrl:"views/grid1.html",controller:"MainCtrl",controllerAs:"main",active:"grid"}).when("/grid",{templateUrl:"views/grid1.html",controller:"MainCtrl",controllerAs:"main",active:"grid"}).when("/list",{templateUrl:"views/grid2.html",controller:"MainCtrl",controllerAs:"main",active:"list"}).otherwise({redirectTo:"/"})}]).config(["growlProvider",function(o){o.onlyUniqueMessages(!1),o.globalTimeToLive(1e3)}]),function(){angular.module("roposoApp").controller("HeaderCtrl",["$scope","$route",function(o,t){o.$route=t}]).controller("MainCtrl",["$scope","localStorageService","getProductsWrapper","removeProductUtil","addProductUtil","editProductUtil",function(o,t,r,e,n,c){var i=this;i.active="grid",t.get("productsInfo")&&0!==t.get("productsInfo").length?i.productsInfo=t.get("productsInfo"):i.prodcuts=r(i),i.editable=!1,i.removeProduct=e(i),i.addProduct=n(i),i.editProduct=c(i)}])}(),function(){angular.module("roposoWrapper",["roposoService","roposoCallback"]).factory("getProductsWrapper",["getProductsService","getProductsCallback",function(o,t){return function(r,e){var n;n=o().$promise,n.then(function(o){t(o,r,e)})}}])}(),function(){angular.module("roposoService",["roposoResource"]).factory("getProductsService",["getProductsResource",function(o){return function(){return o.query()}}])}(),function(){angular.module("roposoResource",["ngResource"]).factory("getProductsResource",["$resource",function(o){return o("https://raw.githubusercontent.com/ankitatechie/RoposoWeb/master/json/products.json",{},{query:{method:"GET"}},{stripTrailingSlashes:!1})}])}(),function(){angular.module("roposoCallback",["LocalStorageModule"]).factory("getProductsCallback",["localStorageService",function(o){return function(t,r){r.dummyProducts=t.products,o.set("productsInfo",t.products),mainScope.counter=0,mainScope.paginationFuntion=function(){for(var o=0;o<main.dummyProducts.length;o++)main.productsInfo.push(main.dummyProducts[++mainScope.counter])},mainScope.paginationFuntion()}}])}(),function(){angular.module("roposoUtil",["LocalStorageModule"]).factory("removeProductUtil",["localStorageService","growl",function(o,t){return function(r){return function(e,n){for(var c=o.get("productsInfo"),i=0;i<c.length;i++)if(i===n){c.splice(i,1);break}o.set("productsInfo",c),r.productsInfo=o.get("productsInfo"),t.addSuccessMessage("Product removed successfully")}}}]).factory("addProductUtil",["localStorageService","growl",function(o,t){return function(r){return function(){var e=o.get("productsInfo"),n=e[0];n={image:"images/small/img9.png",title:"Add New Title",description:"Add Your Description"},e.push(n),o.set("productsInfo",e),r.productsInfo=o.get("productsInfo"),t.addSuccessMessage("Product added successfully")}}}]).factory("editProductUtil",["localStorageService","growl",function(o,t){return function(r){return function(e,n,c){c?r.productsInfo=o.get("productsInfo"):(o.set("productsInfo",r.productsInfo),r.productsInfo=o.get("productsInfo"),t.addSuccessMessage("Product edited successfully"))}}}])}(),angular.module("roposoApp").directive("main",function(){return{templateUrl:"views/main.html",restrict:"E"}}).directive("gridOne",function(){return{templateUrl:"views/grid1.html",restrict:"E"}}).directive("editList",function(){return{restrict:"EA",link:function(o,t,r){$(".fa-edit").click(function(){$(this).closest(".products").find(".static").hide(),$(this).closest(".products").find("#editable").show()})}}}).directive("scrollBottom",function(){return{restrict:"EA",link:function(o,t,r){$("#scrlBotm").click(function(){return $("html, body").animate({scrollTop:$(document).height()},700),!1})}}});