
function showToast(title, icon) {
  wx.showToast({
    title,
    icon
  })
}

function hideToast() {
  wx.hideToast();
}

function makePhoneCallWithNumber(mobile) {
  wx.makePhoneCall({
    phoneNumber: mobile,

  })
}

function showModalStyle(title, confirmText, content, confirm, cancel) {
  wx.showModal({
    title,
    content,
    confirmText,
    success: function(res) {
      if (res.confirm) {
        confirm();
      }
      if (res.cancel) {
        cancel();
      }
    }
  })
}

module.exports = {
  showToast,
  hideToast,
  makePhoneCallWithNumber,
  showModalStyle,
}