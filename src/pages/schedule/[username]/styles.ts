import { Heading, Text, styled } from "@redshiftui/react";

export const Container = styled("div", {
  maxWidth: 852,
  padding: "$0 $4",
  margin: "$20 auto $4",
});

export const UserHeader = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  [`> ${Heading}`]: {
    lineHeight: "$short",
    marginTop: "$2",
  },

  [`> ${Text}`]: {
    color: "$gray200",
  },

  img: {
    width: "$20",
    height: "$20",
  },
});
