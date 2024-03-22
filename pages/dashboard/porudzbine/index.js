import Navbar from "@/components/navbar/navbar";
import classes from "../../../styles/Porudzbine.module.scss";
import PorudzbineMain from "@/components/porudzbine/poduzbineMain";
import { useTable } from "@/components/table/useTable";
import Order from "@/models/Orders";
import db from "@/helpers/db";
import Product from "@/models/Products";
import TextFormatter from "@/components/formaters/textFormater";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function Porudzbine({ orders }) {
  const [columnState, setColumnState] = useState(orders);

  const changeCompleted = async (id, value) => {
    const oldProduct = {
      ...columnState.filter((product) => product._id === id)[0],
    };
    const completedProduct = {
      ...oldProduct,
      completed: !value,
    };

    try {
      const response = await axios.put(`/api/orders/${id}`, completedProduct);

      const updatedColumnState = columnState.map((product) => {
        if (product._id === id) {
          return { ...product, completed: !value };
        }
        return product;
      });

      setColumnState(updatedColumnState);
    } catch (error) {}
  };

  const columns = [
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ getValue }) => (
        <TextFormatter value={new Date(getValue()).toLocaleDateString()} />
      ),
    },
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
      id: "Email",
      header: "Email",
      accessorKey: "Email",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "Phone",
      header: "Phone",
      accessorKey: "Phone",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "City",
      header: "City",
      accessorKey: "City",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "PostalCode",
      header: "Postal Code",
      accessorKey: "PostalCode",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "Street",
      header: "Street",
      accessorKey: "Street",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "StreetNumber",
      header: "Street Number",
      accessorKey: "StreetNumber",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "Floor",
      header: "Floor",
      accessorKey: "Floor",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
    },
    {
      id: "ApartmentNumber",
      header: "Apartment Number",
      accessorKey: "ApartmentNumber",
      cell: ({ getValue }) => <TextFormatter value={getValue()} />,
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
    data: columnState ?? [],
    columns,
  });

  return (
    <div className={classes.porudzbine}>
      <Navbar />
      <PorudzbineMain table={table} />
    </div>
  );
}

export async function getStaticProps(params) {
  db.connectDb();
  let orders = await Order.find()
    .populate({
      path: "product",
      model: Product,
    })
    .sort("date");

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
    revalidate: 60,
  };
}
