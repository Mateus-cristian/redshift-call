import { styled, Heading, Text } from "@redshiftui/react";

export const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$20",

  marginLeft: "auto",
  maxWidth: "calc(100vw - (100vw - 1160px) / 2)",
  height: "100vh",

  "@media(max-width:800px)": {
    maxWidth: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },

  "@media(max-width:600px)": {
    gap: "$10",
  },
});

export const Hero = styled("div", {
  maxWidth: 480,
  padding: "$0 $10",

  [`> ${Heading}`]: {
    "@media(max-width:800px)": {
      fontSize: "$5xl",
    },
  },

  [`> ${Text}`]: {
    marginTop: "$2",
    color: "$gray200",

    "@media(max-width:800px)": {
      fontSize: "$1xl",
    },
  },
});

export const Preview = styled("div", {
  paddingRight: "$8",
  overflow: "hidden",

  "@media(max-width:600px)": {
    img: {
      objectFit: "contain",
      padding: 0,
      marginLeft: "unset",
    },

    paddingRight: "$0",
    paddingLeft: "$16",
  },
});
