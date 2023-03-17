import React, { useEffect } from "react";
import { useEffecScroll } from "./useEffecScroll";
import { randomIntFromInterval } from "./parameters";


function Page500() {
  useEffecScroll();

  useEffect(() => {
    const stackContainer = document.querySelector(".stack-container");
    const cardNodes = document.querySelectorAll(".card-container");
    const perspecNodes = document.querySelectorAll(".perspec");
    const perspec = document.querySelector(".perspec");
    const card = document.querySelector(".card");

    let counter = stackContainer.children.length;

    //after tilt animation, fire the explode animation
    card.addEventListener("animationend", function () {
      perspecNodes.forEach(function (elem) {
        elem.classList.add("explode");
      });
    });

    //after explode animation do a bunch of stuff
    perspec.addEventListener("animationend", function (e) {
      if (e.animationName === "explode") {
        cardNodes.forEach(function (elem) {
          //add hover animation class
          elem.classList.add("pokeup");

          //add event listner to throw card on click
          elem.addEventListener("click", function () {
            let updown = [800, -800];
            let randomY = updown[Math.floor(Math.random() * updown.length)];
            let randomX = Math.floor(Math.random() * 1000) - 1000;
            elem.style.transform = `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
            elem.style.transition = "transform 1s ease, opacity 2s";
            elem.style.opacity = "0";
            counter--;
            if (counter === 0) {
              stackContainer.style.width = "0";
              stackContainer.style.height = "0";
            }
          });

          //generate random number of lines of code between 4 and 10 and add to each card
          let numLines = randomIntFromInterval(5, 10);

          //loop through the lines and add them to the DOM
          for (let index = 0; index < numLines; index++) {
            let lineLength = randomIntFromInterval(25, 97);
            var node = document.createElement("li");
            node.classList.add("node-" + index);
            elem
              .querySelector(".code ul")
              .appendChild(node)
              .setAttribute("style", "--linelength: " + lineLength + "%;");

            //draw lines of code 1 by 1
            if (index == 0) {
              elem
                .querySelector(".code ul .node-" + index)
                .classList.add("writeLine");
            } else {
              elem
                .querySelector(".code ul .node-" + (index - 1))
                .addEventListener("animationend", function (e) {
                  elem
                    .querySelector(".code ul .node-" + index)
                    .classList.add("writeLine");
                });
            }
          }
        });
      }
    });
  }, []);

  //function to generate random number

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<div class="container500">
      <div class="error500">
          <h1>Error 500</h1>
          <h2>Ups...</h2>
          <p>Parece que tenemos un problema, por favor intenta de nuevo más tarde.</p>
          <br></br>
          <a href="/" class="bg-gradient-to-r from-green-fedegan to-green-600 hover:from-red-fedega-hover hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-md mr-6">Inicio</a>
          <a href="javascript:window.location.reload(true)" class="bg-gradient-to-r from-green-fedegan to-green-600 hover:from-red-fedega-hover hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-md mr-6">Volver a intentarlo</a>
      </div>
      <div class="stack-container">
          <div class="card-container">
              <div class="perspec" style="--spreaddist: 125px; --scaledist: .75; --vertdist: -25px;">
                  <div class="card">
                      <div class="writing">
                          <div class="topbar">
                              <div class="red"></div>
                              <div class="yellow"></div>
                              <div class="green"></div>
                          </div>
                          <div class="code">
                              <ul>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-container">
              <div class="perspec" style="--spreaddist: 100px; --scaledist: .8; --vertdist: -20px;">
                  <div class="card">
                      <div class="writing">
                          <div class="topbar">
                              <div class="red"></div>
                              <div class="yellow"></div>
                              <div class="green"></div>
                          </div>
                          <div class="code">
                              <ul>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-container">
              <div class="perspec" style="--spreaddist:75px; --scaledist: .85; --vertdist: -15px;">
                  <div class="card">
                      <div class="writing">
                          <div class="topbar">
                              <div class="red"></div>
                              <div class="yellow"></div>
                              <div class="green"></div>
                          </div>
                          <div class="code">
                              <ul>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-container">
              <div class="perspec" style="--spreaddist: 50px; --scaledist: .9; --vertdist: -10px;">
                  <div class="card">
                      <div class="writing">
                          <div class="topbar">
                              <div class="red"></div>
                              <div class="yellow"></div>
                              <div class="green"></div>
                          </div>
                          <div class="code">
                              <ul>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-container">
              <div class="perspec" style="--spreaddist: 25px; --scaledist: .95; --vertdist: -5px;">
                  <div class="card">
                      <div class="writing">
                          <div class="topbar">
                              <div class="red"></div>
                              <div class="yellow"></div>
                              <div class="green"></div>
                          </div>
                          <div class="code">
                              <ul>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="card-container">
              <div class="perspec" style="--spreaddist: 0px; --scaledist: 1; --vertdist: 0px;">
                  <div class="card">
                      <div class="writing">
                          <div class="topbar">
                              <div class="red"></div>
                              <div class="yellow"></div>
                              <div class="green"></div>
                          </div>
                          <div class="code">
                              <ul>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    </div> <br></br>`,
      }}
    ></div>
  );
}

export default Page500;
