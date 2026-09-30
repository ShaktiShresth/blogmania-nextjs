"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");

  useEffect(() => {
    const errorParam = params.get("error");
    // const successParam = params.get("success");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (errorParam) setError(errorParam);
    // if (successParam) setSuccess(successParam);

    if (
      errorParam
      //  || successParam
    ) {
      router.replace("/dashboard/login", { scroll: false });
    }
  }, [params, router]);

  //   if (session.status === "loading") {
  //     return <p>Loading...</p>;
  //   }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Back</h1>
      <h2 className={styles.subtitle}>
        Please sign in to access the dashboard.
      </h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
      </form>
      {error && (
        <span className={styles.error}>
          <p>{error}</p>
        </span>
      )}
      <span className={styles.or}>- OR -</span>

      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
