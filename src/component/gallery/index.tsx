import { useCallback, useEffect, useRef, useState } from "react"
import { LazyDiv } from "../lazyDiv"
import { GALLERY_IMAGES } from "../../images"

/**
 * 캐러셀 아이템 요소 생성
 */
const CAROUSEL_ITEMS = GALLERY_IMAGES.map((item, idx) => (
  <div className="carousel-item" key={idx}>
    <img src={item} draggable={false} alt={`${idx}`} />
  </div>
))

/**
 * 갤러리 컴포넌트입니다.
 * 브라우저 기본 가로 스크롤과 CSS scroll snap을 사용합니다.
 *
 * @returns {JSX.Element} 갤러리 섹션
 */
export const Gallery = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    // 이미지 프리로드 (Preload)
    GALLERY_IMAGES.forEach((image) => {
      const img = new Image()
      img.src = image
    })
  }, [])

  /**
   * 현재 스크롤 위치에 맞춰 인디케이터를 갱신합니다.
   */
  const onScroll = useCallback(() => {
    const carousel = carouselRef.current
    if (!carousel || carousel.clientWidth === 0) return

    const nextSlide = Math.min(
      CAROUSEL_ITEMS.length - 1,
      Math.max(0, Math.round(carousel.scrollLeft / carousel.clientWidth)),
    )

    setSlide((currentSlide) =>
      currentSlide === nextSlide ? currentSlide : nextSlide,
    )
  }, [])

  /**
   * 인디케이터 클릭 시 해당 이미지로 이동합니다.
   */
  const onIndicatorClick = useCallback((idx: number) => {
    const carousel = carouselRef.current
    if (!carousel) return

    carousel.scrollTo({
      left: carousel.clientWidth * idx,
      behavior: "smooth",
    })
  }, [])

  return (
    <LazyDiv className="card gallery">
      <h2 className="english">Gallery</h2>
      <div className="carousel-wrapper">
        <div className="carousel" ref={carouselRef} onScroll={onScroll}>
          <div className="carousel-list">{CAROUSEL_ITEMS}</div>
        </div>

        {/* 하단 인디케이터 (점) */}
        <div className="carousel-indicator">
          {CAROUSEL_ITEMS.map((_, idx) => (
            <button
              type="button"
              key={idx}
              className={`indicator${idx === slide ? " active" : ""}`}
              aria-label={`${idx + 1}번째 사진 보기`}
              aria-current={idx === slide}
              onClick={() => onIndicatorClick(idx)}
            />
          ))}
        </div>
      </div>
    </LazyDiv>
  )
}
