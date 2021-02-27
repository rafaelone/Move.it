import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import Cookies from "js-cookie"
import challenges from "../../challenges.json"
import LevelUpModal from "../components/LevelUpModal";

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children,
  ...rest
}: ChallengesProviderProps){
  const [ level, setLevel ] = useState(rest.level ?? 1);
  const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
  const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ??0);
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false)

  const [ activeChallenge, setActiveChallenge ] = useState(null)

  useEffect(() => {
      Cookies.set('level', String(level));
      Cookies.set('currentExperience', String(currentExperience));
      Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  useEffect(() => {
    Notification.requestPermission()
  }, [])
  
  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level + 1) * 4 , 2)
  }, [level])

  const levelUp = useCallback(() => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }, [level])

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false)
  },[])

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if(Notification.permission === "granted"){
      new Notification('Novo desafio 👀', {
        body: `Valendo ${challenge.amount} XP`
      })
    }
  },[])

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null)
  }, [])

  const completeChallenge = useCallback(() => {
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount;


    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)

  },[activeChallenge, challengesCompleted, currentExperience])


  return (
    <ChallengesContext.Provider 
      value={{
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal
      }}> 
        {children}
        { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}

