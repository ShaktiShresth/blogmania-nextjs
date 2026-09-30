import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Post from "@/models/Post";
import connectDB from "@/utils/db";

async function getData() {
  await connectDB();
  const posts = await Post.find().lean();
  return JSON.parse(JSON.stringify(posts));

  // const res = await fetch("http://localhost:3000/api/posts", {
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data!");
  // }

  // return res.json();
}

const Blog = async () => {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {data.length === 0 && (
        <div className={styles.noPostContainer}>
          <h1 className={styles.title}>No posts available!</h1>
        </div>
      )}
      {data.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item._id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
