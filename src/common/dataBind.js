

const dataBind = {
  // 时间戳格式转换
  formatDate:function(date, fmt) {
    date = new Date(date)
    if(fmt == undefined){
      fmt = "yyyy-MM-dd HH:mm:ss";
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  },

  // 当前时间距离数据时间的长度（计算时间为刚刚、几分钟前、几小时前、几天前）
  //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  timeago:function(dateTimeStamp){
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
      var hour = minute * 60;
      var day = hour * 24;
      var week = day * 7;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();   //获取当前时间毫秒
      var diffValue = now - dateTimeStamp;//时间差
  
      if(diffValue < 0){
        return;
      }
      var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
      var hourC = diffValue/hour;
      var dayC = diffValue/day;
      var weekC = diffValue/week;
      var monthC = diffValue/month;
      let result = ''
      if(monthC >= 1 && monthC <= 3){
          result = " " + parseInt(monthC) + "月前"
      }else if(weekC >= 1 && weekC <= 3){
          result = " " + parseInt(weekC) + "周前"
      }else if(dayC >= 1 && dayC <= 6){
          result = " " + parseInt(dayC) + "天前"
      }else if(hourC >= 1 && hourC <= 23){
          result = " " + parseInt(hourC) + "小时前"
      }else if(minC >= 1 && minC <= 59){
          result =" " + parseInt(minC) + "分钟前"
      }else if(diffValue >= 0 && diffValue <= minute){
          result = "刚刚"
      }else {
        var datetime = new Date();
        datetime.setTime(dateTimeStamp);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
      }
      return result;
  }
}

export default dataBind;