import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import _ from "lodash";

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
  | { type: "shuffleOptions"; payload: Array<ChoiceType> }
  | { type: "removeAllOptions" }
  | { type: "setPollOptions"; payload: Array<ChoiceType> }
  | { type: "setInvitationalLink"; payload: string };

export type InitialStateType = {
  pollName: string;
  multipleAnswers: boolean;
  isLimitReached: boolean;
  anonymousVoting: boolean;
  invitationalLink: string;
  username: string;
  pollOptions: Array<ChoiceType>;
};

let initialState = {
  isLimitReached: false,
  isPageTransitionHappening: false,
  invitationalLink: "http://localhost:3000/2@^#2g3qc2@^#2g3qc2@^#2g3qc",
  pollName: "",
  multipleAnswers: false,
  anonymousVoting: false,
  username: "",
  pollOptions: [],
};

export const OPTIONS_LIMIT = 5;

const PollReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload };
    case "setPollName":
      return { ...state, pollName: action.payload };
    case "setInvitationalLink":
      return { ...state, invitationalLink: action.payload };
    case "addOption":
      return {
        ...state,
        pollOptions: state.pollOptions.concat(action.payload),
        isLimitReached: state.pollOptions.length + 2 > OPTIONS_LIMIT,
      };
    case "setPollOptions":
      return {
        ...state,
        pollOptions: action.payload,
        isLimitReached: action.payload.length === OPTIONS_LIMIT,
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
      return { ...state, pollOptions: [], isLimitReached: false };

    default:
      throw new Error("Invalid action type");
  }
};

const globalContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<ActionsTypes>;
}>({ state: initialState, dispatch: () => null });

enum LocalStorage {
  applicationState = "state",
}

const getStoredState = (): InitialStateType | null => {
  let localStorageState = localStorage.getItem(LocalStorage.applicationState);

  if (localStorageState) {
    return JSON.parse(localStorageState);
  }
  return null;
};

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    PollReducer,
    getStoredState() || initialState
  );

  let throttledState = useRef(
    _.throttle((state) => {
      localStorage.setItem(
        LocalStorage.applicationState,
        JSON.stringify(state)
      );
    }, 1000)
  );

  useEffect(() => {
    throttledState.current(state);
  }, [state]);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export const usePollContext = () => useContext(globalContext);
