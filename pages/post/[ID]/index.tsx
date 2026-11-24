import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from 'next/link';
import Nav from '../../../component/navbar';
import scss from '../../../styles/post.module.scss'

const fakeData =  [
    {
      id: 1,
      title: "a",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!"
    },
    {
      id: 2,
      title: "b",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!"
    },
    {
      id: 3,
      title: "c",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!"
    },
    {
      id: 4,
      title: "d",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!"
    },
    {
      id: 5,
      title: "e",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo, commodi tempora quam eveniet nihil. Ad commodi, eum deleniti, reiciendis at dolorem et earum blanditiis incidunt nihil impedit iure ea!"
    },
];

const Post: NextPage = () => {
    
    const router = useRouter();
    const id = router.query.ID;
    const data = typeof id === "string" && /^[1-9]\d*$/.test(id)
      ? fakeData.find(post => String(post.id) === id)
      : undefined;

    return (
        <> 
            <Nav num={1}></Nav>
            <h1>
              {!router.isReady ? "Loading post..." : data?.title ?? "Post not found"}
            </h1>
        </>
    );
}

export default Post;