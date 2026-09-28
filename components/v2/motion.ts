"use client"

import { useEffect, useState } from "react"
import { useMotionValueEvent, type MotionValue } from "framer-motion"

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
/** 0 -> 1 as v moves from a to b */
export const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a))
export const EASE = [0.22, 1, 0.36, 1] as const

/** A scroll progress value as React state, in 1% steps so a long scroll costs at most 100 renders. */
export function useStepped(p: MotionValue<number>) {
  const [v, setV] = useState(() => Math.round(p.get() * 100) / 100)
  useMotionValueEvent(p, "change", (x) => setV(Math.round(x * 100) / 100))
  return v
}

export function useMedia(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [query])
  return match
}

/** Joins class names, dropping falsy ones. */
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ")
