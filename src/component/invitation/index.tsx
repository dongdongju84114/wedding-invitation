import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { Modal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"
import { useState } from "react"

/**
 * 초대 메시지와 혼주 정보, 연락하기 기능을 제공하는 컴포넌트입니다.
 *
 * @returns {JSX.Element} 모시는 글 섹션
 */
export const Invitation = () => {
  const contactModalState = useState(false)
  return (
    <>
      <LazyDiv className="card invitation">
        <h2 className="english">Invitation</h2>

        <div className="break" />

        {/* 초대 문구 */}
        <div className="content">서로의 가장 좋은 친구가 되어</div>
        <div className="content">평생을 함께 걸어가려 합니다.</div>
        <div className="content">소중한 분들을 모시고</div>
        <div className="content">저희의 시작을 함께 나누고 싶습니다.</div>
        <div className="family-spacing" />

        {/* 혼주 및 신랑 정보 */}
        <div className="name">
          {GROOM_FATHER} · {GROOM_MOTHER}
          <span className="relation">
            의 <span className="relation-name">{GROOM_TITLE}</span>
          </span>{" "}
          {GROOM_FULLNAME}
        </div>
        {/* 혼주 및 신부 정보 */}
        <div className="name">
          {BRIDE_FATHER} · {BRIDE_MOTHER}
          <span className="relation">
            의 <span className="relation-name">{BRIDE_TITLE}</span>
          </span>{" "}
          {BRIDE_FULLNAME}
        </div>

        <div className="family-spacing" />

        <Button
          className="fixed-width-button"
          onClick={() => {
            contactModalState[1](true)
          }}
        >
          연락하기
        </Button>
      </LazyDiv>

      {/* 연락처 정보 모달 */}
      <Modal
        modalState={contactModalState}
        className="contact-modal"
        closeOnClickBackground={true}
      >
        <div className="header">
          <div className="title-group">
            <div className="title">축하 인사 전하기</div>
            <div className="subtitle">
              전화, 문자메세지로 축하 인사를 전해보세요.
            </div>
          </div>
        </div>

        <div className="content">
          {/* 신랑측 연락처 */}
          <div className="contact-info">
            {GROOM_INFO.filter(({ phone }) => !!phone).map(
              ({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div>{name}</div>
                  <div className="contact-actions">
                    {/* 전화 걸기 */}
                    <button
                      type="button"
                      className="contact-action"
                      aria-label={`${name}에게 전화 걸기`}
                      onClick={() => {
                        window.open(`tel:${phone}`, "_self")
                      }}
                    >
                      <PhoneIcon className="flip icon" />
                    </button>
                    {/* 문자 보내기 */}
                    <button
                      type="button"
                      className="contact-action"
                      aria-label={`${name}에게 문자 보내기`}
                      onClick={() => {
                        window.open(`sms:${phone}`, "_self")
                      }}
                    >
                      <EnvelopeIcon className="icon" />
                    </button>
                  </div>
                </Fragment>
              ),
            )}
          </div>
          {/* 신부측 연락처 */}
          <div className="contact-info">
            {BRIDE_INFO.filter(({ phone }) => !!phone).map(
              ({ relation, name, phone }) => (
                <Fragment key={relation}>
                  <div className="relation">{relation}</div>
                  <div>{name}</div>
                  <div className="contact-actions">
                    <button
                      type="button"
                      className="contact-action"
                      aria-label={`${name}에게 전화 걸기`}
                      onClick={() => {
                        window.open(`tel:${phone}`, "_self")
                      }}
                    >
                      <PhoneIcon className="flip icon" />
                    </button>
                    <button
                      type="button"
                      className="contact-action"
                      aria-label={`${name}에게 문자 보내기`}
                      onClick={() => {
                        window.open(`sms:${phone}`, "_self")
                      }}
                    >
                      <EnvelopeIcon className="icon" />
                    </button>
                  </div>
                </Fragment>
              ),
            )}
          </div>
        </div>
        <div className="footer">
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={() => contactModalState[1](false)}
          >
            닫기
          </Button>
        </div>
      </Modal>
    </>
  )
}
