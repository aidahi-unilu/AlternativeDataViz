import React, { useState, useEffect } from "react";
import MenuData from "./collection.json";

const GalleryReact = () => {
  const [items, setItems] = useState(MenuData);
  const [activeCategories, setActiveCategories] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeCategories.includes("All")) {
      setItems(MenuData);
    } else {
      const filteredItems = MenuData.filter((item) => {
        if (activeCategories.length === 1) {
          return Array.isArray(item.category)
            ? item.category.includes(activeCategories[0])
            : item.category === activeCategories[0];
        } else {
          return (
            Array.isArray(item.category) &&
            activeCategories.every((category) => item.category.includes(category))
          );
        }
      });
      setItems(filteredItems);
    }
  }, [activeCategories]);

  useEffect(() => {
    const filteredItems = MenuData.filter((item) =>
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItems(filteredItems);
  }, [searchQuery]);

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setActiveCategories(["All"]);
    } else {
      setActiveCategories((prevCategories) => {
        const newCategories = prevCategories.includes(category)
          ? prevCategories.filter((c) => c !== category)
          : [...prevCategories, category];

        return newCategories.includes("All")
          ? newCategories.filter((c) => c !== "All")
          : newCategories;
      });
    }
  };

  const allCategories = [
    "All",
    ...new Set(MenuData.flatMap((item) =>
      Array.isArray(item.category) ? item.category : [item.category]
    )),
  ];

  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <nav className="navbar navbar-light bg-light shadow-sm">
        <div className="container d-flex flex-column align-items-center">
          <div className="mb-2 text-center">
            <h1 style={{ fontSize: "36px", paddingTop:"30px", color:"#00A4E2"}}>Alternative Ways to Visualize Data</h1>
          </div>
          <div className="text-center">
            <p className="mb-0" style={{ fontSize: "12px", whiteSpace: "pre-line", paddingBottom:"30px", textAlign:"justify"}}>
              My name is Aida Horaniet. I am a Doctoral Researcher at the University of Luxembourg and this collection of 400 data visualizations is part of my research. I am interested on data visualization concepts and techniques from epistemologically-distant disciplines and their potential application to interdisciplinary research. This collection includes data visualizations that use alternatives to standard statistical graphs (e.g., bar charts, scatter plots, choropleth maps, networks), including variations in their elements (e.g., the axis, grid or marks), the use of rhetorical or embellishment elements, the focus on granularity rather than summary metrics, the application of custom visual vocabularies, the use of multiple layers of information through glyphs, or the use of the visualization as a starting point for interpretation. You can contribute to extend the collection through <a href="https://forms.gle/TJ5qZ2dr4DUV36AXA">this form</a>. If you have any comments or questions, <a href="mailto:aida.horanietibanez@uni.lu">email me</a>! All the visualizations link directly to the original source, but if you prefer your visualization not to be included in this collection, or if you want to make any modifications, please <a href="mailto:aida.horanietibanez@uni.lu">let me know</a>.
            </p>
          </div>
        </div>
      </nav>


      <div className="container mt-4">
        <ul className="nav nav-pills justify-content-center" style={{paddingTop:"5px", paddingBottom:"5px", fontSize:"14px"}}>
          {allCategories.map((category) => (
            <li className="nav-item" key={category} >
              <a
                className={`nav-link ${activeCategories.includes(category) && "active"}`}
                href="javascript:0;"
                onClick={() => handleCategoryClick(category)}
                 style={{
                  backgroundColor: activeCategories.includes(category) ?  "#00A4E2":"#B3EAFF",
                  color: activeCategories.includes(category) ? "white" : "black",
                  marginRight: "5px", 
                  marginBottom:"5px"
                }}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container mt-2 mb-4 d-flex justify-content-center" style={{paddingTop:"15px", paddingBottom:"5px"}}>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Search by Author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "50%", textAlign: "left" }}
        />
      </div>

      <div className="container-fluid">
        <div className="row">
        {sortedItems.length === 0 ? (
            <div className="col-12 text-center mt-4">
              <h5>No results found</h5>
            </div>
          ) : (
            sortedItems.map(({ id, name, image, description, url, author }) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={id}>
                <div
                  className="card mb-3 position-relative"
                  style={{
                    paddingTop: "100%",
                  }}
                  onMouseEnter={() => {
                    const overlay = document.querySelector(`#overlay-${id}`);
                    if (overlay) {
                      overlay.style.visibility = "visible";
                      overlay.style.opacity = 1;
                    }
                  }}
                  onMouseLeave={() => {
                    const overlay = document.querySelector(`#overlay-${id}`);
                    if (overlay) {
                      overlay.style.visibility = "hidden";
                      overlay.style.opacity = 0;
                    }
                  }}
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <img
                      className="img-fluid"
                      src={process.env.PUBLIC_URL + "/" + image}
                      alt={name}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      id={`overlay-${id}`}
                      className="image-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        background: "rgba(0, 164, 226, 1)",
                        visibility: "hidden",
                        opacity: 0,
                        transition: "visibility 0s, opacity 0.3s ease",
                        fontSize: "10px", 
                        padding: "10px", 
                        textAlign: "center",
                      }}
                    >
                      {description.length > 400 ? `${description.slice(0, 400)}...` : description}
                    </div>
                  </a>
                </div>
                <div className="text-center">
                  <p style={{ fontSize: "14px", marginTop: "-15px", marginBottom: "15px", color:"#00A4E2"}}>{name}</p> {}
                  <p style={{ fontSize: "10px", marginTop: "-15px", marginBottom: "15px"}}>{author}</p> {}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="footer mt-auto py-3 bg-light text-center">
        <div className="container" style={{paddingTop:"10px", paddingBottom:"10px",fontSize:"10px"}}>
          <p className="m-0">The materials shown on this page are copyright protected by their authors and/or respective institutions.</p>
        </div>
      </footer>
      </div>
  );
};

export default GalleryReact;
