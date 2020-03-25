import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react"
import { navigate } from "@reach/router"

import locales from "../locales"
import useLocalStorage from "../hooks/useLocalStorage"
import { findKey } from "../utils/gatsby-node-helpers"

const LocaleContext = createContext()

function reducer(state, { type, locale }) {
  switch (type) {
    case "UPDATE_LOCALE":
      return { ...state, activeLocale: locale }
    default:
      throw new Error("Invalid action")
  }
}

const key = findKey(locales, o => o.default === true)
const defaultLocale = locales[key];

function LocaleProvider({ children, locale = defaultLocale.path, location }) {
  const [savedLocale, saveLocale] = useLocalStorage(
    "lighthouse-store",
    JSON.stringify({
      activeLocale: locale,
    }),
  )
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedLocale))

  const updateLocale = useCallback(
    locale => {
      dispatch({ type: "UPDATE_LOCALE", locale })
      if (["/cart", "/checkout", "/success"].includes(location.pathname))
        return

      navigate(
        `/${locale.toLowerCase()}${location.pathname.substring(3)}${
          location.search
        }`,
      )
    },
    [location.pathname, location.search],
  )

  useEffect(() => saveLocale(JSON.stringify(state)),
    [state, saveLocale])

  return (
    <LocaleContext.Provider
      value={{
        ...state,
        updateLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export { LocaleProvider, LocaleContext as default }
