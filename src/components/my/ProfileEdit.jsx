import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import defaultProfile from "../../assets/img/defaultProfile.jpg";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import pencilSvg from "../../assets/img/pencilSvg.svg";
import Modal from "../utils/Modal";

import { useDispatch, useSelector } from "react-redux";
import {
  __getImages,
  __getMyInfo,
  __postProfileImg,
  __postProfileMoto,
} from "../../redux/modules/mySlice";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProfileEdit = () => {
  const { profileImage } = useSelector((state) => state.my);
  const { userInfo } = useSelector((state) => state.my);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saveStatus, setSaveStatus] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [profileImageState, setProfileImageState] = useState();
  const [mottoInput, setMottoInput] = useState("");
  const profileUploadRef = useRef(null);

  let formData = new FormData();
  let newCamp = { myMotto: mottoInput };

  for (let key of formData.keys()) {
  }

  useEffect(() => {
    if (userInfo !== null) {
      setMottoInput(userInfo.myMotto);
    }
    if (userInfo?.myMotto == null) {
      setMottoInput("");
    }
  }, [userInfo]);

  // 완료버튼 클릭
  const onClickProfileEditComplete = () => {
    let nickname = localStorage.getItem("nickname");
    formData.append("multipartFile", profileImageState);
    formData.append(
      "dto",
      new Blob([JSON.stringify(newCamp)], { type: "application/json" })
    );

    dispatch(__postProfileImg(formData));
    dispatch(__getMyInfo(nickname));
    navigate("/my");
  };

  const onClickUploadPhotoHandler = () => {
    profileUploadRef.current.click();
  };

  const modalToggleHandler = (parameter) => {
    setModalView(!modalView);
  };

  useEffect(() => {
    let nickname = localStorage.getItem("nickname");
    dispatch(__getMyInfo(nickname));
  }, [dispatch]);

  // 좌우명 입력시
  const mottoInputHandler = (e) => {
    setMottoInput(e.target.value.slice(0, 40));
  };

  // 이미지 에러 발생시
  const handleImgError = (e) => {
    e.target.src = profileImgSvg;
  };

  const readImage = (input) => {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
      // FileReader 인스턴스 생성
      const reader = new FileReader();
      // 이미지가 로드가 된 경우
      reader.onload = (e) => {
        const previewImage = document?.getElementById("preview-image");
        previewImage.src = e.target.result;
      };
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(input.files[0]);
    }
  };
  // input file에 change 이벤트 부여
  const inputImage = document?.getElementById("input-image");
  inputImage?.addEventListener("change", (e) => {
    readImage(e.target);
    // setProfileImageState(e.target.files[0]);
  });

  // Browser Image Compression
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      // await uploadToServer(compressedFile);
      setProfileImageState(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", height: "100%" }}>
      <StTitle>
        <div className='arrowDiv'>
          <div
            className='arrow'
            onClick={() => {
              if (saveStatus === false) {
                setModalView(true);
              } else {
                navigate("/my");
              }
            }}
          />
        </div>

        <div className='title'>프로필 편집</div>
        <button onClick={onClickProfileEditComplete}>완료</button>
      </StTitle>

      <StLine></StLine>

      <StImgDiv>
        <div className='image-container'>
          <img
            style={{ width: "90px", height: "90px", borderRadius: "100px" }}
            id='preview-image'
            src={
              userInfo?.profileImage === undefined
                ? profileImgSvg
                : userInfo?.profileImage
            }
            onError={handleImgError}
            alt='previewImg'
          />
          <input
            style={{ display: "none" }}
            type='file'
            id='input-image'
            ref={profileUploadRef}
            onChange={handleImageUpload}
          />
          {/* ----- 연필 ----- */}
          <div className='pencilBox' onClick={onClickUploadPhotoHandler}>
            <img className='pencil' src={pencilSvg} />
          </div>
        </div>
      </StImgDiv>

      <StMotto>
        <div className='mottoTitle'>좌우명</div>
        <textarea
          className='textArea'
          value={mottoInput}
          onChange={mottoInputHandler}
        ></textarea>

        <div className='mottoInputCount'>
          {mottoInput == null ? 0 : mottoInput?.length}/40
        </div>
      </StMotto>

      {/* -------- 안내창 모달 ---------*/}
      {modalView ? (
        <Modal
          visible={modalView}
          closable={true}
          maskClosable={true}
          onClose={modalToggleHandler}
          radius='48px'
          top='40%'
          width='90%'
          height='230px'
          backgroundcolor='#46464624'
        >
          <StModalTop>
            <div className='title'>저장되지 않은 변경 사항</div>
            <div>뒤로가기 하시겠습니까?</div>
            <div>변경사항이 저장되지 않았습니다.</div>
          </StModalTop>
          <StModalBottom>
            <div
              className='cancel'
              onClick={() => {
                setModalView(false);
              }}
            >
              취소
            </div>
            <div
              className='confirm'
              onClick={() => {
                navigate("/my");
              }}
            >
              확인
            </div>
          </StModalBottom>
        </Modal>
      ) : null}
    </div>
  );
};

export default ProfileEdit;

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

const StMotto = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

  .mottoTitle {
    font-weight: bold;
  }

  .textArea {
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    width: 100%;
    height: 200px;
    outline: none;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
  }

  .mottoInputCount {
    color: #ff7b00;
  }
`;
const StImgDiv = styled.div`
  width: 80%;
  margin: 10% auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .image-container {
    position: relative;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      width: 50%;
      margin: auto;
    }
  }
  .pencilBox {
    position: absolute;
    right: -0.3em;
    bottom: -0.3em;

    width: 32px;
    height: 32px;
    border-radius: 100%;
    background-color: #ff8f27;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .pencil {
  }

  & input {
    display: none;
  }
`;
const StImg = styled.img`
  width: 40%;
  height: 40%;
  border-radius: 100px;
`;

const StTitle = styled.div`
  color: black;
  width: 100%;
  margin: auto;
  height: 100px;
  font-weight: bold;
  font-size: 1.2em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  .title {
  }

  button {
    width: 60px;
    height: 44px;
    font-size: 16px;
    background-color: white;
    color: #ff7b00;
    border: none;
    padding-right: 22px;
  }

  .arrowDiv {
    width: 60px;
    height: 44px;
    position: relative;

    .arrow {
      width: 60px;
      height: 44px;
    }
    .arrow::after {
      position: absolute;
      left: 26px;
      top: 0.7em;
      content: "";
      width: 0.7em;
      height: 0.7em;
      border-top: 3px solid #ff7b00;
      border-right: 3px solid #ff7b00;
      transform: rotate(225deg);
    }
  }
`;

const StLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #f1f3f5;
`;
