import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

import styles from "../styles/components/SideMenuButton.module.css"

export default function SideMenuButton({href, imgSrc, layoutId}:ISideMenuButtonProps){
  
  const router = useRouter()

  return (
    <li className={router.pathname === href ? styles.active : ""}>
      <Link href={href}>
        <div>
          <motion.img src={imgSrc}  layoutId={layoutId}/>
        </div>
      </Link>
    </li>
  )
}