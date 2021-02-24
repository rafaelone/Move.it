import styles from "../styles/components/Profile.module.css"

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/rafaelone.png" alt="Rafael Sergio"/>
      <div>
        <strong>Rafael Sergio</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  );
}