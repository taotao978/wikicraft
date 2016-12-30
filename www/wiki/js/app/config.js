/**
 * Created by wuxiangan on 2016/12/20.
 */

/* 程序配置模块 */

(function () {
    var pathPrefix = '/wiki/';
    config = {
        // 路径配置 BEGIN
        pathPrefix: pathPrefix,
        // 图片路径
        imgsPath: pathPrefix + 'imgs/',

        // js 路径
        jsPath: pathPrefix + 'js/',
        jsAppPath: pathPrefix + 'js/app/',
        jsAppControllerPath: pathPrefix + 'js/app/controller/',
        jsAppDirectivePath: pathPrefix + 'js/app/directive/',
        jsAppFactoryPath: pathPrefix + 'js/app/factory/',
        jsAppHelperPath: pathPrefix + 'js/app/helper/',
        jsLibPath: pathPrefix + 'js/lib',

        modPath: pathPrefix + 'mod/',
        wikiModPath: pathPrefix + 'js/mod/',

        // html 路径
        htmlPath: pathPrefix + 'html/',
        pageUrlPrefix:'/wiki/html/',

        // api接口路径
        apiUrlPrefix:'/api/wiki/models/',
        //modulePageUrlPrefix:'/wiki/module',
        //moduleApiUrlPrefix:'http://localhost:8099/api/module/',  // + moduleName + "/models/" + modelName + '[apiName]'
        // 路径配置 END


        // 预加载模块列表
        preloadModuleList:[],

        // wiki 模块解析函数
        wikiModuleRenderMap:{},
    };

    // 预加载模块注册
    config.registerPreloadModule = function (path) {
        this.preloadModuleList.push(path);
    }

    // wikiMod渲染函数注册
    config.setWikiModuleRender = function(moduleName, render) {
        this.wikiModuleRenderMap[moduleName] = render;
    }
    config.getWikiModuleRender = function (moduleName) {
        return this.wikiModuleRenderMap[moduleName];
    }
    window.config = config;
})();