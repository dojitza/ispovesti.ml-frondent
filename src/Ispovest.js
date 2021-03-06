import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "./Ispovest.css";

export function Ispovest(props) {
  const {
    ispovest,
    likes,
    dislikes,
    handleDislikeClick,
    handleLikeClick,
    extraCssClass,
  } = props;

  return (
    <Row style={{ margin: 5 }} className={`ispovest ${extraCssClass}`}>
      <Col>
        <Col className="ispovestText">{ispovest.text}</Col>
        <Row className="reactionContainer">
          <Col
            className="reactionCol"
            xl="auto"
            lg="auto"
            md="auto"
            sm="auto"
            xs="auto"
            style={{ paddingRight: 5 }}
          >
            <button
              className="button"
              variant="dark"
              onClick={() => {
                handleLikeClick(ispovest.id);
              }}
              disabled={ispovest.timesLiked > 0}
              style={
                ispovest.timesLiked > 0
                  ? { backgroundColor: "rgba(50, 50, 50, 0.5)" }
                  : {}
              }
            >
              {likes[Math.floor(Math.random() * likes.length)]}
            </button>
            <span className="reactionCount">{ispovest.likes}</span>
          </Col>
          <Col
            className="reactionCol "
            xl="auto"
            lg="auto"
            md="auto"
            sm="auto"
            xs="auto"
          >
            <button
              className="button"
              variant="dark"
              onClick={() => {
                handleDislikeClick(ispovest.id);
              }}
              disabled={ispovest.timesDisliked > 0}
              style={
                ispovest.timesDisliked > 0
                  ? { backgroundColor: "rgba(50, 50, 50, 0.5)" }
                  : {}
              }
            >
              {dislikes[Math.floor(Math.random() * dislikes.length)]}
            </button>
            <span className="reactionCount">{ispovest.dislikes}</span>
          </Col>
          <Col className="reactionCol">
            <div className="authorNameContainer">
              <span className="authorName">{ispovest.authorName}</span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
