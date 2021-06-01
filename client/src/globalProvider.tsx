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
  | { type: "addChoice"; payload: ChoiceType }
  | { type: "removeChoice"; payload: string }
  | { type: "setPollName"; payload: string }
  | { type: "setPollQuestion"; payload: string };

type InitialStateType = {
  pollName: string;
  multipleAnswers: boolean;
  anonymousVoting: boolean;
  username: string;
  pollQuestion: string;
  pollChoices: Array<ChoiceType>;
};

let initialState = {
  pollName: "",
  multipleAnswers: false,
  anonymousVoting: false,
  username: "",
  pollQuestion: "",
  pollChoices: [],
};

const PollReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "setPollQuestion":
      return { ...state, pollquestion: action.payload };
    case "setUsername":
      return { ...state, username: action.payload };
    case "setPollName":
      return { ...state, pollName: action.payload };
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
