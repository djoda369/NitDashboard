import Navbar from "@/components/navbar/navbar";
import classes from "../../styles/dashboard.module.scss";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  console.log(session);
  return (
    <div className={classes.dashboard}>
      <Navbar />;
    </div>
  );
}

// export async function getServerSideProps(conetxt) {
//   const session = await getSession({
//     req: conetxt.req,
//   });

//   if (session) {
//     return {
//       props: {},
//     };
//   }

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
// }
