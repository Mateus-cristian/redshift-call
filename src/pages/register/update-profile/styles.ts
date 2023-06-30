import { Box, Text, styled } from "@redshiftui/react";

export const ProfileBox = styled(Box, {
  marginTop: "$6",
  display: "flex",
  flexDirection: "column",
  gap: "$4",

  label: {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
  },

  img: {
    maxWidth: "6rem",
    maxHeight: "6rem",
  },
});

export const FormAnnotation = styled(Text, {
  color: "$gray200",
});
