import styles from "../styles/components/Layout.module.css"
import SideMenu from "./SideMenu"

export default function Layout({ children }){

  return (
    <div className={styles.containerLayout} >
      <SideMenu />
      {children}
    </div>
  )
}