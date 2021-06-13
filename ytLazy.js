var ytLazy = {
  options: {},

  init: function (options) {
    if (options && typeof options === 'object') {
      this.options = options
    }

    var ytVideos = document.getElementsByClassName('ytLazy')
    if (ytVideos.length === 0) {
      return
    }

    for (var i = 0; i < ytVideos.length; i++) {
      var videoParams = this._parseURL(ytVideos[i].dataset.ytlazyVideo)

      this._build(ytVideos[i], videoParams)
      ytVideos[i].onclick = this._onPlay.bind(this, ytVideos[i], videoParams.v)
    }
  },

  updateOne: function (element) {
    var videoParams = this._parseURL(element.dataset.ytlazyVideo)
    this.destroyOne(element)
    this._build(element, videoParams)
    element.onclick = this._onPlay.bind(this, element, videoParams.v)
  },

  destroy: function () {
    var ytVideos = document.getElementsByClassName('ytLazy')
    if (ytVideos.length === 0) {
      return
    }

    for (var i = 0; i < ytVideos.length; i++) {
      ytVideos[i].onclick = null
      ytVideos[i].innerHTML = ''
    }
  },

  destroyOne: function (element) {
    element.innerHTML = ''
    element.onclick = null
  },

  _build: function (element, params) {
    element.appendChild(this._playButton())
    element.appendChild(this._preview(params.v))
  },

  _playButton: function () {
    var button = document.createElement('button')
    button.classList.add('ytLazy-playButton')
    button.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="ytLazy-playButton-icon" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>'
    return button
  },

  _onPlay: function (element, videoId, i) {
    element.appendChild(this._darkOverlay())
    element.appendChild(this._iframe(videoId))
    element.onclick = null
  },

  _preview: function (videoId) {
    var resolution = 'sddefault'

    if (this.options.previewResolution) {
      resolution = this.options.previewResolution
    }

    var imageUrl = 'https://img.youtube.com/vi/' + videoId + '/' + resolution + '.jpg'
    var img = document.createElement('img')

    img.src = imageUrl
    img.alt = 'YouTube Video'

    img.classList.add('ytLazy-preview')
    return img
  },

  _darkOverlay: function () {
    var overlay = document.createElement('div')
    overlay.classList.add('ytLazy-darkOverlay')
    return overlay
  },

  _iframe: function (videoId) {
    var src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1'

    if(typeof this.options.relatedVideos !== 'undefined' && this.options.relatedVideos === false) {
      src += '&rel=0'
    }

    var iframe = document.createElement('iframe')
    iframe.classList.add('ytLazy-iframe')
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.src = src
    iframe.title = 'YouTube video player'
    iframe.frameBorder = '0'
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    iframe.allowFullscreen = true
    return iframe
  },

  _parseURL: function (url) {
    var parsedParams = {}
    var uri = url.split('/')
    uri = uri[uri.length - 1].split('?')

    var params = uri[uri.length - 1]

    if (params.indexOf('&') !== -1) {
      var paramsSlitted = params.split('&')
      for (var i = 0; i < paramsSlitted.length; i++) {
        parsedParams[paramsSlitted[i].split('=')[0]] = paramsSlitted[i].split('=')[1]
      }
    } else {
      parsedParams[params.split('=')[0]] = params.split('=')[1]
    }

    return parsedParams
  }
}

window.ytLazy = ytLazy