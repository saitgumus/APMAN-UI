import React from "react";

export const ActionContext = React.createContext({
  actionKey: "",
  onExecute: () => {
    alert("clicked");
  },
});
