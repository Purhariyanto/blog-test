import React, { useEffect } from "react"

const AdsBot = props => {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div className="min-w-full mx-auto">
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-5738026098468973"
        data-ad-slot="7851563044"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}

export default AdsBot
