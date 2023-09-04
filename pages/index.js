import Head from "next/head";
import classes from "@/styles/Home.module.scss";
import { getSession } from "next-auth/react";
import LogIn from "@/components/login/login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  // console.log(session, status);
  const router = useRouter();

  if (session) {
    router.replace("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Nit Dashboard</title>
      </Head>
      <main className={classes.main}>
        {/* <Navbar /> */}
        <LogIn />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({
    req: context.req,
  });
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
