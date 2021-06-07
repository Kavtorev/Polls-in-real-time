import React, { createContext, useContext, useReducer } from "react";
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
  | { type: "addOption"; payload: ChoiceType }
  | { type: "removeOption"; payload: string }
  | { type: "setPollName"; payload: string }
  | { type: "setPollQuestion"; payload: string }
  | { type: "shuffleOptions"; payload: Array<ChoiceType> }
  | { type: "removeAllOptions" };

export type InitialStateType = {
  pollName: string;
  multipleAnswers: boolean;
  isLimitReached: boolean;
  anonymousVoting: boolean;
  username: string;
  pollQuestion: string;
  pollOptions: Array<ChoiceType>;
};

let initialState = {
  isLimitReached: false,
  isPageTransitionHappening: false,
  pollName: "",
  multipleAnswers: false,
  anonymousVoting: false,
  username: "",
  pollQuestion: "",
  pollOptions: [],
};

export const OPTIONS_LIMIT = 5;

const PollReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "setPollQuestion":
      return { ...state, pollquestion: action.payload };
    case "setUsername":
      return { ...state, username: action.payload };
    case "setPollName":
      return { ...state, pollName: action.payload };
    case "addOption":
      return {
        ...state,
        pollOptions: state.pollOptions.concat(action.payload),
        isLimitReached: state.pollOptions.length + 2 > OPTIONS_LIMIT,
      };
    case "shuffleOptions":
      return {
        ...state,
        pollOptions: action.payload,
      };
    case "setConfigurationOption":
      const newState = { ...state };
      newState[action.payload] = !newState[action.payload];
      return newState;
    case "removeOption":
      return {
        ...state,
        pollOptions: state.pollOptions.filter((e) => e.id !== action.payload),
        isLimitReached: false,
      };
    case "removeAllOptions":
      return { ...state, pollOptions: [] };

    default:
      throw new Error("Invalid action type");
  }
};

const globalContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<ActionsTypes>;
}>({ state: initialState, dispatch: () => null });

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(PollReducer, initialState);
  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export const usePollContext = () => useContext(globalContext);
