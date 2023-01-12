import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Wallet } from './near-wallet'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Contract } from '../near-interface'

const inter = Inter({ subsets: ['latin'] })
const CONTRACT_ID = 'dev-1673509114108-25943907946429'

export default function Home() {
  const [ useWeb3, setUseWeb3] = useState({})
  const [ totalZoan, settotalZoan] = useState({})
  useEffect(()=> {
    const data = async() => {
      const wallet = await new Wallet({createAccessKeyFor: CONTRACT_ID}) // AGGTR , network = "mainnet"
      const contract = await new Contract({
        contractId: CONTRACT_ID,
        walletToUse: wallet,
      })

      const isSignedIn = await wallet.startUp()
      const totalZoan = await contract.get_all_zoan()
      setUseWeb3({
        wallet,
        contract,
        isSignedIn,
        totalZoan
        
      })

    }
    data()
  }, []);
  function mint_zoan(){
    let owner_id = 'vnc90.testnet'
    useWeb3.contract.mint_zoan({owner_id})
  }

  console.log(useWeb3)
  console.log(useWeb3.totalZoan);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
        {
          useWeb3.isSignedIn ? (
            <button>{useWeb3.wallet.accountId}</button>
            
          ) : (
            <button onClick = {() => useWeb3.wallet.signIn()} >Connect Wallet</button>

          )
        }
        <button onClick = {() => useWeb3.wallet.signOut()} >Sign Out</button>

        </div>
        <div>
          <form>
            <table>
              <tr>
                <td>
                  <label>Owner Wallet:</label>
                </td>
                <td>
                  <input type = 'text' name = 'owner_id' id = 'owner_id'></input>
                </td>
                <td><button onClick={mint_zoan()}>Mint NFT</button></td>
              </tr>
            </table>
          </form>
        </div>
      </main>
    </>
  )
}
