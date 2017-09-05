import React, {Component} from        'react'
import Head from                      'next/head'
import {Helmet} from                  'react-helmet'
import ReactGA from                   'react-ga'

import stylesheet from 'styles/index.sass'

const page = {
  index: {
    title: 'Numie - Digital Studio',
    description: 'Numie is an in-house digital and marketing studio.',
    url: 'https://numie.co',
    keywords: 'test',
    facebookShare: 'static/images/meta/facebook_share.png',
    twitterShare: 'static/images/meta/twitter_share.png',
    favicon: 'static/images/meta/favicon.ico'
  }
};

export default class Layout extends Component {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    document.documentElement.className = 'js'
    // //Google Analytics
    // ReactGA.initialize('UA-XXXXXXXXX-X')
    // ReactGA.pageview(document.location.pathname)
  }

  render () {
    return (
      <div>

        <Head>

          <title>{page.index.title}</title>

          <meta charSet='utf-8'></meta>
          <meta httpEquiv='x-ua-compatible' content='ie=edge'></meta>
          <meta name='format-detection' content='telephone=no'></meta>
          <meta name='viewport' content='width=device-width,initial-scale=1'></meta>
          <meta content='width=device-width' name='viewport'></meta>
          <meta content='yes' name='apple-mobile-web-app-capable'></meta>
          <meta content='yes' name='apple-touch-fullscreen'></meta>

          <link rel='icon' href={page.index.favicon} type='image/x-icon'></link>

          {/* Google content */}
          <meta content={page.index.title} name='application-name'></meta>
          <meta content={page.index.description} name='description'></meta>
          <meta content={page.index.title} name='author'></meta>
          <meta content={page.index.keywords} name='keywords'></meta>
          <meta content='2017' name='copyright'></meta>


          {/*Facebook content*/}
          <meta content='website' property='og:type'></meta>
          <meta content={page.index.title} property='og:title'></meta>
          <meta content={page.index.description} property='og:description'></meta>
          <meta content={page.index.facebookShare} property='og:image'></meta>
          <meta content={page.index.url} property='og:url'></meta>


          {/*Twitter content*/}
          <meta content='summary' name='twitter:card'></meta>
          <meta content={page.index.title} name='twitter:title'></meta>
          <meta content={page.index.description} name='twitter:description'></meta>
          <meta content={page.index.twitterShare} name='twitter:image'></meta>

          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet" />

          <style dangerouslySetInnerHTML={{ __html: stylesheet }}/>

        </Head>
        <main>
          {this.props.children}
        </main>

        <script type="text/javascript" src='/static/scripts/anime.min.js'></script>
        <script type="text/javascript" src='/static/scripts/main.js'></script>
        <script type="text/javascript" src='/static/scripts/jquery-3.2.1.min.js'></script>
        <script type="text/javascript" src='/static/scripts/sticky.min.js'></script>
        <script type="text/javascript" src='/static/scripts/scrollMonitor.js'></script>
        <script type="text/javascript" src='/static/scripts/revealProjects.js'></script>

      </div>

    )
  }
}
