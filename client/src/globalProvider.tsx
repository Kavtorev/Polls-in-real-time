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
  votes: number;
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
  | { type: "shuffleOptions"; payload: Array<OptionType> }
  | { type: "removeAllOptions" }
  | { type: "setPollOptions"; payload: Array<OptionType> }
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
  pollOptions: Array<OptionType>;
  isSignedIn: boolean;
  userID: string;
};

let initialState = {
  isLimitReached: false,
  invitationalLink: "",
  pollName: "",
  multipleAnswers: false,
  anonymousVoting: false,
  pollOptions: [],
  isSignedIn: false,
  username: "",
  userID: "",
};

export const OPTIONS_LIMIT = 10;
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
