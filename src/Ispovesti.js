import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";
import { Arena } from "./Arena";
import { Ispovest } from "./Ispovest";
import seedrandom from "seedrandom";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import { Pagination } from "./Pagination.js";

export function Ispovesti(props) {
  const [ispovesti, setIspovesti] = useState([]);
  const [page, setPage] = useState(0);
  const [waitingForAsync, setWaitingForAysnc] = useState(false);
  seedrandom(localStorage.getItem("randomSeed"), { global: true });

  const likes = constants.LIKE_VARIATIONS;
  const dislikes = constants.DISLIKE_VARIATIONS;

  useEffect(() => {
    const fetchData = async () => {
      setWaitingForAysnc(true);
      try {
        const response = await fetch(
          `${constants.API_ROOT}/ispovesti?page=${page}`
        );
        const ispovesti = await response.json();
        setIspovesti(ispovesti);
      } catch (e) {
        console.log(e);
      }
      setWaitingForAysnc(false);
    };
    fetchData();
  }, [page]);

  const handleReactionClick = (ispovestId, reaction) => {
    setWaitingForAysnc(true);
    fetch(`${constants.API_ROOT}/ispovesti/${ispovestId}/putReaction`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reaction),
    });
    const newIspovesti = ispovesti;
    const ito = newIspovesti.find((ispovest) => ispovest.id === ispovestId);
    if (reaction === "like") {
      ito.timesLiked += 1;
      ito.likes += 1;
      if (ito.reactedInRuntime) {
        ito.timesDisliked -= 1;
        ito.dislikes -= 1;
      }
    } else if (reaction === "dislike") {
      ito.timesDisliked += 1;
      ito.dislikes += 1;
      if (ito.reactedInRuntime) {
        ito.timesLiked -= 1;
        ito.likes -= 1;
      }
    }
    ito.reactedInRuntime = true;
    console.log(ito);
    setIspovesti(JSON.parse(JSON.stringify(newIspovesti)));
    setWaitingForAysnc(false);
  };

  const handleLikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "like");
  };

  const handleDislikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "dislike");
  };

  return (
    <div>
      <Pagination
        page={page}
        setPage={setPage}
        waitingForAsync={waitingForAsync}
        disableRight={ispovesti.length < 10}
      />
      {ispovesti?.map((ispovest) => (
        <Ispovest
          key={ispovest.id}
          ispovest={ispovest}
          likes={likes}
          dislikes={dislikes}
          handleLikeClick={handleLikeClick}
          handleDislikeClick={handleDislikeClick}
        />
      ))}
      <Pagination
        page={page}
        setPage={setPage}
        waitingForAsync={waitingForAsync}
        disableRight={ispovesti.length < 10}
      />
    </div>
  );
}
