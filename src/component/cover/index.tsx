import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { COVER_IMAGE } from "../../images"
import { LazyDiv } from "../lazyDiv"

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

/**
 * 초대장의 메인 커버 섹션입니다.
 * 예식 일시, 신랑/신부 이름, 장소를 표시합니다.
 *
 * @returns {JSX.Element} 커버 섹션
 */
export const Cover = () => {
  return (
    <LazyDiv className="card cover">
      <div className="cover-panel">
        <div className="cover-label" aria-label="Our Wedding Day">
          <span>Our Wedding{" "}</span>
          <span>Day</span>
        </div>
        {/* 상단 날짜 표시 */}
        <div className="wedding-date">
          <span>{WEDDING_DATE.format("YYYY")}</span>
          <div className="divider" />
          <span>{WEDDING_DATE.format("MM")}</span>
          <div className="divider" />
          <span>{WEDDING_DATE.format("DD")}</span>
        </div>
        {/* 요일 표시 (영어) */}
        <div className="wedding-day-of-week">
          {DAY_OF_WEEK[WEDDING_DATE.day()]}
        </div>
      </div>

      {/* 커버 이미지 */}
      <div className="image-wrapper">
        <div className="photo-tape" />
        <img src={COVER_IMAGE} alt="sample" />
      </div>

      <div className="cover-panel">
        {/* 이름 표시 */}
        <div className="names">
          {GROOM_FULLNAME}
          <div className="divider" />
          {BRIDE_FULLNAME}
        </div>
        {/* 예식 정보 (포맷팅된 날짜 및 장소) */}
        <div className="info">{WEDDING_DATE.format(WEDDING_DATE_FORMAT)}</div>
        <div className="info">{LOCATION}</div>
      </div>
    </LazyDiv>
  )
}
