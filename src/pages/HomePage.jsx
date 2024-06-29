import React from "react";
import "./index.css";
import pattern from "../assets/pattern4.png";

function HomePage() {
  return (
    <div className="Whole_div" style={{ backgroundImage: `url(${pattern})` }}>
      <section id="intro">
        <div class="intro-content">
          <h2>
            Object <span>Detection</span>
            <br />
          </h2>
          <div class="d-block d-lg-flex align-items-center">
            <button
              class="btn-get-started scrollto btn btn-outline-theme fileinput-button me-2 mb-2"
              onclick="asticaModel_ui_modalShow( 'addFile'); "
            >
              <i class="fa fa-fw fa-plus"></i>
              
              <label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  class="inputfile"
                  style={{display: 'none'}}
                ></input>
                Upload Image(s)</label>
            </button>
            <button
              type="submit "
              class="btn-projects scrollto desktop-only btn btn-outline-light me-2 mb-2"
              onclick=" isQuickUpload=0 ; $( '#asticaDataset_addDir').click(); "
            >
              <i class="fa fa-fw fa-upload"></i>
              <label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    class="inputfile"
                    style={{display: 'none'}}
                ></input>
                Upload Directory</label>
            </button>
            <button
              type="reset "
              class="btn-get-started scrollto btn btn-outline-light me-2 mb-2"
              onclick="asticaModel_ui_modalShow( 'addCamera'); "
            >
              <i class="fa fa-fw fa-camera"></i>
              <span>Take Photo</span>
            </button>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-lg-6 about-img">
              <img src="img/object-detection.png" alt="" />
            </div>

            <div class="col-lg-6 content">
              <h2>Pros</h2>
              <h3>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </h3>

              <ul>
                <li>
                  <i class="ion-android-checkmark-circle"></i> Fast
                </li>
                <li>
                  <i class="ion-android-checkmark-circle"></i> High precision
                </li>
                <li>
                  <i class="ion-android-checkmark-circle"></i> Easy to do
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
