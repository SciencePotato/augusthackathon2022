import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import Trending from '../../component/trending';
import Nav from '../../component/navbar';
import Footer from '../../component/footer';

const fakeData =  [
  {
    id: 1,
    title: "This is the first article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
  {
    id: 2,
    title: "This is the second article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
  {
    id: 3,
    title: "This is the third article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
  {
    id: 4,
    title: "This is the fourth article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
  {
    id: 5,
    title: "This is the fifth article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
  {
    id: 6,
    title: "This is the fifth article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
  {
    id: 7,
    title: "This is the fifth article",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
  },
];

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title> Homepage </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav num={1}></Nav>
      <Trending data={fakeData}/>
      <Footer></Footer>

    </div>
  )
}

export default Home
