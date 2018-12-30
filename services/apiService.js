const config = require('../config.js');

const _request = (method, url, data, isAuth, callback, needLoading='Loading', ) => {
  if (needLoading) {
    wx.showLoading({
      title: needLoading,
      mask: true
    })
  }
  let accessToken = '';
  if (isAuth) {
    const user = wx.getStorageSync('user');
    accessToken = user.token;
  }
  console.log('accessToken', accessToken);
  wx.request({
    url: config.host_url + url,
    method: method,
    data: data,
    //获取localstorage 用户token
    header: {
      'authorization': 'Bearer ' + accessToken,
      'content-type': 'application/json',
    },
    success: (res) => {
      console.log('success', res.data);
      callback(null, res.data);      
      if (needLoading) {
        wx.hideLoading();
      }
    },
    fail: (error) => {
      callback(error);      
      if (needLoading) {
        wx.hideLoading();
      }
    }
  })
}

const _post = (url, data, isAuth, callback ) => {
  _request('POST', url, data, isAuth, callback);
}

const _get = (url, isAuth, callback) => {
  _request('GET', url, null, isAuth,callback);
}

//请求openid
// const getOpenid = (code, callback) => {
//   return _get('/wechat/getOpenid?code=' + code, callback);
// }
//请求openid
const getOpenid = (code, callback) => {
  return _post('/wechat/getOpenid', { code: code }, false, callback);
}

const registerUser = (data, callback) => {
  return _post('/user/insertUser', data, false, callback);
}

const getCategory = (callback) => {
  return _post('/category/CategoryList', {}, true, callback);
}

const subCategory = (data, callback) => {
  return _post('/category/subcategory', data, true, callback);
}
const itemsCategory = (data, callback) => {
  return _post('/category/itemsCategory', data, true, callback);
}
const totalCategory = (callback) => {
  return _post('/category/totalProducts', {}, true, callback);
}
const bannerList = (callback) => {
  return _post('/hotChannel/getBannerList', {}, true, callback);
}

const getIndexInfo = (callback) => {
  return _post('/hotChannel/getIndexInfo', {}, true, callback);
}

const getGoodsByCategory = (data, callback) => {
  return _post('/products/getGoodsByCategory', data, true, callback);
}

const getGoodsById = (data, callback) => {
  return _post('/products/getGoodsById', data, true, callback);
}

const getComment = (data, callback) => {
  return _post('/products/getComments', data, true, callback);
}

const feedback = (data, callback) => {
  return _post('/user/feedback', data, true, callback);
}

const saveAddress = (data, callback) => {
  return _post('/user/saveLocationAddress', data, true, callback);
}

const getAddressList = (callback) => {
  return _post('/user/getAddressList', {}, true, callback);
}

const addGoodToShoppingCarts = (data, callback) => {
  return _post('/products/addGoodToShoppingCarts', data, true, callback);
}

const getProductFromShoppingCart = (callback) => {
  return _post('/products/getProductFromShoppingCart', {}, true, callback);
}

const addToCollection = (data, callback) => {
  return _post('/products/addToCollection', data, true, callback);
}

const getListFromCollection = (callback) => {
  return _post('/products/getListFromCollection', {}, true, callback);
}

const deleteAddress = (data, callback) => {
  return _post('/user/deleteAddress', data, true, callback);
}

module.exports = {
  getOpenid: getOpenid,
  registerUser: registerUser,
  getCategory: getCategory,
  subCategory: subCategory,
  itemsCategory: itemsCategory,
  totalCategory: totalCategory,
  bannerList: bannerList,
  getIndexInfo: getIndexInfo,
  getGoodsByCategory,
  getGoodsById,
  getComment,
  feedback,
  saveAddress,
  getAddressList,
  addGoodToShoppingCarts,
  getProductFromShoppingCart,
  addToCollection,
  getListFromCollection,
  deleteAddress,
}
