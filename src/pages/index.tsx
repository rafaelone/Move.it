import Head from "next/head"
import { GetServerSideProps } from "next"

import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ChallengeBox from "../components/ChallengeBox";
import { ExperienceBar } from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from "../styles/pages/Home.module.css"
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import { motion } from "framer-motion"

export default function Home(props: HomeProps) {
  
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      > 
      <motion.div 
        className={styles.container}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0, duration: 0.1}}
        layoutId="home"
        >
        <Head>
          <title>Inicio | Move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section >
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
        </motion.div>
      </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}