var colors = ['#61D97A', '#8125FB']

window.onscroll = () => {
  document.querySelector('.bg-looper > svg').style.transform = 'rotate(' + (window.scrollY / 180 / (Math.PI * 2)) + 'rad)'
  // console.log(document.querySelector('.project-preview').offsetTop - window.scrollY)
}

if (window.innerWidth >= 992) {

window.onload = () => {
  var arr =  document.getElementsByClassName('my-project')
  var projectPreview = document.querySelector('.project-preview')
  var height = projectPreview.clientHeight
  // height += (1000 * arr.length)
  // projectPreview.style.height = height + 'px'


    $('.project').fixer({
      gap: 50
    })

     for (var i=0; i<arr.length; i++) {

      (function (i, arr) {
        console.log(colors[i])

        var scrollWatch = arr[i],
        watcher = scrollMonitor.create(scrollWatch, -500)

        scrollWatch.style.opacity = 1

        watcher.enterViewport(function () {
          document.querySelector('.bg-looper > svg > g > g').style.stroke = colors[i]
          scrollWatch.querySelector('.project-intro').classList.add('project-fadein')
          setTimeout(function () {
            scrollWatch.querySelector('.project-showcase').classList.add('project-fadein')
          }, 1000)
        })

        watcher.exitViewport(function () {
          scrollWatch.querySelector('.project-intro').classList.remove('project-fadein')
          scrollWatch.querySelector('.project-intro').classList.add('project-fadeout')

          setTimeout(function () {
            scrollWatch.querySelector('.project-showcase').classList.remove('project-fadein')
            scrollWatch.querySelector('.project-showcase').classList.add('project-fadeout')
          }, 500)

          setTimeout(function() {
            scrollWatch.querySelector('.project-intro').classList.remove('project-fadeout')
            scrollWatch.querySelector('.project-showcase').classList.remove('project-fadeout')
          }, 2000)
        })
      })(i, arr)
    }
  }




/*
  var scrollWatch_cliqueMeet = document.querySelector('.clique-meet'),
  watcher_cliqueMeet = scrollMonitor.create(scrollWatch_cliqueMeet, -500)

  watcher_cliqueMeet.enterViewport(function () {
    console.log('entered')

    scrollWatch_cliqueMeet.querySelector('.project-intro').classList.add('project-fadein')

    setTimeout(function () {
      scrollWatch_cliqueMeet.querySelector('.project-showcase').classList.add('project-fadein')
    }, 1000)

  })

  watcher_cliqueMeet.exitViewport(function () {
    console.log('exit')

    scrollWatch_cliqueMeet.querySelector('.project-intro').classList.remove('project-fadein')
    scrollWatch_cliqueMeet.querySelector('.project-intro').classList.add('project-fadeout')

    setTimeout(function () {
      scrollWatch_cliqueMeet.querySelector('.project-showcase').classList.remove('project-fadein')
      scrollWatch_cliqueMeet.querySelector('.project-showcase').classList.add('project-fadeout')
    }, 500)

    setTimeout(function() {
      scrollWatch_cliqueMeet.querySelector('.project-intro').classList.remove('project-fadeout')
      scrollWatch_cliqueMeet.querySelector('.project-showcase').classList.remove('project-fadeout')
    }, 2000)
  })
*/
}
