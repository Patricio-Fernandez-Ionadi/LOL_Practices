import { createContext, useContext } from 'react'

export const ChampionsContext = createContext()

export const useChampionsContext = () => useContext(ChampionsContext)
