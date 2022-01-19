import { createContext, useContext } from 'react'

export const SummonerContext = createContext()

export const useSummonerContext = () => useContext(SummonerContext)
