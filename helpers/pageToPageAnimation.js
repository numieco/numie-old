var createDOMEl = (type, className, content) => {
  var el = document.createElement(type)
  el.className = className || ''
  el.innerHTML = content || ''
  return el
}

var showAnimation = (revealSettings) => {

  let revealBlock = (
    revealSettings.revealBlock
    ? document.querySelector('.' + revealSettings.revealBlock)
    : document.querySelector('.default-reveal__element')
  )
  if(revealBlock === null) {
    revealBlock = createDOMEl('div', revealSettings.revealBlock ? revealSettings.revealBlock : 'default-reveal__element')
    document.querySelector('main').appendChild(revealBlock)
  }

  let transformSettings = ((direction) => {
    switch (direction) {
      case 'lr' :
        return {
          val: 'scale3d(0,1,1)',
          origin: '0 50%',
          halfway: '100% 50%'
        }

      case 'rl' :
        return {
          val: 'scale3d(0,1,1)',
          origin: '100% 50%',
          halfway: '0 50%'
        }

      case 'tb' :
        return {
          val: 'scale3d(1,0,1)',
          origin: '50% 0',
          halfway: '50% 100%'
        }

      case 'bt' :
        return {
          val: 'scale3d(1,0,1)',
          origin: '50% 100%',
          halfway: '50% 0'
        }

      default :
        return {
          val: 'scale3d(0,1,1)',
          origin: '0 50%',
          halfway: '100% 50%'
        }
    }
  })(revealSettings.direction)

  /*

  if ((revealSettings.type === 'start' && revealSettings.direction === 'tb')
      || (revealSettings.type !== 'start' && revealSettings.direction === 'bt')) {
    revealBlock.style.top = '-100vh'
  } else {
    revealBlock.style.top = '0'
  }

  if((revealSettings.direction === 'lr') || (revealSettings.direction === 'rl')) {
    revealBlock.style.width = '200vw'
    if (revealSettings.direction === 'rl' && revealSettings.type === 'start') {
      revealBlock.style.right = '100vw'
      revealBlock.style.left = '0'
    }

    if (revealSettings.direction === 'rl' && revealSettings.type === 'close') {
      revealBlock.style.left = '-100vw'
    }


    if (revealSettings.direction === 'lr' && revealSettings.type === 'start') {
      revealBlock.style.left = '-100vw'
    }

  }

  */

  revealBlock.style.WebkitTransform = revealBlock.style.transform = transformSettings.val
  revealBlock.style.WebkitTransformOrigin = revealBlock.style.transformOrigin =  transformSettings.origin
  if(revealSettings.halfway) {
    revealBlock.style.WebkitTransformOrigin = revealBlock.style.transformOrigin =  transformSettings.halfway
  }
  revealBlock.style.backgroundColor = revealSettings.bgcolor
  revealBlock.style.opacity = 1

  let coverArea = revealSettings.coverArea = 0

  let animationSettings = {
    targets: revealBlock,
    delay: revealSettings.delay,
    duration: revealSettings.duration,
    easing: 'easeInOutQuint',
    complete: revealSettings.onComplete
  }

  if( revealSettings.direction === 'lr' || revealSettings.direction === 'rl' ) {
    if (revealSettings.type === 'start')
      animationSettings.scaleX = [0,1]
    else
      animationSettings.scaleX = [1,coverArea/100]
  }
  else {
    if (revealSettings.type === 'start')
      animationSettings.scaleY = [0,1]
    else
      animationSettings.scaleY = [1,coverArea/100]
  }

  anime(animationSettings)
}

module.exports = showAnimation
