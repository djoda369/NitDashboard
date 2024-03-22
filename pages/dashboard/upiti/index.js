import Navbar from "@/components/navbar/navbar";
import classes from "../../../styles/prodizvodi.module.scss";
import Product from "@/models/Products";
import db from "@/helpers/db";
import { useTable } from "@/components/table/useTable";
import Upiti from "@/components/upitiMain";
import Avalablity from "@/models/Availablity";
import TextFormatter from "@/components/formaters/textFormater";
import { useState } from "react";
import axios from "axios";
import { Checkbox } from "@mui/material";

export default function Prozivodi({ calls }) {
  const [callsState, setCallsState] = useState(calls);

  const changeCompleted = async (id, value) => {
    const odlCall = {
      ...callsState.filter((product) => product._id === id)[0],
    };
    const completedCall = {
      ...odlCall,
      completed: !value,
      product: odlCall.product._id,
    };

    try {
      const response = await axios.put(`/api/availablity/${id}`, completedCall);

      const updatedColumnState = callsState.map((call) => {
        if (call._id === id) {
          return { ...call, completed: !value };
        }
        return call;
      });

      setCallsState(updatedColumnState);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      id: "FirstName",
      header: "First Name",
      accessorKey: "FirstName",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "LastName",
      header: "Last Name",
      accessorKey: "LastName",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "Phone",
      header: "Phone",
      accessorKey: "Phone",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "Email",
      header: "Email",
      accessorKey: "Email",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ getValue }) => (
        <TextFormatter value={new Date(getValue()).toLocaleDateString()} />
      ),
    },
    {
      id: "product.name",
      header: "Product",
      accessorKey: "product.name",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "completed",
      header: "Completed",
      accessorKey: "completed",
      cell: (row) => {
        return (
          <Checkbox
            onClick={() =>
              changeCompleted(row.row.original._id, row.getValue())
            }
            checked={row.getValue()}
          />
        );
      },
    },
  ];

  const { table } = useTable({
    data: callsState ?? [],
    columns,
  });

  return (
    <div className={classes.prozivodi}>
      <Navbar />
      <Upiti table={table} />
    </div>
  );
}

export async function getStaticProps() {
  db.connectDb();
  let calls = await Avalablity.find()
    .populate({
      path: "product",
      model: Product,
    })
    .sort("-date");
  db.disconnectDb();

  return {
    props: {
      calls: JSON.parse(JSON.stringify(calls)),
    },
    revalidate: 60,
  };
}
