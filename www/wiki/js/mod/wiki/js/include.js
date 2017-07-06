
define([
    'app',
    'helper/util',
    'helper/dataSource',
    'helper/markdownwiki',
    'text!wikimod/wiki/html/include.html',
], function (app, util, dataSource, markdownwiki, htmlContent) {

    // 使用闭包使模块重复独立使用
    function registerController(wikiblock) {
        // 比赛类活动奖励控制器
        app.registerController("includeController", ['$scope', function ($scope) {
            $scope.imgsPath = config.wikiModPath + 'wiki/assets/imgs/';
			$scope.containerId = wikiblock.containerId + "_include";

            var modParams = angular.copy(wikiblock.modParams || {});
			var mdwiki = markdownwiki({editorMode: true, breaks: true});
			var pageinfo = config.services.$rootScope.pageinfo;
            function init() {
				//console.log($("#" + $scope.containerId));
				setTimeout(function() {
					if (modParams.content) {
						var content = mdwiki.render(modParams.content);
						//console.log(content);
						util.html("#" + $scope.containerId, mdwiki.render(modParams.content));
					} else if (modParams.contentUrl) {
						var contentUrl = modParams.contentUrl;
						var username = modParams.username || pageinfo.username;
						var sitename = modParams.sitename || pageinfo.sitename;
						var currentDataSource = dataSource.getDataSource(username, sitename);
						var path = contentUrl + config.pageSuffixName;
						if (path[0] != "/") {
							path = "/" + username + "/" + sitename + "/" + path;
						}
						currentDataSource.getRawContent({path: path, isShowLoading:false}, function (content) {
							util.html("#" + $scope.containerId, mdwiki.render(content));
						});
					}
				});
			}

            $scope.$watch("$viewContentLoaded", init);
        }]);
    }

    return {
        render: function (wikiblock) {
            registerController(wikiblock);
            return htmlContent;
        }
    }
});
