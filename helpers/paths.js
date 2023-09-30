import db from "./db";
import Product from "@/models/Products";

async function getPaths() {
  await db.connectDb();
  const paths = await Product.distinct("slug");
  console.log("paths", paths);
  const path = paths.map((slug) => ({
    params: { product: slug },
  }));

  return path;
}

const paths = { getPaths };

export default paths;
