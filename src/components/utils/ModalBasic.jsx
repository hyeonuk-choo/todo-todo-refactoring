import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ModalBasic = ({
  // 모달 재사용성을 높이기 위해, 부모에서 props를 구조분해로 받음
  modalWidth,
  modalHeight,
  modalTop,
  modalLeft,
  setModalWindow,
  setScoreExplain,
  setGraphExplain,
  handleCloseModal,
  modalTitle,
  modalImage,
  modalContent,
  onClickUpdateToggleBtn,
  onClickDelete,
  id,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (handleCloseModal) handleCloseModal();
        if (setModalWindow) setModalWindow(false);
        if (setScoreExplain) setScoreExplain(false);
        if (setGraphExplain) setGraphExplain(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  }, []);

  return (
    <>
      <StModalBackground>
        <StModalContainer
          // 부모에서 props를 내려줄 때, styled컴포넌트에서 바로 받는 것이 아님.
          // Styled컴포넌트가 하단에 정의되고 선언된 곳에서 바로 전달되는 것으로 알았으나
          // Styled컴포넌트 태그요소에서 먼저 내려받은 후, 선언된 자리에 다시 전달해야 한다.
          ref={modalRef}
          modalHeight={modalHeight}
          modalWidth={modalWidth}
          modalTop={modalTop}
          modalLeft={modalLeft}
        >
          {/* -- 모달제목 텍스트가 있는 경우만 표시 -- */}
          {modalTitle ? <div id="upper">{modalTitle}</div> : null}

          {/* -- 모달내용 텍스트가 있는 경우만 표시 -- */}
          {modalContent ? (
            <div id="lower">
              {/* -- 이미지가 있을 경우만 표시 -- */}
              {modalImage ? <img src={modalImage} alt="largeTrophy" /> : null}

              <div id="modalContent">{modalContent}</div>
            </div>
          ) : null}

          {id ? (
            <div id="menuBox">
              <div
                id="modifyMenu"
                onClick={() => {
                  onClickUpdateToggleBtn(id);
                  handleCloseModal(null);
                }}
              >
                수정
              </div>
              <div
                id="deleteMenu"
                onClick={() => {
                  onClickDelete(id);
                  handleCloseModal(null);
                }}
              >
                삭제
              </div>
            </div>
          ) : null}
        </StModalContainer>
      </StModalBackground>
    </>
  );
};

export default ModalBasic;

const StModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.1);

  position: absolute;
  top: 0;
  left: 0;
`;

const StModalContainer = styled.div`
  // 모달 재사용성을 높이기 위해, 부모에서 props를받음, 인자의 이름은 어떤이름도 괜찮다.
  // Styled컴포넌트 태그요소에서 전달된 props를 선언된 곳에서 받는 모습.
  width: ${(p) => p.modalWidth};
  height: ${(p) => p.modalHeight};
  background-color: white;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);

  position: absolute;
  top: ${(p) => p.modalTop};
  left: ${(p) => p.modalLeft};

  z-index: 2;

  #upper {
    width: 100%;
    height: 20%;
    background-color: #ffe9d5;
    border-radius: 2rem 2rem 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff7b00;
    font-weight: 600;
    font-size: 2.5vh;
  }

  #lower {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      box-sizing: border-box;
      width: 30%;
      height: 100%;
    }

    #modalContent {
      width: 77%;
      height: 100%;
      font-size: 2vh;
    }
  }

  #menuBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    font-size: 3vh;
    font-weight: 600;

    #modifyMenu {
      cursor: pointer;
      width: 100%;
      height: 50%;

      border-bottom: 1px solid gray;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    #deleteMenu {
      cursor: pointer;
      width: 100%;
      height: 50%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
