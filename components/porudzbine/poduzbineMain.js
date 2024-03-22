import DefaultTanstackTable from "../table/deafaultTable";
import classes from "./styles.module.scss";
import { useState } from "react";

export default function PorudzbineMain({ table }) {
  return (
    <div className={classes.porudzbine}>
      <div className={classes.header}>
        <h1>Porudzbine</h1>
        <div className={classes.filter}></div>
      </div>
      <div>
        {" "}
        <DefaultTanstackTable table={table} status={"success"} />
      </div>
    </div>
  );
}
