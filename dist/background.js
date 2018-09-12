;(function() {
  var interval
  function initProgress() {
    axios.get('http://192.168.5.189:9100/progresses').then(function(response) {
      const { data } = response
      const count = data.length
      chrome.browserAction.setBadgeText({ text: count.toString() })
    })
  }

  initProgress()
  interval = setInterval(initProgress, 10000)

  chrome.runtime.onMessage.addListener(function(request) {
    const { message } = request
    chrome.notifications.create('', {
      iconUrl: 'images/yundun-128.png',
      type: 'list',
      title: '提醒',
      message,
      items: [
        {
          title: '提醒',
          message
        }
      ]
    })
  })
})()
