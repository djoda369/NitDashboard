import Link from "next/link";
import classes from "./styles.module.scss";
import { signOut } from "next-auth/react";
import { AiOutlineHome } from "react-icons/ai";
import { PiFilesDuotone } from "react-icons/pi";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [prozivodiActive, setProzivodiActive] = useState(false);
  const [uploadActive, setUploadActive] = useState(false);
  const [dashboardActive, setDashboardActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("proizvodi")) {
      setProzivodiActive(true);
    }
    if (router.pathname.includes("dodaj-proizvod")) {
      setUploadActive(true);
    }
    if (router.pathname === "/dashboard") {
      setDashboardActive(true);
    }
  }, []);

  return (
    <div className={classes.nav}>
      <div className={classes.container}>
        <div className={classes.options}>
          {/* <span>NitNis</span> */}
          <img src="../../logo/NitLogo1.png" alt="logo" />
          <div className={classes.options__links}>
            <Link href="/dashboard">
              <p style={dashboardActive ? { backgroundColor: "#4b358d" } : {}}>
                <AiOutlineHome />
                Dashboard
              </p>
            </Link>
            <Link href="/dashboard/proizvodi">
              <p style={prozivodiActive ? { backgroundColor: "#4b358d" } : {}}>
                <PiFilesDuotone />
                Proizvodi
              </p>
            </Link>
            <Link href="/dashboard/porudzbine">
              <p>
                <BsCartCheck /> Porudzbine
              </p>
            </Link>
            <Link href="/dashboard/upiti">
              <p>
                <BsCartCheck /> Upiti
              </p>
            </Link>
            <Link href="/dashboard/dodaj-proizvod">
              <p style={uploadActive ? { backgroundColor: "#4b358d" } : {}}>
                <MdOutlineNoteAdd /> Dodaj proizvod
              </p>
            </Link>
          </div>
        </div>
        <button className={classes.logout} onClick={signOut}>
          Log out
        </button>
      </div>
    </div>
  );
}
