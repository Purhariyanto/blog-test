const React = require('react')

const HeadComponents = [
  <script
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5738026098468973"
    crossOrigin="anonymous"
    async
    key="google-adsense-script"
  />
]

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `id` })
  setHeadComponents(HeadComponents)
}