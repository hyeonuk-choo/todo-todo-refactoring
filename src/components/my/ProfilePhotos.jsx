import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getImages, __deleteImages } from "../../redux/modules/mySlice";
import cancelSvg from "../../assets/img/cancelSvg.svg";
import wastebasketSvg from "../../assets/img/myPage/wastebasket.svg";
import Modal from "../utils/Modal";

const ProfilePhotos = () => {
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectImgId, setSelectImgId] = useState(1);
  const [selectImg, setSelectImg] = useState("");

  const { images } = useSelector((state) => state.my);

  // 1
  const onClickFullScreenImgsHandler = (e) => {
    const { id } = e.target;

    selectImgFunc(id);
  };

  // 2
  const selectImgFunc = (id) => {
    const data = images.filter((data) => data.id === Number(id));
    setSelectImgId(id);
    setSelectImg(data[0].imageUrl);
    setFullScreen(true);
  };

  const onClickPrevHandler = (id) => {
    let temp = images.find((data) => data.id === Number(id));
    const prevData = images[images.indexOf(temp) - 1];
    setSelectImgId(prevData.id);
    setSelectImg(prevData.imageUrl);
  };

  const onClickNextHandler = (id) => {
    let temp = images.find((data) => data.id === Number(id));
    const nextData = images[images.indexOf(temp) + 1];
    setSelectImgId(nextData.id);
    setSelectImg(nextData.imageUrl);
  };

  const onClickFullScreenCloseHandler = () => {
    setFullScreen(false);
  };

  const onClicOptionModalOpenHandler = () => {
    setModalVisible(true);
  };

  const onClickDeleteImgHandler = () => {
    dispatch(__deleteImages(selectImgId));
    setFullScreen(false);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const nickname = localStorage.getItem("nickname");

  useEffect(() => {
    dispatch(__getImages(nickname));
  }, [dispatch]);

  return (
    <StPhotoContainer>
      <StContainer>
        {images.errorMessage === undefined &&
          images.map((data) => (
            <StImg key={data.id} onClick={onClickFullScreenImgsHandler}>
              <img id={data.id} src={data.imageUrl} alt="boast" />
            </StImg>
          ))}
      </StContainer>

      {fullScreen ? (
        <StFullScreen>
          <div className="header">
            <div className="cancelBox" onClick={onClickFullScreenCloseHandler}>
              <img src={cancelSvg} alt="cancelBtn" />
            </div>
            <div className="imgCount">
              {images && (
                <span>
                  {images.indexOf(
                    images.find((data) => data.id == selectImgId)
                  ) + 1}
                  /{images.length}
                </span>
              )}
            </div>
            <div className="optionBox">
              <img
                src={wastebasketSvg}
                alt="optionBtn"
                onClick={onClicOptionModalOpenHandler}
              />
            </div>
          </div>
          <div className="StSliderBoxParent">
            <StSliderBox>
              <div className="imgBox" key={selectImgId}>
                {images.indexOf(
                  images.find((data) => data.id === Number(selectImgId))
                ) === 0 ? null : (
                  <button
                    className="prev"
                    onClick={() => onClickPrevHandler(selectImgId)}
                  >
                    <div className="prevArrow"></div>
                  </button>
                )}

                <img src={selectImg} alt="img" id={selectImgId} />

                {images.indexOf(
                  images.find((data) => data.id === Number(selectImgId))
                ) ===
                  images.length - 1 ? null : (
                  <button
                    className="next"
                    onClick={() => onClickNextHandler(selectImgId)}
                  >
                    <div className="nextArrow"></div>
                  </button>
                )}
              </div>
            </StSliderBox>
          </div>
        </StFullScreen>
      ) : null}

      <StModalBox>
        {/* -------- 안내창 모달 ---------*/}
        {modalVisible ? (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            radius="48px"
            top="40%"
            width="90%"
            height="230px"
            backgroundcolor="#46464624"
          >
            <StModalTop>
              <div className="title">사진을 삭제하시겠습니까?</div>
              <div>삭제하면 다시 불러올 수 없습니다.</div>
            </StModalTop>
            <StModalBottom>
              <div className="cancel" onClick={closeModal}>
                취소
              </div>
              <div className="confirm" onClick={onClickDeleteImgHandler}>
                확인
              </div>
            </StModalBottom>
          </Modal>
        ) : null}
      </StModalBox>
    </StPhotoContainer>
  );
};

const StPhotoContainer = styled.div`
  margin: 6px 6px 0 6px;
  height: auto;
  position: relative;
`;

const StModalTop = styled.div`
  height: 75%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 1em;
  }
`;
const StModalBottom = styled.div`
  border-top: 1px solid lightgray;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 25%;

  div {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .confirm {
    border-left: 1px solid lightgray;
  }
`;

const StContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 120px;
  grid-gap: 3px;
`;

const StImg = styled.div`
  & img {
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 16px;
    object-fit: cover;
    background-position: center center;
  }
`;

const StSliderBox = styled.div`
  width: 100%;
  height: auto;
  z-index: 15;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & div.imgBox {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      /* margin: auto; */
      /* height: 350px; */
      /* background-size: contain; */
      /* border-radius: 30px; */
      object-fit: cover;
    }

    button {
      position: absolute;
      border: none;
      background-color: transparent;
      border-radius: 50%;
      color: #111;
      top: 50%;
      box-sizing: border-box;
    }

    button.prev {
      left: 0;
    }

    button.next {
      right: 0;
    }

    .prevArrow {
      position: relative;
    }
    .prevArrow::after {
      position: absolute;
      left: 1em;
      top: 0;
      content: "";
      width: 1.5em;
      height: 1.5em;
      border-top: 5px solid #ffffff;
      border-right: 5px solid #ffffff;
      transform: rotate(225deg);
    }

    .nextArrow {
      position: relative;
    }
    .nextArrow::after {
      position: absolute;
      right: 1em;
      top: 0;
      content: "";
      width: 1.5em;
      height: 1.5em;
      border-top: 5px solid #ffffff;
      border-right: 5px solid #ffffff;
      transform: rotate(45deg);
    }
  }
`;

const StFullScreen = styled.div`
  position: fixed;
  z-index: 6;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 360px;
  height: 100vh;
  background-color: #111111;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: 600px;
  }

  @media screen and (min-height: 850px) {
    height: 1180px;
  }

  @media screen and (min-height: 915px) {
    height: 1024px;
  }

  @media screen and (min-height: 1024px) {
    height: 1180px;
  }
  @media screen and (min-height: 1180px) {
    height: 1366px;
  }

  .StSliderBoxParent {
    background-color: #111111;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .header {
    height: 72px;
    display: flex;
    align-items: center;
    padding: 15px;
    justify-content: space-between;
    background-color: white;
  }
  .cancelBox {
    width: 15px;
    height: auto;

    img {
      width: 100%;
    }
  }

  .imgCount {
    color: #111111;
    font-weight: bold;
  }

  .optionBox {
    img {
      /* transform: rotate(90deg); */
    }
  }
`;

const StModalBox = styled.div`
  & .btnBox {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    flex-direction: column;
  }
`;
const StModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  outline: none;
  border: none;
  border-bottom: 1px solid #eee;
  background-color: white;
  color: #ff8f27;

  margin-top: 5%;

  &:last-child {
    border-bottom: none;
  }
`;

export default ProfilePhotos;
