import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { __getMainRank } from "../../redux/modules/mainSlice";

const InfiniteScroll = () => {
  const { mainRankList } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // 로드 true, false
  const [page, setPage] = useState(1); // 페이지
  // const [items, setItems] = useState([]);
  let options = {
    root: null,
    threshold: 0.5,
  };

  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        dispatch(__getMainRank(page));

        observer.unobserve(entry.target);
        setPage((prev) => prev + 1);
      }
    },
    [mainRankList]
  );
  console.log("mainRankList", mainRankList);

  // const checkIntersect = useCallback(
  //   ([entry], observer) => {
  //     if (entry.isIntersecting && !isLoaded) {
  //       axios.get(`http://localhost:3001/test${page}`).then((res) => {
  //         console.log("res.data", res.data);
  //         setItems((prev) => [...prev, ...res.data]);
  //       });

  //       observer.unobserve(entry.target);
  //       setPage((prev) => prev + 1);
  //     }
  //   },
  //   [items]
  // );

  // console.log("items", items);

  useEffect(() => {
    let observer;
    if (targetRef) {
      observer = new IntersectionObserver(checkIntersect, {
        threshold: 0.5,
      });
      observer.observe(targetRef.current);
    }
  }, [mainRankList]);

  console.log("page", page);

  //   const observer = new IntersectionObserver(checkIntersect, {
  //     ...options,
  //   });

  useEffect(() => {
    console.log(targetRef.current);
  }, []);

  return (
    <div>
      {mainRankList.map((each) => (
        <StDiv key={each.id}>{each.title}</StDiv>
      ))}
      <div ref={targetRef}>1</div>
    </div>
  );
};

export default InfiniteScroll;

const StDiv = styled.div`
  border: 1px solid black;
  height: 500px;
`;