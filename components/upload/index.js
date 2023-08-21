import classes from "./styles.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { BsPlusSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RiCheckboxBlankLine, RiCheckboxBlankFill } from "react-icons/ri";

const emptyProduct = {
  name: "",
  gender: "female",
  description: "",
  slug: "",
  category: "",
  tip: "",
  images: [],
  mainImage: "",
  sizes: [],
  lice: "",
  postava: "",
  djon: "",
  materijal: "",
  price: "",
  discount: 0,
  sold: 0,
  limited: false,
  sale: false,
  exclusive: false,
  featured: false,
};

const manShoeSizes = ["41", "42", "43", "44", "45", "46", "47"];
const womenShoeSizes = ["36", "37", "38", "39", "40", "41"];
const wardrobeSizes = ["S", "M", "L", "XL", "XXL"];

export default function UploadMain({ cathegories }) {
  const [prozivod, setProzivod] = useState(emptyProduct);
  const [vrsta, setVrsta] = useState("");
  const [obuca, setObuca] = useState(false);
  const [odeca, setOdeca] = useState(false);
  const [imageSucces, setImageSucces] = useState(false);
  const [imageFail, setImageFail] = useState(false);
  const [imageFailEror, setImageFailError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [showImage, setShowImages] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [bigImage, setBigImage] = useState();
  const [selectedCategories, setSelectedCategories] = useState(cathegories);
  const [error, setError] = useState("");
  const [viewError, setViewError] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleVrstaChange = (event) => {
    const value = event.target.value;
    setVrsta(value);

    if (value === "zenska-obuca") {
      setObuca(true);
      setOdeca(false);
      setSelectedCategories((prevstate) => {
        return cathegories.filter((cath) => cath.vrsta === "obuca");
      });
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          sizes: womenShoeSizes,
        };
      });
    } else if (value === "muska-obuca") {
      setObuca(true);
      setOdeca(false);
      setSelectedCategories((prevstate) => {
        return cathegories.filter((cath) => cath.vrsta === "obuca");
      });
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          sizes: manShoeSizes,
          gender: "male",
        };
      });
    } else if (value === "zenska-odeca") {
      setOdeca(true);
      setObuca(false);
      setSelectedCategories((prevstate) => {
        return cathegories.filter((cath) => cath.vrsta === "odeca");
      });
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          sizes: wardrobeSizes,
          gender: "female",
        };
      });
    } else if (value === "muska-odeca") {
      setOdeca(true);
      setObuca(false);
      setSelectedCategories((prevstate) => {
        return cathegories.filter((cath) => cath.vrsta === "odeca");
      });
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          sizes: wardrobeSizes,
          gender: "male",
        };
      });
    } else if (value === "aksesoari") {
      setOdeca(true);
      setObuca(false);
      setSelectedCategories((prevstate) => {
        return cathegories.filter((cath) => cath.vrsta === "aksesoari");
      });
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          sizes: [],
          gender: "male",
        };
      });
    }

    setProzivod((prevstate) => {
      return {
        ...prevstate,
        tip: value,
      };
    });
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    const slug = value.toLowerCase().trim().replaceAll(" ", "-");
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        name: value,
        slug: slug,
      };
    });
  };

  const handelMainImage = (name) => {
    const stariNiz = files.filter((product) => product !== name);
    const noviNiz = [name, ...stariNiz];
    setFiles(noviNiz);
    setBigImage(name.preview);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        description: value,
      };
    });
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        category: value,
      };
    });
  };

  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        price: value,
      };
    });
  };

  const handleDjonChange = (event) => {
    const value = event.target.value;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        djon: value,
      };
    });
  };
  const handlePostavaChange = (event) => {
    const value = event.target.value;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        postava: value,
      };
    });
  };
  const handleLiceChange = (event) => {
    const value = event.target.value;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        lice: value,
      };
    });
  };
  const handleMaterijalChange = (event) => {
    const value = event.target.value;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        materijal: value,
      };
    });
  };

  const handleEkskluzivnoChange = (event) => {
    const value = event.target.checked;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        exclusive: value,
      };
    });
  };
  const handleOgranicenoChange = (event) => {
    const value = event.target.checked;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        limited: value,
      };
    });
  };
  const handleFeaturedChange = (event) => {
    const value = event.target.checked;
    setProzivod((prevstate) => {
      return {
        ...prevstate,
        featured: value,
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
      setShowImages(true);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      setImageFailError(
        `Maksimalna veličina slike je 10 MB! ${rejectedFiles.length} slike nisu podržane.`
      );
      setImageFail(true);
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

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    if (files.length < 1) {
      setImageFail(true);
      setImageFailError("Došlo je do greške! Pokušajte ponovo.");
      setImageLoading(false);
      return;
    }

    if (prozivod.images.length >= 1) {
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          images: [],
        };
      });
    }
    try {
      const formData = new FormData();
      formData.append("path", prozivod.tip);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const response = await axios.post("/api/cloudinary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("Upload response:", response.data);
      // console.log(prozivod);

      response.data.map((response) => {
        prozivod.images.push(response.url);
      });
      setProzivod((prevstate) => {
        return {
          ...prevstate,
          mainImage: response.data[0].url,
        };
      });
      setRejected([]);
      setImageFail(false);
      setImageSucces(true);
      setEnableSave(true);
      setImageLoading(false);
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();

    if (
      prozivod.name === "" ||
      prozivod.description === "" ||
      prozivod.category === "" ||
      prozivod.price === ""
    ) {
      setError(
        "Prozivod mora da ima Ime, Opis, Kategoriju, Cenu! Proverite unete podatke!"
      );
      setViewError(true);
      return;
    }

    const body = JSON.stringify(prozivod);

    const categorySame = prozivod.category;

    try {
      const response = await axios.post("/api/proizvod/upload", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSucces(true);

      setTimeout(() => {
        setSucces(false);
      }, 1500);

      setProzivod({
        category: categorySame,
        name: "",
        gender: "female",
        description: "",
        slug: "",
        tip: vrsta,
        images: [],
        sizes: [],
        lice: "",
        postava: "",
        djon: "",
        materijal: "",
        price: "",
        discount: 0,
        sold: 0,
        limited: false,
        sale: false,
        exclusive: false,
        featured: false,
      });
      setViewError(false);
      setBigImage();
      setFiles([]);
      setImageSucces(false);
      setEnableSave(false);
      setError("");

      // window.location.reload();

      console.log(response);
    } catch (error) {
      console.log(error);
      setViewError(true);
      setError(error.response.data.message);
    }
  };
  return (
    <div className={classes.upload}>
      {succes && (
        <div className={classes.file__succes}>
          <div className={classes.succes__mesage}>
            <p>Proizvod uspešno sačuvan! </p>
            <BsFillCheckCircleFill />
          </div>
        </div>
      )}
      <div className={classes.upload__nav}>
        <p>Dodaj Prozivod</p>
      </div>
      <form>
        <div className={classes.upload__main}>
          <div className={classes.upload__main_details}>
            <div className={classes.vrsta}>
              <label>Vrsta Prozivoda</label>
              <select value={vrsta} onChange={handleVrstaChange}>
                <option value="" className={classes.hidden}></option>
                <option value="zenska-obuca">Ženska Obuća</option>
                <option value="muska-obuca">Muška Obuća</option>
                <option value="zenska-odeca">Ženska Odeća</option>
                <option value="muska-odeca">Muška Odeća</option>
                <option value="aksesoari">Aksesoar</option>
              </select>
            </div>

            <div className={classes.info}>
              <div className={classes.info__main}>
                <label>Ime</label>
                <input
                  type="text"
                  value={prozivod.name}
                  onChange={handleNameChange}
                  placeholder="Ime.."
                />
              </div>
              <div className={classes.info__main}>
                <label>Kategorija</label>
                <select onChange={handleCategoryChange}>
                  <option value="" className={classes.hidden}></option>
                  {selectedCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes.info__main}>
                <label>Opis</label>
                <textarea
                  type="text"
                  placeholder="Opis.."
                  onChange={handleDescriptionChange}
                  value={prozivod.description}
                  rows="5"
                />
              </div>
              <div className={`${classes.info__main} ${classes.last}`}>
                <label>Cena</label>
                <input
                  type="number"
                  placeholder="Cena.."
                  onChange={handlePriceChange}
                  value={prozivod.price}
                />
              </div>
              <div className={`${classes.info__materijal} `}>
                {odeca && (
                  <div className={classes.last}>
                    <label>Materijal</label>
                    <input
                      type="text"
                      placeholder="Materijal.."
                      onChange={handleMaterijalChange}
                      value={prozivod.materijal}
                    />
                  </div>
                )}
                {obuca && (
                  <div>
                    <label>Đon</label>
                    <input
                      type="text"
                      placeholder="Đon.."
                      onChange={handleDjonChange}
                      value={prozivod.djon}
                    />
                  </div>
                )}
                {obuca && (
                  <div>
                    <label>Postava</label>
                    <input
                      type="text"
                      placeholder="Postava.."
                      onChange={handlePostavaChange}
                      value={prozivod.postava}
                    />
                  </div>
                )}
                {obuca && (
                  <div className={classes.last}>
                    <label>Lice</label>
                    <input
                      type="text"
                      placeholder="Lice.."
                      onChange={handleLiceChange}
                      value={prozivod.lice}
                    />
                  </div>
                )}
              </div>
              <div className={classes.info__checkbox}>
                <div>
                  <label>Ekskluzivno</label>
                  <input
                    type="checkbox"
                    onChange={handleEkskluzivnoChange}
                    value={prozivod.exclusive}
                  />
                </div>
                <div>
                  <label>Ograničeno</label>
                  <input
                    type="checkbox"
                    onChange={handleOgranicenoChange}
                    value={prozivod.limited}
                  />
                </div>
                <div className={classes.last}>
                  <label>Istaknuto</label>
                  <input
                    type="checkbox"
                    onChange={handleFeaturedChange}
                    value={prozivod.featured}
                  />
                </div>
              </div>
            </div>
          </div>
          {obuca && (
            <div className={classes.upload__main_img}>
              <h1>
                <span>Slike</span>
                {imageSucces && <BsFillCheckCircleFill />}
                {imageFail && (
                  <div>
                    <p>{imageFailEror}</p>
                    <BiSolidErrorCircle className={classes.fail__Img} />
                  </div>
                )}
              </h1>
              {!imageLoading && (
                <div className={classes.imgs}>
                  {showImage && (
                    <div>
                      <Image src={bigImage} alt="" width={450} height={300} />
                    </div>
                  )}
                  <ul>
                    {files.map((file, i) => {
                      if (i === 0) {
                        return (
                          <li key={file.name}>
                            <AiFillCloseCircle
                              className={classes.close}
                              onClick={() => removeFile(file.name)}
                            />
                            <div className={classes.save}>
                              <RiCheckboxBlankFill />
                            </div>
                            <div className={classes.small__img}>
                              <Image
                                src={file.preview}
                                alt=""
                                width={200}
                                height={133}
                              />
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={file.name}>
                          <AiFillCloseCircle
                            className={classes.close}
                            onClick={() => removeFile(file.name)}
                          />
                          <div className={classes.save}>
                            <RiCheckboxBlankLine
                              onClick={() => handelMainImage(file)}
                            />
                          </div>
                          <div className={classes.small__img}>
                            <Image
                              src={file.preview}
                              alt=""
                              width={200}
                              height={133}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {imageLoading && (
                <div className={classes.loadingSpinner}>
                  <SpinnerCircular />
                </div>
              )}
              <div {...getRootProps({})} className={classes.drop}>
                <input {...getInputProps()} />
                <div>
                  <BsPlusSquare />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag & drop files here, or click to select files</p>
                  )}
                </div>
              </div>
              <button className={classes.save__imgs} onClick={handleUpload}>
                Sačuvaj slike
              </button>
            </div>
          )}
          {odeca && (
            <div className={classes.upload__main_img}>
              <h1>
                <span>Slike</span>
                {imageSucces && <BsFillCheckCircleFill />}
              </h1>
              {!imageLoading && (
                <div className={classes.imgs}>
                  {showImage && (
                    <div>
                      <Image src={bigImage} alt="" width={266} height={400} />
                    </div>
                  )}
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
                            width={100}
                            height={150}
                            onClick={() => setBigImage(file.preview)}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {imageLoading && (
                <div className={classes.loadingSpinner}>
                  <SpinnerCircular />
                </div>
              )}
              <div {...getRootProps({})} className={classes.drop}>
                <input {...getInputProps()} />
                <div>
                  <BsPlusSquare />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag & drop files here, or click to select files</p>
                  )}
                </div>
              </div>
              <button className={classes.save__imgs} onClick={handleUpload}>
                Sačuvaj slike
              </button>
            </div>
          )}

          {enableSave && (
            <div className={classes.save}>
              {viewError && (
                <div>
                  <BiSolidErrorCircle />
                  <p>{error}</p>
                </div>
              )}
              <div></div>
              <button onClick={handleUploadProduct}>Sačuvaj</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
