import classes from "../../../styles/prozivod.module.scss";
import Navbar from "@/components/navbar/navbar";
import Product from "@/models/Products";
import db from "@/helpers/db";
import Cath from "@/models/Category";
import paths from "@/helpers/paths";
import Proizvod from "@/components/prozivodUpdate";

export default function Prozivod({ product, cathegories }) {
  return (
    <div className={classes.prozivodi}>
      <Navbar />
      <Proizvod card={product} cathegories={cathegories} />
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.product;

  await db.connectDb();
  let product = await Product.findOne({ slug: slug }).populate({
    path: "category",
    model: Cath,
  });
  let category = await Cath.find();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      cathegories: JSON.parse(JSON.stringify(category)),
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  await db.connectDb();
  const path = await paths.getPaths();

  return {
    paths: path,
    fallback: "blocking",
  };
}
