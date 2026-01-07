import React, { memo } from "react";
import Row from "./Row";

export default function ExploreRows({ packages }) {
  return (
    <>
      <Row list={packages} reverse={false} />
      <Row list={[...packages].reverse()} reverse />
    </>
  );
}
