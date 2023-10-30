"use client";
import Link from "next/link";
import styles from "./authlink.module.css";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span
            className={styles.link}
            onClick={() => {
              signOut({
                callbackUrl: `${window.location.origin}`,
              });
            }}
          >
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div
          className={styles.responsiveMenu}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Link
            href="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            Homepage
          </Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
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
        </div>
      )}
    </>
  );
};

export default AuthLinks;
