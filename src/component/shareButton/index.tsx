import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  LOCATION_ADDRESS,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"
import { useKakao } from "../store"

/**
 * 카카오톡으로 초대장을 공유할 수 있는 버튼 컴포넌트입니다.
 *
 * @returns {JSX.Element} 공유 버튼 섹션
 */
export const ShareButton = () => {
  const kakao = useKakao()

  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          if (!kakao) {
            return
          }

          const shareUrl = 'https://dongdongju84114.github.io/wedding-invitation/';

          const mapPageUrl = 'https://place.map.kakao.com/767048338';
          const imageUrl = new URL(
            "kakao_preview.png?v=20260720-square",
            shareUrl,
          ).href

          kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              description:
                WEDDING_DATE.format(WEDDING_DATE_FORMAT) +
                "\n" +
                LOCATION +
                "\n" +
                LOCATION_ADDRESS,
              imageUrl,
              link: {
                mobileWebUrl: 'https://dongdongju84114.github.io/wedding-invitation/',
                webUrl: 'https://dongdongju84114.github.io/wedding-invitation/',
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl: 'https://dongdongju84114.github.io/wedding-invitation/',
                  webUrl: 'https://dongdongju84114.github.io/wedding-invitation/',
                },
              },
              {
                title: "오시는 길",
                link: {
                  mobileWebUrl: mapPageUrl,
                  webUrl: mapPageUrl,
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
