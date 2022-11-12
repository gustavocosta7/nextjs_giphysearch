import Head from 'next/head'
import {useEffect, useState} from 'react'
import Link from "next/link";
import Footer from "../components/Footer";
import Image from 'next/image'

export default function Home(initialData: any) {
    const [formInputs, setFormInputs] = useState()
    const [searchTerm, setSearchTerm] = useState('cats')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setSearchResults(initialData.catGiphys.data)
    }, [initialData])

    const handleInputs = (event: any) => {
        let {name, value} = event.target
        // @ts-ignore
        setFormInputs({...formInputs, [name]: value});
    }

    const search = async (event: any) => {
        event.preventDefault()
        {/*// @ts-ignore*/
        }
        let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=NWghl8uyztc9wCuPR1CQiINN8rU9IahT&limit=6`)
        giphys = await giphys.json()
        // @ts-ignore
        setSearchResults(giphys.data)
        // @ts-ignore
        setSearchTerm(formInputs.searchTerm)
    }

    return (
        <>
            <div className='container'>
                <Head>
                    <title>Giphy Search App</title>
                    <meta name="description"
                          content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occation"></meta>
                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="stylesheet" href="/styles.css"/>
                </Head>
                <div className="logo-container">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={150}
                    />
                </div>
                <h1>Giphy Search App</h1>

                <form onSubmit={search}>
                    <input name="searchTerm" onChange={handleInputs} type="text" required/>
                    <button>Search</button>
                </form>

                <h1>Search results for: {searchTerm}</h1>

                <p>Share this search with others:

                    <Link
                        href="/search/[pid]"
                        as={`/search/${searchTerm}`}>
                        {`http://localhost:3000/search/${searchTerm}`}
                    </Link>

                </p>

                <div className="giphy-search-results-grid">
                    {searchResults.map((each, index) => {
                        return (
                            <div key={index}>
                                {/*// @ts-ignore*/}
                                <h3>{each.title}</h3>
                                {/*// @ts-ignore*/}
                                <img src={each.images.original.url} alt={each.title}/>
                            </div>
                        )
                    })}
                </div>

            </div>
            <Footer/>
        </>

    )
}

export async function getStaticProps() {
    let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=NWghl8uyztc9wCuPR1CQiINN8rU9IahT&limit=6')
    catGiphys = await catGiphys.json()
    return {props: {catGiphys: catGiphys}}
}