import Navbar from "@/components/navbar/navbar";
import classes from "../../../styles/prodizvodi.module.scss";
import ProzivodiMain from "@/components/prozivodiMain/prozivodiDash";
import db from "@/helpers/db";
import Product from "@/models/Products";
import Cath from "@/models/Category";

export default function Prozivodi({ products, cathegories }) {
  return (
    <div className={classes.prozivodi}>
      <Navbar />
      <ProzivodiMain products={products} cathegories={cathegories} />
    </div>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  let products = await Product.find().populate({
    path: "category",
    model: Cath,
  });
  let category = await Cath.find();
  db.disconnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      cathegories: JSON.parse(JSON.stringify(category)),
    },
  };
}
