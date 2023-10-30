"use client";
import React, { useContext } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Context } from "@/context/Context";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { theme } = useContext(Context);
  const { status, data } = useSession();

  return (
    <div
      className={styles.container}
      style={
        theme === "light"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Link href="/">
        <div className={styles.social}>
          <Image src="/logo.png" alt="Hans Blog" width={25} height={25} />
        </div>
      </Link>
      <div className={styles.links}>
        <ThemeToggle />
        {status === "unauthenticated" ? (
          <Link href="/login">Login</Link>
        ) : (
          <>
            {/* {data?.user?.email == "hohunsjoo11177@gmail.com" && (
              <Link href="/write">Write</Link>
            )} */}
            <Link href="/write">Write</Link>
            <Link
              href=""
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            >
              Logout
            </Link>
          </>
        )}
        {/* <AuthLinks /> */}
      </div>
    </div>
  );
};

export default Navbar;
