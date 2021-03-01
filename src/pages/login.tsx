import Head from "next/head"

import styles from "../styles/pages/Login.module.css"

export default function Login(){

  return (
    <div className={styles.containerLogin}>
      <Head>
          <title>Login | Move.it</title>
      </Head>
      <div className={styles.logoMove}>
        <img src="/logoMoveit.svg" alt="Logo Move.it"/>
      </div>
      <div className={styles.login}>
        <img src="/moveItLogin.svg" alt="Move It"/>
        <div>
          <h1>Bem vindo</h1>
          <div className={styles.github}>
            <img src="/github.svg" alt="Git Hub"/>
            <span>Faça login com seu Github para começar</span>
          </div>
          <form action="#" method="post">
            <input type="text" id="name" name="name" placeholder="Digite seu username"/>
            <button type="submit">
              <img src="/icons/arrowRight.svg" alt="Seta para esquerda"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}