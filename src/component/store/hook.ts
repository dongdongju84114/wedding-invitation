/* eslint-disable @typescript-eslint/no-explicit-any */

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "./context"
import { KAKAO_SDK_JS_KEY } from "../../env"

const baseUrl = import.meta.env.BASE_URL

// 카카오 공유/내비 SDK
const KAKAO_SDK_URL = `${baseUrl}/kakao_js_sdk/2.7.1/kakao.min.js`

// 카카오 지도 SDK
const KAKAO_MAP_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_SDK_JS_KEY}&autoload=false`

let kakaoMapsLoader: Promise<any> | null = null

const loadKakaoMaps = () => {
  if (!KAKAO_SDK_JS_KEY) {
    return Promise.resolve(null)
  }

  if ((window as any).kakao?.maps) {
    return new Promise((resolve) => {
      ;(window as any).kakao.maps.load(() => {
        resolve((window as any).kakao.maps)
      })
    })
  }

  if (kakaoMapsLoader) {
    return kakaoMapsLoader
  }

  kakaoMapsLoader = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src^="https://dapi.kakao.com/v2/maps/sdk.js"]`,
    )

    const onLoad = () => {
      ;(window as any).kakao.maps.load(() => {
        resolve((window as any).kakao.maps)
      })
    }

    if (existingScript) {
      existingScript.addEventListener("load", onLoad, { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = KAKAO_MAP_URL
    script.async = true
    script.addEventListener("load", onLoad)
    script.addEventListener("error", reject)
    document.head.appendChild(script)
  })

  return kakaoMapsLoader
}

export const useKakaoMaps = () => {
  const [kakaoMaps, setKakaoMaps] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    loadKakaoMaps().then((maps) => {
      if (mounted) {
        setKakaoMaps(maps)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  return kakaoMaps
}

/**
 * 카카오 SDK를 로드하고 사용할 수 있게 해주는 Hook입니다.
 * 카카오 내비 / 공유용입니다.
 */
export const useKakao = () => {
  const { kakao, setKakao } = useContext(StoreContext)

  useEffect(() => {
    if (!KAKAO_SDK_JS_KEY) {
      return
    }

    if (!document.querySelector(`script[src="${KAKAO_SDK_URL}"]`)) {
      const script = document.createElement("script")
      script.addEventListener("load", () => {
        if (!(window as any).Kakao.isInitialized()) {
          ;(window as any).Kakao.init(KAKAO_SDK_JS_KEY)
        }
        setKakao((window as any).Kakao)
      })
      script.src = KAKAO_SDK_URL
      document.head.appendChild(script)
    } else if ((window as any).Kakao) {
      if (!(window as any).Kakao.isInitialized()) {
        ;(window as any).Kakao.init(KAKAO_SDK_JS_KEY)
      }
      setKakao((window as any).Kakao)
    }
  }, [setKakao])

  return kakao
}