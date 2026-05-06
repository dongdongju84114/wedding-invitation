import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용 시
            <br />
            지하철 <b>1호선 / 인천1호선 부평역</b> 하차
            <br />
            → 부평역사 건물 내 이동
            <br />
            → <b>부평민자역사 5층</b>
            <br />
            → <b>그레이스파티 인천 웨딩홀</b>
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            <b>부평역</b> 또는 <b>부평역사</b> 인근 정류장 하차
            <br />
            → 부평역사 건물 방향으로 이동
            <br />
            → <b>부평민자역사 5층</b>
            <br />
            → <b>그레이스파티 인천 웨딩홀</b>
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 내비, 티맵 등 이용
            <br />
            <b>그레이스파티 인천 웨딩홀</b> 검색
            <br />
            또는
            <br />
            <b>인천 부평구 광장로 16</b> 검색
            <br />
            부평민자역사 5층으로 오시면 됩니다.
          </div>
          <div />
          <div className="content">
            <b>
              ※ 주차는 부평역사 및 인근 주차장을 이용해 주세요.
              <br />
              주차 지원 여부는 현장 안내를 확인해 주시기 바랍니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}