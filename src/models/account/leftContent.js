/**
 * Created by cyt on 2017/5/9.
 */

export default {
  namespace: 'leftContent',//唯一的
  state: {
    data: [],
    key:[],
    isShow: false
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },


  },
  effects: {


  },


  subscriptions: {

  },


};

