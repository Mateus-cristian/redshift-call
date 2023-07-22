import { Box, Heading, Text, styled, keyframes } from "@redshiftui/react";

export const ContainerEditPerfil = styled("div", {
  width: "80%",
  maxWidth: 1280,
  padding: "$0 $4",
  margin: "$20 auto $4",
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export const Container = styled("div", {
  display: "flex",
  gap: "$4",
});

export const ContainerCalendar = styled("main", {
  width: "50%",
  // margin: "$20 auto $4",
  padding: "$0 $4",
});

export const Form = styled(Box, {
  width: "50%",
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
  gap: "$4",

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "$1",
  },
});

export const Header = styled("div", {
  padding: "$0 $6",

  [`> ${Heading}`]: {
    lineHeight: "$base",
  },

  [`> ${Text}`]: {
    color: "$gray200",
    marginBottom: "$6",
  },
});

export const IntervalBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
});

export const IntervalContainer = styled("div", {
  border: "1px solid $gray600",
  borderRadius: "$md",
  marginBottom: "$4",
  width: "100%",
});

export const IntervalItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$3 $4",

  "& + &": {
    borderTop: "1px solid $gray600",
  },
});

export const IntervalDay = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$1",
});

export const IntervalInputs = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",

  "input::-webkit-calendar-picker-indicator": {
    filter: "invert(100%) brightness(30%)",
  },
});

export const FormError = styled(Text, {
  color: "$redshift500",
  textDecoration: "red underline",
  marginBottom: "$6",
  marginTop: "0",
});

export const LoadingContainer = styled("div", {
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: 452,
});

export const Loading = styled("div", {
  position: "absolute",
  display: "flex",
  transform: "translateY(0px)",
});

const animationLoading = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const LoadingCircle = styled("div", {
  width: 100,
  height: 100,
  borderRadius: "50%",
  border: "0.5px solid transparent",
  fontWeight: 700,
  fontSize: "1.25rem",
  boxShadow: "1px 2px 2px #df1f2f",
  animation: `${animationLoading} 1.2s infinite linear`,
});

export const HeaderPage = styled("div", {
  display: "flex",
  padding: "2rem 3rem 0",
  justifyContent: "flex-start",
});

export const ContainerIcons = styled("div", {
  display: "flex",
  gap: "2rem",

  [`> svg:hover`]: {
    scale: 1.25,
    transition: "ease-in-out .5s",
  },
});

export const FormAnnotation = styled(Text, {
  color: "$gray200",
});

export const EditPerfilTitle = styled("h1", {
  color: "$gray100",
  fontFamily: "$default",
});
