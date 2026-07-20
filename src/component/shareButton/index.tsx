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

          const shareUrl =
            "https://dongdongju84114.github.io/wedding-invitation/"
          const imageUrl = new URL(
            "kakao_preview.png?v=20260720-square",
            shareUrl,
          ).href

          kakao.Share.sendCustom({
            templateId: 135481,
            templateArgs: {
              IMAGE_URL: imageUrl,
            },
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
