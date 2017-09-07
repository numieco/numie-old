var colors = ['#61D97A', '#8125FB', '#61D97A', '#8125FB', '#61D97A', '#8125FB', '#61D97A', '#8125FB', '#61D97A', '#8125FB']
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
      ;(function (index, arr, colors) {
        var scrollWatch = arr[index],
        watcher = scrollMonitor.create(scrollWatch, { top: -window.innerHeight/2, bottom: -window.innerHeight/2 })
        scrollWatch.style.opacity = 1

        watcher.enterViewport(function () {
          document.getElementById('Looper_Group').style.stroke = colors[index]
          console.log(index)
          var animateImage = scrollWatch.getElementsByClassName('animate-image')
          for (var i=0; i<animateImage.length; i++) {
            if (animateImage[i].classList.contains('project-fadedown')) {
              animateImage[i].classList.remove('project-fadedown')
            }
            if (animateImage[i].classList.contains('project-fadeup')) {
              animateImage[i].classList.remove('project-fadeup')
            }
          }

          scrollWatch.querySelector('.project-intro .hr-line').style.width = '50px'
          scrollWatch.querySelector('.cover-inner').classList.add('right')

          setTimeout(function () {
            scrollWatch.querySelector('.view-case-study').style.opacity = 1
          }, 600)

          var textRevealBlocks = scrollWatch.getElementsByClassName('init-animate-object')
          for (var i=0; i<textRevealBlocks.length; i++) {
            textRevealBlocks[i].classList.add('animate-object')
          }

          currentLocation = window.scrollY
        })

        watcher.exitViewport(function () {

          var animateImage = scrollWatch.getElementsByClassName('animate-image')
          if (currentLocation <= window.scrollY) {
            for (var i=0; i<animateImage.length; i++) {
              animateImage[i].classList.add('project-fadeup')
            }
          } else {
            for (var i=0; i<animateImage.length; i++) {
              animateImage[i].classList.add('project-fadedown')
            }
          }

          currentLocation = window.scrollY

          scrollWatch.querySelector('.project-intro .hr-line').style.width = '0px'
          scrollWatch.querySelector('.cover-inner').classList.remove('right')

          setTimeout(function () {
            scrollWatch.querySelector('.view-case-study').style.opacity = 0
          }, 600)

          var textRevealBlocks = scrollWatch.getElementsByClassName('init-animate-object')
          for (var i=0; i<textRevealBlocks.length; i++) {
            textRevealBlocks[i].classList.remove('animate-object')
          }

        })
      })(i, arr, colors)
    }
  }
}
