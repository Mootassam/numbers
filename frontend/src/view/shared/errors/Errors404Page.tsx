import React from "react";
import { Link } from "react-router-dom";

function Errors404Page() {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 style={{fontSize:24}}>Look like you're lost</h3>
                  <h3 style={{fontSize:24}}>the page you are looking for not avaible!</h3>
                  <Link to="/">
                    <a href="" className="link_404">
                      Go to Home
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Errors404Page;
