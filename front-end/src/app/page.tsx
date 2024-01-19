'use client';
import styles from './page.module.css'

const Home = () => {

  let productArea: React.ReactNode = <p>Loading</p>;


  return (
    <main className={styles.main}>
      <form>
        <input type="text" name="encode"/>
        <button type="button">Encode</button>
        <hr/>
        Password: <input type="password" name="password"/>
        <hr/>
        <input type="text" name="decode"/>
        <button type="button">Decode</button>

      </form>
        {productArea}
    </main>
  )
};

export default Home;
