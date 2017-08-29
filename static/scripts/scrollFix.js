var projects = $('.project')
var positionTop = []
var index = 1

$('.project-preview').css({
  'height': $('.project-preview').outerHeight()
})

$.each(projects, function(i, val) {
  positionTop.push($(val).position().top)
  $(val).css({
    'top': '0',
    'left': '85px',
    'right': '70px',
    'z-index': 10000-i,
    'transform': 'translateY(0px)'
  })
})

$(window).scroll(function () {
  $('.bg-looper > svg').css({ transform: 'rotate(' + ($(window).scrollTop() / 180 / (Math.PI * 2)) + 'rad)' })

  if (($('footer').offset().top) <= (window.scrollY + $(projects[0]).outerHeight())) {
    document.querySelector('.bg-looper').classList.add('bg-looper--bottom')
  } else {
    document.querySelector('.bg-looper').classList.remove('bg-looper--bottom')
  }
})

$(document).ready(function () {
  $('.bg-looper').scrollToFixed({
    limit: $('footer').offset().top - $(projects[0]).outerHeight(),

    postFixed: function () {
      console.log('out now')
      $.each(projects, function(i, val) {
        $(val).css({
          'position': 'static'
        })
      })
    },

    preFixed: function () {
      document.querySelector('.bg-looper').classList.remove('bg-looper--bottom')
      $.each(projects, function(i, val) {
        $(val).css({
          'position': 'fixed'
        })
      })

      var scrollY = window.scrollY
      $(window).scroll(function () {
        $(projects[index-1]).css({
          'transform': 'translateY(-'+ (window.scrollY - scrollY)  +'px)'
        })
      })
    }
  })
})
