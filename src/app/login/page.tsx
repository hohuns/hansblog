"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  // here you validate the session status upon mount
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.socialButton}
          onClick={() => {
            signIn("google");
          }}
        >
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
