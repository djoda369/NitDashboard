import UploadMain from "@/components/upload";
import classes from "../../../styles/upload.module.scss";
import Navbar from "@/components/navbar/navbar";
import Cath from "@/models/Category";
import db from "@/helpers/db";


export default function Upload({ cathegories }) {
  const sortedCategories = cathegories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={classes.upload}>
      <Navbar />
      <UploadMain cathegories={sortedCategories} />
    </div>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  let category = await Cath.find();
  db.disconnectDb();

  return {
    props: {
      cathegories: JSON.parse(JSON.stringify(category)),
    },
  };
}
