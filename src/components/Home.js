import React from "react";

import GravityPhysijs from "./GravityPhysijs";
//
// import HomePortfolioGallery from "./HomePortfolioGallery";
// import ContactSection from "./HomeContact";
// import FooterTextAnimation from "./HomeFooterText";

//

function Home() {
  return (
    <React.Fragment>
      <section className="container-section-scene-TropicalOblivion">
        {/* ----------------------------------------- */}
        {/*             3d SECTION                  */}
        {/* ----------------------------------------- */}
        <div className="section-scene-threejs">
          <div className="container-TropicalOblivion">
            {/* ----------------------------------------- */}

            <div className="wrapper-scene-TropicalOblivion">
              <GravityPhysijs />
            </div>
            {/* ----------------------------------------- */}

            <div className="scene-description-TropicalOblivion">
              <div className="wrapper-scene-description-TropicalOblivion">
                <h3 className="h3-text-img-TropicalOblivion">3D</h3>
                <p>
                  I created this 3d scenes using threejs. Additional information
                  about the references used for this project, can be found in my
                  github.
                </p>
              </div>
            </div>
            {/* ----------------------------------------- */}
          </div>
        </div>
      </section>
      {/* ----------------------------------------- */}
    </React.Fragment>
  );
}

export default Home;
