import Navbar from "@/components/navbar/navbar";
import classes from "../../../styles/Porudzbine.module.scss";
import PorudzbineMain from "@/components/porudzbine/poduzbineMain";

export default function Porudzbine() {
  return (
    <div className={classes.porudzbine}>
      <Navbar />
      <PorudzbineMain />
    </div>
  );
}
