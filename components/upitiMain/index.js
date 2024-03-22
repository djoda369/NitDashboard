import React from "react";
import DefaultTanstackTable from "../table/deafaultTable";
import classes from "./styles.module.scss";

function Upiti({ table }) {
  return (
    <div className={classes.proizvodi}>
      <div className={classes.proizvodi__nav}>
        <p>Upiti</p>
      </div>
      <div>
        <DefaultTanstackTable table={table} status={"success"} />
      </div>
    </div>
  );
}

export default Upiti;
