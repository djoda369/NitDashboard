import classes from "./styles.module.scss";
import { useState, useCallback } from "react";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { BsPlusSquare } from "react-icons/bs";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RiCheckboxBlankLine, RiCheckboxBlankFill } from "react-icons/ri";
import { SpinnerCircular } from "spinners-react";
import { useRouter } from "next/router";

export default function Proizvod({ cathegories, card }) {
  const [product, setProduct] = useState({
    ...card,
    mainImage: card.images[0],
  });
  console.log(product);
  const [isFeatured, setIsFeatured] = useState(product.featured);
  const [exclusive, setExclusive] = useState(product.exclusive);
  const [limited, setLimited] = useState(product.limited);
  const [files, setFiles] = useState([]);
  const [imageError, setImageError] = useState();
  const [showImageError, setShowImageError] = useState(false);
  const [saveImagesLoading, setSaveImagesLoading] = useState(false);
  const [rejected, setRejected] = useState([]);
  const [succes, setSucces] = useState(false);
  const uploadImages = product.images.length < 4;
  const countImages = product.images.length + files.length <= 4;
  const showImageButton = files.length >= 1;
  const router = useRouter();
  const horizontal = card.tip === "zenska-obuca" || card.tip === "muska-obuca";
  const vertikal =
    card.tip === "zenska-odeca" ||
    card.tip === "muska-odeca" ||
    card.tip === "aksesoari";

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
      const obuca = card.tip === "zenska-obuca" || card.tip === "muska-obuca";
      const odeca = card.tip === "zenska-odeca" || card.tip === "muska-odeca";
      const aksesoari = card.tip === "aksesoari";
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

  const nameChange = (event) => {
    const newName = event.target.value;
    setProduct((prevstate) => {
      return { ...prevstate, name: newName };
    });
  };
  const handleVrstaChange = (event) => {
    const vrsta = event.target.value;
    setProduct((prevstate) => {
      return { ...prevstate, tip: vrsta };
    });
  };
  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setProduct((prevstate) => {
      return { ...prevstate, description: description };
    });
  };
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const selectedCategory = cathegories.find(
      (category) => category._id === categoryId
    );
    setProduct((prevState) => {
      return { ...prevState, category: selectedCategory };
    });
  };
  const handleFeaturedChange = (event) => {
    const newValue = event.target.checked;
    setIsFeatured(newValue);
    setProduct((prevState) => {
      return { ...prevState, featured: newValue };
    });
  };
  const handleExclusiveChange = (event) => {
    const newValue = event.target.checked;
    setExclusive(newValue);
    setProduct((prevstate) => {
      return {
        ...prevstate,
        exclusive: newValue,
      };
    });
  };
  const handleLimitedChange = (event) => {
    const newValue = event.target.checked;
    setLimited(newValue);
    setProduct((prevstate) => {
      return {
        ...prevstate,
        limited: newValue,
      };
    });
  };
  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setProduct((prevstate) => {
      return {
        ...prevstate,
        price: newPrice,
      };
    });
  };
  const handleLiceChange = (event) => {
    const newValue = event.target.value;
    setProduct((prevstate) => {
      return {
        ...prevstate,
        lice: newValue,
      };
    });
  };
  const handlePostavaChange = (event) => {
    const newValue = event.target.value;
    setProduct((prevstate) => {
      return {
        ...prevstate,
        postava: newValue,
      };
    });
  };
  const handleDjonChange = (event) => {
    const newValue = event.target.value;
    setProduct((prevstate) => {
      return {
        ...prevstate,
        djon: newValue,
      };
    });
  };
  const handleMaterijalChange = (event) => {
    const newValue = event.target.value;
    setProduct((prevstate) => {
      return {
        ...prevstate,
        materijal: newValue,
      };
    });
  };
  const handleImageRemove = (name) => {
    const images = product.images;
    const newImages = images.filter((image) => image !== name);

    setProduct((prevstate) => {
      return {
        ...prevstate,
        images: newImages,
      };
    });
  };
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };
  const handelMainImage = (name) => {
    const stariNiz = product.images.filter((product) => product !== name);
    const noviNiz = [name, ...stariNiz];
    setProduct((prevstate) => {
      return {
        ...prevstate,
        images: noviNiz,
        mainImage: noviNiz[0],
      };
    });
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      setShowImageError(true);
      setImageError(
        `Maksimalna veličina slike je 10 MB! ${rejectedFiles.length} slike nisu podržane.`
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
    },
    maxSize: 1024 * 1024 * 10,
    maxFiles: 4,
    onDrop,
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    setSaveImagesLoading(true);

    if (files.length < 1) {
      // setImageFail(true);
      // setImageFailError("Došlo je do greške! Pokušajte ponovo.");
      // setImageLoading(false);
      setShowImageError(true);
      setImageError("Nema Izabranih slika!");
      setSaveImagesLoading(false);
      return;
    }

    if (product.images.length === 4) {
      setShowImageError(true);
      setImageError("Maksimalno 4 slike po proizvodu!");
      setSaveImagesLoading(false);
      return;
    }

    if (!countImages) {
      setShowImageError(true);
      setImageError("Maksimalno 4 slike po proizvodu!");
      setSaveImagesLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("path", product.tip);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const response = await axios.post("/api/cloudinary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      response.data.map((response) => {
        product.images.push(response.url);
      });
      setShowImageError(false);
      setImageError("");
      setSaveImagesLoading(false);
      setFiles([]);
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (product.images.length < 1) {
      setShowImageError(true);
      setImageError("Proizvod mora imati bar 1 sliku!");
      return;
    }
    try {
      const response = await axios.put(`/api/proizvod/${product._id}`, product);
      setSucces(true);

      setTimeout(() => {
        setSucces(false);
        router.back();
      }, 1500);
      console.log(response.data);
      // Ovde možete dodati dodatne akcije nakon što su izmene sačuvane
    } catch (error) {
      console.error("Error saving changes:", error);
      // Obrada greške prilikom čuvanja izmena
    }
  };
  return (
    <div className={classes.proizvod}>
      {succes && (
        <div className={classes.file__succes}>
          <div className={classes.succes__mesage}>
            <p>Proizvod uspešno ažuriran!</p>
            <BsFillCheckCircleFill />
          </div>
        </div>
      )}
      <div className={classes.img}>
        <div>
          <h1>Slike</h1>
        </div>
        <div className={`${classes.big__img}`}>
          <Image
            src={product.images[0]}
            width={600}
            height={400}
            alt="big Image"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={classes.images}>
          <ul>
            {product.images.map((img, i) => {
              if (i === 0) {
                return (
                  <li
                    key={i}
                    className={
                      vertikal ? `${classes.vertical}` : `${classes.horizontal}`
                    }
                  >
                    <AiFillCloseCircle
                      className={classes.remove}
                      onClick={() => handleImageRemove(img)}
                    />
                    <Image
                      src={img}
                      width={150}
                      height={100}
                      alt="Image"
                      style={{ objectFit: "contain" }}
                    />
                    <div className={classes.selectMain}>
                      <RiCheckboxBlankFill />
                    </div>
                  </li>
                );
              }
              return (
                <li
                  key={i}
                  className={
                    vertikal ? `${classes.vertical}` : `${classes.horizontal}`
                  }
                >
                  <AiFillCloseCircle
                    className={classes.remove}
                    onClick={() => handleImageRemove(img)}
                  />
                  <Image
                    src={img}
                    width={150}
                    height={100}
                    alt="Image"
                    style={{ objectFit: "contain" }}
                  />
                  <div className={classes.selectMain}>
                    <RiCheckboxBlankLine onClick={() => handelMainImage(img)} />
                  </div>
                </li>
              );
            })}
            {uploadImages && (
              <li
                className={
                  vertikal ? `${classes.vertical}` : `${classes.horizontal}`
                }
              >
                <div {...getRootProps({})} className={classes.drop}>
                  <input {...getInputProps()} />
                  <div>
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <BsPlusSquare />
                    )}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        {uploadImages && (
          <div className={classes.upload__images}>
            <div className={classes.upload__images_show}>
              {!saveImagesLoading && (
                <ul>
                  {files.map((file) => {
                    return (
                      <li className={classes.img__container} key={file.name}>
                        <AiFillCloseCircle
                          onClick={() => removeFile(file.name)}
                        />

                        <Image
                          src={file.preview}
                          alt=""
                          width={150}
                          height={100}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}

              {saveImagesLoading && (
                <div className={classes.loadingSpinner}>
                  <SpinnerCircular />
                </div>
              )}
            </div>

            {showImageButton && (
              <button className={classes.save__imgs} onClick={handleUpload}>
                Sačuvaj slike
              </button>
            )}

            {showImageError && (
              <p className={classes.error}>
                <BiSolidErrorCircle />
                <span>{imageError}</span>
              </p>
            )}
          </div>
        )}
      </div>
      <div className={classes.info}>
        <div>
          <h1>Detalji</h1>
        </div>
        <form>
          <div className={classes.info__text}>
            <div>
              <label>Ime: </label>
              <input value={product.name} type="text" onChange={nameChange} />
            </div>
            <div>
              <label>Vrsta: </label>
              <select value={product.tip} onChange={handleVrstaChange}>
                <option value="zenska-obuca">Ženska Obuća</option>
                <option value="muska-obuca">Muška Obuća</option>
                <option value="zenska-odeca">Ženska Odeća</option>
                <option value="muska-odeca">Muška Odeća</option>
                <option value="aksesoari">Aksesoar</option>
              </select>
            </div>
            <div>
              <label>Kategorija: </label>
              <select
                value={product.category._id}
                onChange={handleCategoryChange}
              >
                {sortedCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Opis:</label>
              <textarea
                cols={50}
                rows={4}
                value={product.description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div>
              <label>Cena:</label>
              <input
                type="number"
                value={product.price}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className={classes.info__text}>
            <div>
              <label>Istaknuto:</label>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={handleFeaturedChange}
              />
            </div>
            <div>
              <label>Ekskluzivno:</label>
              <input
                type="checkbox"
                checked={exclusive}
                onChange={handleExclusiveChange}
              />
            </div>
            <div>
              <label>Ograničeno:</label>
              <input
                type="checkbox"
                checked={limited}
                onChange={handleLimitedChange}
              />
            </div>
          </div>
          {horizontal && (
            <div className={classes.info__text}>
              <div>
                <label>Lice:</label>
                <input
                  type="text"
                  value={product.lice}
                  onChange={handleLiceChange}
                />
              </div>
              <div>
                <label>Postava:</label>
                <input
                  type="text"
                  value={product.postava}
                  onChange={handlePostavaChange}
                />
              </div>
              <div>
                <label>Djon:</label>
                <input
                  type="text"
                  value={product.djon}
                  onChange={handleDjonChange}
                />
              </div>
            </div>
          )}
          {vertikal && (
            <div className={classes.info__text}>
              <div>
                <label>Materijal:</label>
                <input
                  type="text"
                  value={product.materijal}
                  onChange={handleMaterijalChange}
                />
              </div>
            </div>
          )}
        </form>
        <button className={classes.save} onClick={handleSaveChanges}>
          Sačuvaj
        </button>
      </div>
    </div>
  );
}
