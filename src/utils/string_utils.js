
/**
*  封装一些字符串处理的小方法
*  by fushang318
*/
export default class StringUtils {
  /**
  * "132 3321 1111" -> "13233211111"
  */
  static phoneNumberHuman2Data(human_phone_number){
    return human_phone_number.replace(/ /g, "")
  }

  /**
  * "13233211111" -> "132 3321 1111"
  */
  static phoneNumberData2Human(data_phone_number){
    let str = this.phoneNumberHuman2Data(data_phone_number)
    str.match(/([0-9]{3})([0-9]{4})([0-9]{4})/)
    return `${RegExp.$1} ${RegExp.$2} ${RegExp.$3}`
  }

  static bankCardNumberData2Human(bank_card_number){
    let str = bank_card_number
    str.match(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]{4})/)
    return `${RegExp.$1} ${RegExp.$2} ${RegExp.$3} ${RegExp.$4}`
  }

  /* 保留两位小数
   * "25000" -> "25,000.00"
   */
  static moneyFormatData2Money(money_data){
    money_data = money_data.toString().replace(/\$|\,/g,'')

    if(isNaN(money_data)){
      money_data = "0"
    }

    let sign = (money_data == (money_data = Math.abs(money_data)));
    money_data = Math.floor(money_data*100+0.50000000001);
    let cents = money_data%100;
    money_data = Math.floor(money_data/100).toString();

    if(cents<10){
      cents = "0" + cents;
    }

    for (let i = 0; i < Math.floor((money_data.length-(1+i))/3); i++){
      money_data = money_data.substring(0,money_data.length-(4*i+3))+','+
      money_data.substring(money_data.length-(4*i+3));
    }

    return (((sign)?'':'-') + money_data + '.' + cents);
  }
}
