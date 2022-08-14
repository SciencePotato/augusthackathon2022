import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from 'next/link';
import Nav from '../../../component/navbar';
import scss from '../../../styles/post.module.scss'
import { useEffect, useState } from "react";

const fakeData: postData[] =  [
  {
    id: 1,
    title: "This is the first article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 2,
    title: "This is the second article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 3,
    title: "This is the third article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 4,
    title: "This is the fourth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 5,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 6,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 7,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 8,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 9,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 10,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 11,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
  {
    id: 12,
    title: "This is the fifth article",
    username: "John Dwen",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!",
    comments: 10,
    likes: 59,
    date: "2022-7-30 6:00PM",
    tags: ["programming", "beginner-friendly", "cool project"],
  },
];

const Post: NextPage = () => {
    
    const router = useRouter();
    let id;
    const [data, setData] = useState(fakeData[0]);
    useEffect(()=>{
        if(!router.isReady) return;
        id = router.query;
        setData(fakeData[parseInt(id.ID!.toString()) - 1]);
    }, [router.isReady]);

    return (
        <> 
            <Nav num={1}></Nav>
            <h1>
              {data.title}
            </h1>
        </>
    );
}

export default Post;