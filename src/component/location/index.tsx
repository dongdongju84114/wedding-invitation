import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

const busRoutes = [
  {
    color: "blue",
    label: "간선",
    routes: "1, 2, 10, 11, 12, 23, 24-1, 30, 34, 35, 40, 43, 45, 111-2, 112, 721",
  },
  {
    color: "green",
    label: "지선",
    routes: "551, 552, 555, 556, 557, 558, 560, 561, 562, 565, 570, 571, 574, 579, 581, 585, 586",
  },
  {
    color: "red",
    label: "광역",
    routes: "1400, 9500",
  },
  {
    color: "neutral",
    label: "급행",
    routes: "904, 904-1",
  },
  {
    color: "neutral",
    label: "도시형",
    routes: "81, 88",
  },
  {
    color: "neutral",
    label: "좌석버스",
    routes: "103-1, 111",
  },
  {
    color: "neutral",
    label: "시외버스",
    routes: "90, 3000, 3700",
  },
]

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
          <div className="location-info-heading">
            <div className="transportation-icon-wrapper">
              <BusIcon className="transportation-icon" />
            </div>
            <div>
              <div className="heading">대중교통</div>
              <div className="subheading">부평역 하차 후 역사 안에서 5층으로 이동</div>
            </div>
          </div>

          <div className="route-group">
            <div className="route-label">지하철</div>
            <ol className="route-steps">
              <li>
                <span className="step-number">1</span>
                <span><b>서울 1호선 부평역</b> 또는 <b>인천지하철 부평역</b> 하차</span>
              </li>
              <li>
                <span className="step-number">2</span>
                <span>부평역사 쇼핑몰 안으로 이동</span>
              </li>
              <li>
                <span className="step-number">3</span>
                <span><b>부평역사 쇼핑몰 5층</b> 그레이스파티 인천점</span>
              </li>
            </ol>
          </div>

          <div className="route-group">
            <div className="route-label">버스</div>
            <div className="bus-route-list">
              {busRoutes.map(({ color, label, routes }) => (
                <div className="bus-route" key={label}>
                  <span className={`bus-badge ${color}`}>{label}</span>
                  <span className="bus-numbers">{routes}</span>
                </div>
              ))}
            </div>
            <ol className="route-steps">
              <li>
                <span className="step-number">1</span>
                <span><b>부평역</b> 또는 <b>부평역사</b> 인근 정류장 하차</span>
              </li>
              <li>
                <span className="step-number">2</span>
                <span>부평역사 건물 방향으로 이동</span>
              </li>
              <li>
                <span className="step-number">3</span>
                <span><b>부평역사 쇼핑몰 5층</b> 그레이스파티 인천점</span>
              </li>
            </ol>
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="location-info-heading">
            <div className="transportation-icon-wrapper">
              <CarIcon className="transportation-icon" />
            </div>
            <div>
              <div className="heading">자가용 · 주차</div>
              <div className="subheading">내비 검색 후 부평민자역사 5층으로 이동</div>
            </div>
          </div>

          <div className="route-group">
            <div className="route-label">내비 검색어</div>
            <div className="keyword-list">
              <span className="keyword">그레이스파티 인천점</span>
              <span className="keyword">부평역사쇼핑몰</span>
            </div>
            <ol className="route-steps">
              <li>
                <span className="step-number">1</span>
                <span><b>인천 부평구 광장로 16</b> 또는 <b>부평동 738-21</b> 검색</span>
              </li>
              <li>
                <span className="step-number">2</span>
                <span>부평역광장 역사 우측 <b>대아골프랜드 주차장</b> 이용</span>
              </li>
              <li>
                <span className="step-number">3</span>
                <span>웨딩홀에서 <b>주차확인</b>을 받아 주세요. <b>2시간 무료주차</b> 가능합니다.</span>
              </li>
            </ol>
          </div>

          <div className="parking-note">
            교통이 혼잡하오니 대중교통을 이용하시면 더 편리합니다.
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
