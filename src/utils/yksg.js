// 时间方法
export const dateOne = (e) => {
    let d = new Date(e);
    let Y = d.getFullYear();
    let M = d.getMonth() + 1;
    let D = d.getDate();
    if (D < 10) {
        D = '0' + D;
    }
    if (M < 10) {
        M = '0' + M;
    }
    let dates = Y + '.' + M + '.' + D;
    return dates;

}

// 获取图片
export const getObjectURL = (file) => {
    var url = null;
    if (window.createObjectURL != undefined) {  // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {   // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {   // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
