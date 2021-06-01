import React, { createContext, useReducer } from "react";
type ChoiceType = {
  id: string;
  text: string;
};

type ActionsTypes =
  | {
      type: "setUsername";
      payload: string;
    }
  | {
      type: "setConfigurationOption";
      payload: "multipleAnswers" | "anonymousVoting";
    }
  | { type: "addChoice"; payload: ChoiceType }
  | { type: "removeChoice"; payload: string };

type InitialStateType = {
  pollName: string;
  multipleAnswers: boolean;
  anonymousVoting: boolean;
  username: string | null;
  pollQuestion: string;
  pollChoices: Array<ChoiceType>;
};

let initialState = {
  pollName: "",
  multipleAnswers: false,
  anonymousVoting: false,
  username: null,
  pollQuestion: "",
  pollChoices: [],
};

const PollReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload };
    case "addChoice":
      return {
        ...state,
        pollChoices: state.pollChoices.concat(action.payload),
      };
    case "setConfigurationOption":
      const newState = { ...state };
      newState[action.payload] = !newState[action.payload];
      return newState;
    case "removeChoice":
      return {
        ...state,
        pollChoices: state.pollChoices.filter((e) => e.id !== action.payload),
      };

    default:
      throw new Error("Invalid action type");
  }
};

const globalContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(PollReducer, initialState);
  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};
