import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useState,
} from "react";
import _ from "lodash";
import { auth } from "./firebase";

export type OptionType = {
  id: string;
  text: string;
  selected: boolean;
  votes: Array<InitialStateType["userID"]>;
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
  | { type: "addOption"; payload: OptionType }
  | { type: "removeOption"; payload: string }
  | { type: "setPollName"; payload: string }
  | { type: "shuffleOptions"; payload: InitialStateType["pollOptions"] }
  | { type: "removeAllOptions" }
  | { type: "setPollOptions"; payload: InitialStateType["pollOptions"] }
  | { type: "setInvitationalLink"; payload: string }
  | {
      type: "signIn";
      payload: { userID: InitialStateType["userID"]; username: string };
    }
  | { type: "signOut" };

export type InitialStateType = {
  isLimitReached: boolean;
  pollName: string;
  multipleAnswers: boolean;
  anonymousVoting: boolean;
  invitationalLink: string;
  username: string;
  pollOptions: {
    [id: string]: {
      text: OptionType["text"];
      selected: OptionType["selected"];
      votes: OptionType["votes"];
    };
  };
  isSignedIn: boolean;
  userID: string;
};

let initialState = {
  isLimitReached: false,
  invitationalLink: "",
  pollName: "",
  multipleAnswers: false,
  anonymousVoting: false,
  pollOptions: {},
  isSignedIn: false,
  username: "",
  userID: "",
};

export const OPTIONS_LIMIT = 10;

export const getDeepCopy = (obj: Object) => JSON.parse(JSON.stringify(obj));
// TODO move 'isLimitReached' to a 'single source of truth'
const PollReducer = (state: InitialStateType, action: ActionsTypes) => {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload };
    case "setPollName":
      return { ...state, pollName: action.payload };
    case "setInvitationalLink":
      return { ...state, invitationalLink: action.payload };
    case "signIn":
      let { username, userID } = action.payload;
      return {
        ...state,
        isSignedIn: true,
        username,
        userID,
      };
    case "signOut":
      return { ...state, isSignedIn: false, userID: "" };
    case "addOption":
      let { id, text, votes, selected } = action.payload;
      let extendedOptions = getDeepCopy(state.pollOptions);
      extendedOptions[id] = { text, votes, selected };
      return {
        ...state,
        pollOptions: extendedOptions,
        isLimitReached:
          Object.keys(state.pollOptions).length + 2 > OPTIONS_LIMIT,
      };
    case "setPollOptions":
      return {
        ...state,
        pollOptions: action.payload,
        isLimitReached: Object.keys(action.payload).length === OPTIONS_LIMIT,
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
      let optionsToFilter = getDeepCopy(state.pollOptions);
      delete optionsToFilter[action.payload];
      return {
        ...state,
        pollOptions: optionsToFilter,
        isLimitReached: false,
      };
    case "removeAllOptions":
      return { ...state, pollOptions: {}, isLimitReached: false };

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
  const [isInitializing, setIsInitializing] = useState(true);

  let throttledState = useRef(
    _.throttle((state) => {
      localStorage.setItem(
        LocalStorage.applicationState,
        JSON.stringify(state)
      );
    }, 1000)
  );

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        let { uid, displayName } = user;
        if (!displayName) displayName = "";

        dispatch({
          type: "signIn",
          payload: {
            userID: uid,
            username:
              state.username && uid === state.userID
                ? state.username
                : displayName,
          },
        });
      }
      setIsInitializing(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    throttledState.current(state);
  }, [state]);

  if (isInitializing) {
    return null;
  }

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export const usePollContext = () => useContext(globalContext);
