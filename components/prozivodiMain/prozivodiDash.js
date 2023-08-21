import Kartica from "../karticeProzivoda/kartice";
import classes from "./styles.module.scss";
import { BsFilterCircle } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function ProzivodiMain({ products, cathegories }) {
  const [vrsta, setVrsta] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const sortedCategories = cathegories
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .filter((cath) => {
      const obuca = vrsta === "zenska-obuca" || vrsta === "muska-obuca";
      const odeca = vrsta === "zenska-odeca" || vrsta === "muska-odeca";
      const aksesoari = vrsta === "aksesoari";
      if (obuca) {
        return cath.vrsta === "obuca";
      } else if (odeca) {
        return cath.vrsta === "odeca";
      } else if (aksesoari) {
        return cath.vrsta === "aksesoari";
      } else {
        return cath;
      }
    });

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatch =
        selectedCategory === "" || product.category._id === selectedCategory;
      const isFeaturedMatch = !isFeatured || product.featured === isFeatured;
      const isExclusiveMatch =
        !isExclusive || product.exclusive === isExclusive;
      const isLimitedMatch = !isLimited || product.limited === isLimited;
      const vrstaMatch = vrsta === "" || product.tip === vrsta;

      return (
        nameMatch &&
        categoryMatch &&
        isFeaturedMatch &&
        isExclusiveMatch &&
        isLimitedMatch &&
        vrstaMatch
      );
    });

    setFilteredProducts(filteredProducts);
  }, [
    products,
    search,
    selectedCategory,
    isFeatured,
    isExclusive,
    isLimited,
    vrsta,
  ]);

  // const handleDeleteProduct = async () => {

  //   try {
  //     const response = await axios.delete(`/api/proizvod/delete/${card._id}`);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={classes.proizvodi}>
      <div className={classes.proizvodi__nav}>
        <p>Prozivodi</p>
      </div>
      <div className={classes.proizvodi__main}>
        <div className={classes.proizvodi__main_kartice}>
          <div className={classes.info}>
            <span>Vrsta</span>
            <span>Kategorija</span>
            <span>Cena</span>
          </div>
          <div className={classes.kartica__container}>
            {filteredProducts.map((product) => (
              <Kartica
                card={product}
                cathegories={cathegories}
                key={product._id}
                // handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
        <div className={classes.proizvodi__main_filter}>
          <div className={classes.vrsta}>
            <label>Vrsta Prozivoda</label>
            <select value={vrsta} onChange={(e) => setVrsta(e.target.value)}>
              <option value="" className={classes.hidden}></option>
              <option value="zenska-obuca">Ženska Obuća</option>
              <option value="muska-obuca">Muška Obuća</option>
              <option value="zenska-odeca">Ženska Odeća</option>
              <option value="muska-odeca">Muška Odeća</option>
              <option value="aksesoari">Aksesoar</option>
            </select>
          </div>
          <div className={classes.naslov}>
            <p>Filter</p>
            <BsFilterCircle />
          </div>
          <div>
            <form className={classes.filter}>
              <div className={classes.filter__search}>
                <label>Pretraga</label>
                <input
                  type="text"
                  placeholder="Ime..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className={classes.filter__kategorija}>
                <label>Kategorija</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Sve kategorije</option>
                  {sortedCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.filter__box}>
                <label>
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>Istaknuto</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isExclusive}
                    onChange={(e) => setIsExclusive(e.target.checked)}
                  />
                  <span>Ekskluzivno</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isLimited}
                    onChange={(e) => setIsLimited(e.target.checked)}
                  />
                  <span>Ograničeno</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
