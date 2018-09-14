;(function() {
  var interval

  function initProgress() {
    axios.get('http://192.168.5.189:9100/progresses').then(function(response) {
      const { data } = response
      const count = data.length

      chrome.browserAction.setBadgeText({
        text: count > 0 ? count.toString() : ''
      })
    })

    axios
      .get('http://192.168.5.189:9100/notices?clientid=yundun')
      .then(function(response) {
        const { data = [] } = response

        data.forEach(item => {
          const { content } = item
          const [name, status] = content.split(',')

          chrome.notifications.create({
            iconUrl: 'images/yundun-128.png',
            title: name,
            type: 'basic',
            message: status
          })
        })
      })
  }

  initProgress()
  interval = setInterval(initProgress, 10000)

  chrome.runtime.onMessage.addListener(function(request) {
    const { message } = request
    chrome.notifications.create('', {
      iconUrl: 'images/yundun-128.png',
      type: 'basic',
      title: '提醒',
      message
    })
  })
})()
