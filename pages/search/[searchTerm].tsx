import Head from 'next/head';
import {useRouter} from "next/router";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function Search(initialData: any) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Search results for: {router.query.searchTerm}</title>
                {/*// @ts-ignore*/}
                <meta name="description" content={initialData.giphys.map((each, index) => each.title + ' ')}></meta>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="stylesheet" href="/styles.css"/>
            </Head>

            <p>Go <Link href="/">Home</Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>
            <div className="giphy-search-results-grid">
                {/*// @ts-ignore*/}
                {initialData.giphys.map((each, index) => {
                    return (
                        <div key={index}>
                            <h3>{each.title}</h3>
                            <img src={each.images.original.url} alt={each.title}/>
                        </div>
                    )
                })}
            </div>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const searchTerm = context.query.searchTerm;
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=NWghl8uyztc9wCuPR1CQiINN8rU9IahT&limit=6`)
    giphys = await giphys.json()
    // @ts-ignore
    return {props: {giphys: giphys.data}}
}