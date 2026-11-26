"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

export type View = "human" | "machine"

const ViewContext = createContext<{ view: View; setView: (v: View) => void }>({
  view: "human",
  setView: () => {},
})

/** Human or machine view of the same page. The URL is the state (?view=machine), so either view can be linked. */
export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<View>("human")

  useEffect(() => {
    const read = () =>
      setViewState(
        new URLSearchParams(window.location.search).get("view") === "machine" ? "machine" : "human",
      )
    read()
    window.addEventListener("popstate", read)
    return () => window.removeEventListener("popstate", read)
  }, [])

  const setView = useCallback((v: View) => {
    const url = new URL(window.location.href)
    if (v === "machine") url.searchParams.set("view", "machine")
    else url.searchParams.delete("view")
    url.hash = ""
    window.history.pushState(null, "", url)
    setViewState(v)
    window.scrollTo({ top: 0 })
  }, [])

  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>
}

export const useView = () => useContext(ViewContext)
