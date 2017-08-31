window.onscroll = () => {
  document.querySelector('.bg-looper > svg').style.transform = 'rotate(' + (window.scrollY / 180 / (Math.PI * 4)) + 'rad)'
}

window.onload = () => {

  var arr =  document.getElementsByClassName('project')

  for (var i=0; i<arr.length; i++) {
    (function (i, arr) {

      var scrollWatch = arr[i],
      watcher = scrollMonitor.create(scrollWatch, -500)

      watcher.enterViewport(function () {
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
