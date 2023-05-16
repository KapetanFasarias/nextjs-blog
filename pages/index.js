import Head from 'next/head';
import Layout, { siteTitle } from '../components/layouts';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

// SERVER-SIDE RENDERING EXAMPLE
//we would use the getServerSideprops() function as below...
/*
  export async function getServerSideProps(context) {
    //(context) contains request specific parameters.
    return {
      props: {
        // props for your component
      },
    };
  }
*/

//CLIENT SIDE RENDERING EXAMPLE
/*
 function Profile() {
   const { data, error } = useSWR('/api/user', fetch);

   if (error) return <div>failed to load</div>;
   if (!data) return <div>loading...</div>;
   return <div>hello {data.name}!</div>;
  }
*/

// STATIC PAGE GENERATION EXAMPLE
//getStaticProps ONLY RUNS on the server at built time once (Static Generation) it is NOT sent to the client browser! 
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
      props: { 
        allPostsData, 
      },
  };
}

export default function Home( { allPostsData } ) {
  return (
    <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>[hello there, i am learning]</p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
    </section>
    <section className = {`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.listItem}>Blog</h2>
      <ul className={utilStyles.list}>
        { allPostsData.map(({id, date, title})=> (
            <li className = {utilStyles.listItem} key = {id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
              <Date dateString={date} />
              </small> 
            </li>
        ))}
      </ul>
    </section>
  </Layout>
  );
}
