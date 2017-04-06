/**
 * contribution-calendar.js v0.0.1
 *
 * @author  ZhangGuolu <986673640@qq.com>

 * @example
 * <pre>
 * contributionCalendar("containerId",{});
 *
 * // or
 *
 * contributionCalendar("containerId",{
 *   year: "2016",
 *   dateCount: {
 *     "2016-1-1": 1,
 *     "2016-2-1": 2
 *   }
 *});
 */
(function(window, document, undefined) {
    var defaults = {
        year: new Date().getFullYear(),
        week: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dateCount: {
            "2017-1-5": 1,
            "2017-2-5": 2,
            "2017-2-6": 5,
        }
    };
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var year = defaults.year;
    var yearLen = 0;
    var month = [];
    var week = defaults.week;
    var dateCount = defaults.dateCount;

    //根据活动次数设置颜色
    function getColor(count) {
        switch (count) {
            case 0:
                color = "#EBEDF0";
                break;
            case 1:
                color = "#E8D8F8";
                break;
            case 2:
                color = "#B5CdE6";

                break;
            case 3:
                color = "#77A4D0";
                break;
            case 4:
                color = "#3977AD";
                break;
            default:
                color = "#3977AD";
        }
        return color;
    }
    //获取活动次数
    function getCount(date) {
        if (dateCount[date]) {
            return dateCount[date];
        }
        return 0;
    }
    //根据当前是一年中的第几天返回这天的月份和日期
    function getDay(nowDay) {
        var result = {
            "month": 1,
            "day": 0
        };
        while (nowDay > month[result.month]) {
            nowDay -= month[result.month];
            result.month++;
        }
        result.day = nowDay;
        return result;
    }
    //获取一年的总天数
    function getYearLen(year) {
        for (var i = 1; i <= 12; i++) {
            var date = new Date(year, i, 0).getDate();
            month[i] = date;
            yearLen += date;
        }
        return yearLen;
    }
    //显示月份
    function showMonth(svg) {
        for (var i = 1; i <= 12; i++) {
            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", 30 + 52 * (i - 1));
            text.setAttribute("y", -10);
            text.setAttribute("class", "month");
            var textNode = document.createTextNode(i + "月");
            text.appendChild(textNode);
            svg.appendChild(text);
        }
        return svg;
    }
    //显示星期
    function showWeek(svg){
        for (var i = 1; i <= 7; i++) {
            var weekItem = week[new Date(year, 0, i).getDay()];
            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            if (i % 2 === 0) {
                text.setAttribute("style", "display:none");
            }
            text.setAttribute("y", 10 + 12 * (i - 1));
            text.setAttribute("x", -36);
            text.setAttribute("class", "month");
            var textNode = document.createTextNode(weekItem);
            text.appendChild(textNode);
            svg.appendChild(text);
        }
        return svg;
    }
    //显示年贡献小框
    function showTables(svg,yearLen){
        for (var j = 0; j < yearLen; j++) {

            if (j % 7 === 0) {
                var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                g.setAttribute("transform", "translate(" + (13 * (j / 7)) + ",0)");
            }
            var locX = j / 7; //day 位于第几列
            var locY = j % 7; //day 位于第几行
            var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            var nowDay = getDay(j + 1);
            var dataDate = year + "-" + nowDay.month + "-" + nowDay.day;
            r.setAttribute("data-date", dataDate);
            var dataCount = getCount(dataDate);
            var color = getColor(dataCount);
            r.setAttribute("data-count", dataCount);
            r.setAttribute("fill", color);
            r.setAttribute("class", "day");
            r.setAttribute("width", "10");
            r.setAttribute("height", "10");
            r.setAttribute("x", (14 - locX));
            r.setAttribute("y", (12 * locY));
            g.appendChild(r);
            svg.appendChild(g);
        }
        return svg;
    }

    window.contributionCalendar=function(id,options){
        var elem=document.getElementById(id);
        if(!elem){
            console.log("传入的ID不存在");
            return;
        }
        if(options.year){
            year=options.year;
        }
        if(options.dateCount){
            dateCount=options.dateCount;
        }
        yearLen = getYearLen(year);
        svg=showMonth(svg);
        svg=showWeek(svg);
        svg=showTables(svg,yearLen);
        if(options.before){
            var elemSibling=document.getElementById(options.before);
            if(elemSibling){
                elem.insertBefore(svg,elemSibling);
            }else{
                elem.appendChild(svg);
            }
        }else{
            elem.appendChild(svg);
        }
    };
})(window, document);