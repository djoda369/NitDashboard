import classes from "../../../styles/prozivod.module.scss";
import Navbar from "@/components/navbar/navbar";
import Product from "@/models/Products";
import db from "@/helpers/db";
import Cath from "@/models/Category";
import Proizvod from "@/components/prozivodUpdate";

export default function Prozivod({ product, cathegories }) {
  return (
    <div className={classes.prozivodi}>
      <Navbar />
      <Proizvod card={product} cathegories={cathegories} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.product;

  db.connectDb();
  let product = await Product.findOne({ slug: slug }).populate({
    path: "category",
    model: Cath,
  });
  let category = await Cath.find();

  db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      cathegories: JSON.parse(JSON.stringify(category)),
    },
  };
}
