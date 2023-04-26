import React, { useEffect } from "react";

function Page404({ stylesNotFound }) {
  useEffect(() => {
    function drawVisor() {
      const canvas = document.getElementById("visor");
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

      ctx.lineTo(15, 10);

      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);

      ctx.fillStyle = "#2f3640";
      ctx.strokeStyle = "#f5f6fa";
      ctx.fill();
      ctx.stroke();
    }

    const cordCanvas = document.getElementById("cord");
    const ctx = cordCanvas.getContext("2d");

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;

    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 === 100) {
        y1Forward = true;
      }

      if (y1 === 300) {
        y1Forward = false;
      }

      if (y2 === 100) {
        y2Forward = true;
      }

      if (y2 === 310) {
        y2Forward = false;
      }

      if (y3 === 100) {
        y3Forward = true;
      }

      if (y3 === 317) {
        y3Forward = false;
      }

      y1Forward ? (y1 += 1) : (y1 -= 1);
      y2Forward ? (y2 += 1) : (y2 -= 1);
      y3Forward ? (y3 += 1) : (y3 -= 1);
    }

    drawVisor();
    animate();
  });
  return (
    <div className={`${stylesNotFound.body}`}>
      <div className={stylesNotFound.moon}></div>
      <div
        className={`${stylesNotFound.moon__crater} ${stylesNotFound.moon__crater1}`}
      ></div>
      <div
        className={`${stylesNotFound.moon__crater} ${stylesNotFound.moon__crater2}`}
      ></div>
      <div
        className={`${stylesNotFound.moon__crater} ${stylesNotFound.moon__crater3}`}
      ></div>

      <div className={`${stylesNotFound.star} ${stylesNotFound.star1}`}></div>
      <div className={`${stylesNotFound.star} ${stylesNotFound.star2}`}></div>
      <div className={`${stylesNotFound.star} ${stylesNotFound.star3}`}></div>
      <div className={`${stylesNotFound.star} ${stylesNotFound.star4}`}></div>
      <div className={`${stylesNotFound.star} ${stylesNotFound.star5}`}></div>

      <div className={`${stylesNotFound.error}`}>
        <div className={`${stylesNotFound.error__title}`}>404</div>
        <div className={`${stylesNotFound.error__subtitle}`}>Hmmm...</div>
        <div className={`${stylesNotFound.error__description}`}>
          It looks like one of the developers fell asleep
        </div>
        <button
          className={`${stylesNotFound.error__button} ${stylesNotFound.error__button_active}`}
        >
          LOGIN
        </button>
        <button className={`${stylesNotFound.error__button}`}>CONTACT</button>
      </div>

      <div className={`${stylesNotFound.astronaut}`}>
        <div className={`${stylesNotFound.astronaut__backpack}`}></div>
        <div className={`${stylesNotFound.astronaut__body}`}></div>
        <div className={`${stylesNotFound.astronaut__body__chest}`}></div>
        <div className={`${stylesNotFound.astronaut__arm_left1}`}></div>
        <div className={`${stylesNotFound.astronaut__arm_left2}`}></div>
        <div className={`${stylesNotFound.astronaut__arm_right1}`}></div>
        <div className={`${stylesNotFound.astronaut__arm_right2}`}></div>
        <div className={`${stylesNotFound.astronaut__arm_thumb_left}`}></div>
        <div className={`${stylesNotFound.astronaut__arm_thumb_right}`}></div>
        <div className={`${stylesNotFound.astronaut__wrist_left}`}></div>
        <div className={`${stylesNotFound.astronaut__wrist_right}`}></div>
        <div className={`${stylesNotFound.astronaut__leg_left}`}></div>
        <div className={`${stylesNotFound.astronaut__foot_right}`}></div>
        <div className={`${stylesNotFound.astronaut__wrist_left}`}></div>
        <div className={`${stylesNotFound.astronaut__wrist_right}`}></div>

        <div className="astronaut__cord">
          <canvas id="cord" height="500px" width="500px"></canvas>
        </div>

        <div className={`${stylesNotFound.astronaut__head}`}>
          <canvas id="visor" width="60px" height="60px"></canvas>
          <div
            className={`${stylesNotFound.astronaut__head_visor_flare1}`}
          ></div>
          <div
            className={`${stylesNotFound.astronaut__head_visor_flare2}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Page404;
