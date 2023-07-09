import { globalCss } from "@redshiftui/react";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },

  "p,span,h2": {
    margin: "0 !important",
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },
});
