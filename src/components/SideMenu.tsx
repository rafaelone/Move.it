import { motion } from "framer-motion"
import { useRouter } from "next/router"
import Link from "next/link"

import styles from "../styles/components/SideMenu.module.css"
import { useCallback } from "react"
import SideMenuButton from "./SideMenuButton"

export default function SideMenu(){

  const router = useRouter()

  const handleRedirectToHome = useCallback(() => {
    router.push('/')
  }, [])

  return (
    <div className={styles.sideBar}>
        <div>
            <button type="button" onClick={handleRedirectToHome}>
              <img src="/logo-small.svg" alt="Move it"/>
            </button>
          </div>
        <nav>
          <ul>
            <SideMenuButton href="/" imgSrc="/icons/home.svg" layoutId="home"/>
            <SideMenuButton href="/leaderboard" imgSrc="/icons/award.svg" layoutId="leaderboard"/>
          </ul>
        </nav>
      </div>
  )
}