var colors = ['#61D97A', '#8125FB']
var currentLocation = window.scrollY

window.onscroll = () => {
  document.querySelector('.bg-looper > svg').style.transform = 'rotate(' + (window.scrollY / 180 / (Math.PI * 2)) + 'rad)'
}

if (window.innerWidth >= 992) {

  window.onload = () => {
    var arr =  document.getElementsByClassName('project-details')
    var projectPreview = document.querySelector('.project-preview')
    var height = projectPreview.clientHeight

    $('.project').fixer()

    for (var i=0; i<arr.length; i++) {
      (function (i, arr) {
        var scrollWatch = arr[i],
        watcher = scrollMonitor.create(scrollWatch, { top: -window.innerHeight/2, bottom: -window.innerHeight/2 })
        scrollWatch.style.opacity = 1

        watcher.enterViewport(function () {
          document.querySelector('.bg-looper > svg > g > g').style.stroke = colors[i]
          scrollWatch.querySelector('.project-intro').classList.add('project-fadein')
          setTimeout(function () {
            scrollWatch.querySelector('.project-showcase').classList.add('project-fadein')
          }, 1000)

          setTimeout (function () {
            scrollWatch.querySelector('.project-intro').classList.remove('project-fadeout')
            scrollWatch.querySelector('.project-showcase').classList.remove('project-fadeout')
          }, 1500)
          currentLocation = window.scrollY
        })

        watcher.exitViewport(function () {
          if (currentLocation <= window.scrollY) {
            scrollWatch.querySelector('.project-intro').classList.remove('project-fadein')
            scrollWatch.querySelector('.project-intro').classList.add('project-fadeout')

            setTimeout(function () {
              scrollWatch.querySelector('.project-showcase').classList.remove('project-fadein')
              scrollWatch.querySelector('.project-showcase').classList.add('project-fadeout')
            }, 500)
          } else {
            scrollWatch.querySelector('.project-intro').classList.remove('project-fadein')

            setTimeout(function () {
              scrollWatch.querySelector('.project-showcase').classList.remove('project-fadein')
            }, 500)
          }
          currentLocation = window.scrollY
        })
      })(i, arr)
    }
  }
}
