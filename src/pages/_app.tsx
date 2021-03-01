import Login from "./login"
import "../styles/global.css"
import { AnimateSharedLayout } from "framer-motion"
import Layout from "../components/Layout"


function MyApp({ Component, pageProps }) {

  const isLogged = true

  if(isLogged){
    return ( 
      <AnimateSharedLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimateSharedLayout>
    )
  } 
  return <Login />
}

export default MyApp

