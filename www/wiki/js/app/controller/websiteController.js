/**
 * Created by wuxiangan on 2016/12/21.
 */

define([
    'app',
    'helper/util',
    'helper/storage',
    'text!html/website.html',
    'controller/newWebsiteController',
    'controller/editWebsiteController',
], function (app, util, storage, htmlContent, newWebsiteHtmlContent, editWebsiteHtmlContent) {
    app.registerController('websiteController', ['$scope', '$state', 'Account', function ($scope, $state, Account) {
        console.log("websiteController");
        $scope.websites = [];

        function init() {
            // 获取项目列表
            util.http('POST', config.apiUrlPrefix+'website',{userId:Account.getUser()._id || -1}, function (data) {
                $scope.websites = data;
            });
        }

        //  创建网站
        $scope.goNewWebsitePage = function () {
            util.html('#userCenterSubPage', newWebsiteHtmlContent);
        }

        // 访问网站
        $scope.goWebsiteIndexPage = function(websiteName) {
            util.goUserSite('/' + $scope.user.username + '/'+ websiteName);
        }

        // 编辑网站页面
        $scope.goEditWebsitePagePage = function (website) {
            //window.location.href="/wiki/wikiEditor";
            util.go('wikiEditor');
        }

        // 编辑网站
        $scope.goEditWebsitePage = function (website) {
            storage.sessionStorageSetItem("editWebsiteParams", website);
            util.html('#userCenterSubPage', editWebsiteHtmlContent);
        }

        // 删除网站
        $scope.deleteWebsite = function(id) {
            util.http("DELETE", config.apiUrlPrefix+'website', {_id:id}, function (data) {
                $scope.websites = data;
            });
        }

        Account.ensureAuthenticated(init);
    }]);

    return htmlContent;
});