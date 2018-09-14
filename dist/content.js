chrome.extension.sendMessage({
  text: 'showNotifications'
})

function getStorage(key) {
  return new Promise(function(resolve) {
    // eslint-disable-next-line
    chrome.storage.sync.get(key, function(rs) {
      resolve(rs[key])
    })
  })
}

async function login() {
  const data = await getStorage('testAccount')
  const { name, password } = data[0]

  axios
    .post('/api/sso/V4/login', `username=${name}&password=${password}`)
    .then(function(response) {
      window.location = document.referrer || '/'
    })
    .catch(function(error) {
      console.log(error)
      chrome.extension.sendMessage({
        message: error
      })
    })
}

// 一键登录
document.onkeydown = function(e) {
  var keyCode = e.keyCode || e.which || e.charCode
  var ctrlKey = e.ctrlKey || e.metaKey

  // CTRL + Y
  if (ctrlKey && keyCode == 89) {
    login()
  }
}
