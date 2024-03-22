import { useState } from "react";
import classes from "./styles.module.scss";
import Image from "next/image";
// import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { RiFileEditFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { PiWarningCircleLight } from "react-icons/pi";
import { useRouter } from "next/router";

export default function Kartica({ card, cathegories }) {
  const [product, setProduct] = useState({ ...card });
  const [deleteMessage, setDeleteMesage] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const horizontal = card.tip === "zenska-obuca" || card.tip === "muska-obuca";
  const vertikal =
    card.tip === "zenska-odeca" ||
    card.tip === "muska-odeca" ||
    card.tip === "aksesoari";

  const handleClick = () => {
    setDeleteMesage((prevState) => !prevState);
  };
  const noHandleClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/proizvod/delete/${card._id}`);
      router.reload();
    } catch (error) {
      setError("Došlo je do greške pokušajte ponovo!");
    }
  };

  return (
    <div className={classes.container}>
      {deleteMessage && (
        <div className={classes.delete__container} onClick={handleClick}>
          <div className={classes.message} onClick={noHandleClick}>
            <PiWarningCircleLight />
            <p>
              <span>
                Da li ste sigurni da želite da izbrišete ovaj proizvod?
              </span>
              <span>Ova akcija je nepovratna!</span>
            </p>
            <div className={classes.btn__container}>
              <button className={classes.delete} onClick={handleDeleteProduct}>
                Delete
              </button>
              <button className={classes.cancel} onClick={handleClick}>
                Cancel
              </button>
            </div>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className={classes.card}>
        {horizontal && (
          <div className={classes.product__desc}>
            <div className={classes.card__img}>
              <Image
                src={card.images[0]}
                width={226}
                height={140}
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                alt={card.description}
              />
            </div>

            <span>{card.name}</span>
          </div>
        )}
        {vertikal && (
          <div className={classes.product__desc}>
            <div className={classes.card__imgVertical}>
              <Image
                src={card.images[0]}
                width={226}
                height={140}
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                alt={card.description}
              />
            </div>
            <span>{card.name}</span>
          </div>
        )}

        <div className={`${classes.values}`}>
          <div className={classes.text}>
            <span className={classes.id}>
              {card.tip === "zenska-odeca" ? "Ženska odeća" : ""}
              {card.tip === "muska-odeca" ? "Muška odeća" : ""}
              {card.tip === "zenska-obuca" ? "Ženska obuća" : ""}
              {card.tip === "muska-obuca" ? "Muška obuća" : ""}
              {card.tip === "aksesoari" ? "Aksesoari" : ""}
            </span>
            <span className={classes.kategorija}>{product.category.name}</span>
            <span className={classes.cena}>{card.price} RSD</span>
          </div>
        </div>
        <div className={classes.icons}>
          <Link href={`/dashboard/proizvodi/${card.slug}`}>
            <span>
              <RiFileEditFill className={classes.edit} />
            </span>
          </Link>

          <TiDelete onClick={handleClick} className={classes.delete} />
        </div>
      </div>
      {/* {more && (
        <div className={classes.other}>
          <div></div>
          <Link href={`/dashboard/proizvodi/${card.slug}`}>
            <button>Promeni</button>
          </Link>
          <button className={classes.delete} =onClick{handleDeleteProduct}>
            Izbriši
          </button>
        </div>
      )}
      <MdOutlineKeyboardDoubleArrowDown
        onClick={handleClick}
        className={classes.arrow}
      /> */}
    </div>
  );
}
