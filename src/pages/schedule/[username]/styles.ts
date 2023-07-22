import { Heading, Text, styled } from "@redshiftui/react";

export const Container = styled("div", {
  maxWidth: 852,
  padding: "$0 $4",
  margin: "$20 auto $4",
});

export const HeaderPage = styled("div", {
  display: "flex",
  padding: "2rem 3rem 0",
  justifyContent: "flex-end",
});

export const ContainerIcons = styled("div", {
  display: "flex",
  gap: "2rem",

  [`> svg:hover`]: {
    scale: 1.25,
    transition: "ease-in-out .5s",
  },
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
