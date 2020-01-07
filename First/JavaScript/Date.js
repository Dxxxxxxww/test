
/**
 *
 *中国式时间
 * @param {*} dt Date对象
 * @returns 格式化好的中国式时间字符串
 */
function getDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var week = dt.getDay();
    var hour = dt.getHours();
    var min = dt.getMinutes();
    var sec = dt.getSeconds();

    month = fomat(month);
    day = fomat(day);
    week = initWeek(week);
    hour = fomat(hour);
    min = fomat(min);
    sec = fomat(sec);
    
    var str = year + '年' + month + '月' + day + '日' + ',星期' + week + ',' + hour + ':' + min + ':' + sec;
    return str;
}

/**
 *
 *
 * @param {*} week 星期几
 * @returns 格式化好的中国星期
 */
function initWeek(week) {
    switch (week) {
        case 1:
            week = '一';
            break;
        case 2:
            week = '二';
            break;
        case 3:
            week = '三';
            break;
        case 4:
            week = '四';
            break;
        case 5:
            week = '五';
            break;
        case 6:
            week = '六';
            break;
        default:
            week = '日';
            break;
    }
    return week;
}

/**
 *
 *
 * @param {*} dt 日期或者时间
 * @returns 格式化好的日期或时间
 */
function fomat(dt) {
    return dt < 10 ? '0' + dt : dt;
}