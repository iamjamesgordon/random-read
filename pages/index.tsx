import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Autocomplete from "react-google-autocomplete"


export default function Home() {

  const [place, setPlace] = useState<{ place_id: string; }>({ place_id: "" })
  const [randomBook, setRandomBook] = useState<{ author: string; title: string; amazon_product_url: string }>({ author: "", title: "", amazon_product_url: "" })

  async function generateRandomBook() {
    
    const res = await fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`)
    const data = await res.json()
    const randomList = await data.results.lists[Math.floor(Math.random() * data.results.lists.length)]
    const randomBooks = await randomList.books[Math.floor(Math.random() * randomList.books.length)]

    setRandomBook(randomBooks)

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Random Reads</title>
        <meta name="description" content="Find me a random book and a cafe to read it in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Random Reads</h1>

      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_AC_API_KEY}
        onPlaceSelected={(place) => {
          console.log(place)
        }}
      />

      <button onClick={generateRandomBook}>Generate Random Book</button>

      {randomBook.author.length !== 0 &&
        <div>
          <h2>{randomBook?.title}</h2>
          <p>Author - {randomBook?.author}</p>
          <a href={randomBook?.amazon_product_url} target="_blank">Buy {randomBook?.title} from Amazon</a>
        </div>}

    </div>
  )
}

