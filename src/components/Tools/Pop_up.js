import React, { useState, useRef, useCallback } from "react";
import styles from "../../styles/Pop_up.module.scss";
import ImageOptimize from "../Tools/ImageOptimize";
import { useMediaQuery } from "react-responsive";
import { UploadImageSticker } from "../Tools/functiones";
import Webcam from "react-webcam";

export default function Pop_up({
  onClose,
  ishabiliteBtn,
  ValueImagesrc,
  setValueImagesrc,
  ValueImagesrc2,
  setValueImagesrc2,
  isImagenOne,
  DobleImagen,
  isImagenExterna,
  setisImagenExterna,
  ValueImagesrcExterna,
  ValueImagesrcExterna2,
}) {

console.log(ValueImagesrcExterna);
console.log(ValueImagesrcExterna2);

  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };
  const [activeDesktopCamera, setActiveDesktopCamera] = useState(false);

  const [picture, setPicture] = useState("");
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    let date = new Date();
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    fetch(pictureSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File(
          [blob],
          `CaptureImage_${date.toUTCString()}.webp`,
          { type: "image/webp" }
        );
        isImagenOne ? setValueImagesrc(file) : setValueImagesrc2(file);
        setisImagenExterna(true);
        setPicture("");
      });
  });

  function showWebCam() {
    if (ishabiliteBtn) {
      activeDesktopCamera
        ? setActiveDesktopCamera(false)
        : setActiveDesktopCamera(true);
    } else {
      setActiveDesktopCamera(true);
      setPicture("");
    }
  }

  return (
    <>
      <div className={styles.img_upload}>
        <div className={styles.upload_container}>
          <span
            onClick={onClose}
            id="botonCierreModal"
            className={styles.close_btn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2f2f2f"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                fill="currentColor"
                strokeWidth="0"
              />
            </svg>
          </span>

          <div className={styles.container_body}>
            {ishabiliteBtn ? (
              <div className={styles.options}>
                {isDesktop ? (
                  <>
                    <div className={styles.option_group}>
                      <p className={styles.option_title}>Tomar fotografia</p>
                      <button
                        onClick={() => showWebCam()}
                        className={styles.option_link}
                        id="filePhoto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2f2f2f"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3" />
                          <path d="M14.973 13.406a3 3 0 1 0 -2.973 2.594" />
                          <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M19.001 15.5v1.5" />
                          <path d="M19.001 21v1.5" />
                          <path d="M22.032 17.25l-1.299 .75" />
                          <path d="M17.27 20l-1.3 .75" />
                          <path d="M15.97 17.25l1.3 .75" />
                          <path d="M20.733 20l1.3 .75" />
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* carga de input para mobil */}
                    <div className={styles.option_group}>
                      <p className={styles.option_title}>Tomar fotografia</p>
                      <button className={styles.option_link}>
                        <input
                          onChange={(e) =>
                            UploadImageSticker(
                              e,
                              setisImagenExterna,
                              isImagenOne ? setValueImagesrc : setValueImagesrc2
                            )
                          }
                          id="filePhoto"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className={styles.hide_input}
                        ></input>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2f2f2f"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3" />
                          <path d="M14.973 13.406a3 3 0 1 0 -2.973 2.594" />
                          <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M19.001 15.5v1.5" />
                          <path d="M19.001 21v1.5" />
                          <path d="M22.032 17.25l-1.299 .75" />
                          <path d="M17.27 20l-1.3 .75" />
                          <path d="M15.97 17.25l1.3 .75" />
                          <path d="M20.733 20l1.3 .75" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}

                {/* boton subir archivo */}
                <div className={styles.option_group}>
                  <p className={styles.option_title}>Subir archivo</p>

                  <button className={styles.option_link}>
                    <input
                      onChange={(e) =>
                        UploadImageSticker(
                          e,
                          setisImagenExterna,
                          isImagenOne ? setValueImagesrc : setValueImagesrc2
                        )
                      }
                      id="filePhoto2"
                      type="file"
                      className={styles.hide_input}
                    ></input>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2f2f2f"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 8h.01" />
                      <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5" />
                      <path d="M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526" />
                      <path d="M19 22v-6" />
                      <path d="M22 19l-3 -3l-3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            {activeDesktopCamera ? (
              <div className={styles.prevew}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      maxWidth: "400px",
                      margin: "0 auto",
                      maxHeight: "400px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {picture == "" ? (
                      <Webcam
                        audio={false}
                        height={500}
                        ref={webcamRef}
                        width={300}
                        imageSmoothing={true}
                        screenshotFormat="image/webp"
                        videoConstraints={videoConstraints}
                      />
                    ) : (
                      <img src={picture} />
                    )}
                  </div>
                  <div>
                    {picture != "" ? (
                      // recaptura
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPicture("");
                        }}
                        style={{
                          position: "relative",
                          zIndex: "10",
                          background: "green",
                          border: "none",
                          borderRadius: "50px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-refresh-dot"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        </svg>
                      </button>
                    ) : (
                      // captura
                      <button
                        style={{
                          position: "relative",
                          zIndex: "10",
                          background: "green",
                          border: "none",
                          borderRadius: "50px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          capture();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-camera-plus"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#ffffff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
                          <path d="M16 19h6" />
                          <path d="M19 16v6" />
                          <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {DobleImagen ? (
              <>
                {ValueImagesrc !== null || ValueImagesrcExterna !== null ? (
                  <div className={styles.prevew}>
                    {isImagenExterna && ValueImagesrcExterna != null ? (
                      <ImageOptimize
                        Values={{
                          src: ValueImagesrcExterna,
                          alt: "sticker imagen",
                          title: "Sticker",
                          classValue: styles.prevew_img,
                          width: 256,
                          height: 256,
                          style: {},
                        }}
                      ></ImageOptimize>
                    ) : ValueImagesrc != null ? (
                      <ImageOptimize
                        Values={{
                          src: URL.createObjectURL(ValueImagesrc),
                          alt: "sticker imagen",
                          title: "Sticker",
                          classValue: styles.prevew_img,
                          width: 256,
                          height: 256,
                          style: {},
                        }}
                      ></ImageOptimize>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                {ValueImagesrc2 != null || ValueImagesrcExterna2 !== null ? (
                  <div className={styles.prevew}>
                    {isImagenExterna && ValueImagesrcExterna2 != null ? (
                      <ImageOptimize
                        Values={{
                          src: ValueImagesrcExterna2,
                          alt: "sticker imagen 2",
                          title: "Sticker",
                          classValue: styles.prevew_img,
                          width: 256,
                          height: 256,
                          style: {},
                        }}
                      ></ImageOptimize>
                    ) : ValueImagesrc2 != null ? (
                      <ImageOptimize
                        Values={{
                          src: URL.createObjectURL(ValueImagesrc2),
                          alt: "sticker imagen 2",
                          title: "Sticker",
                          classValue: styles.prevew_img,
                          width: 256,
                          height: 256,
                          style: {},
                        }}
                      ></ImageOptimize>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : isImagenOne ? (
              ValueImagesrc !== null || ValueImagesrcExterna !== null ? (
                <div className={styles.prevew}>
                  {isImagenExterna && ValueImagesrcExterna != null ? (
                    <ImageOptimize
                      Values={{
                        src: ValueImagesrcExterna,
                        alt: "sticker imagen",
                        title: "Sticker",
                        classValue: styles.prevew_img,
                        width: 256,
                        height: 256,
                        style: {},
                      }}
                    ></ImageOptimize>
                  ) : ValueImagesrc != null ? (
                    <ImageOptimize
                      Values={{
                        src: URL.createObjectURL(ValueImagesrc),
                        alt: "sticker imagen",
                        title: "Sticker",
                        classValue: styles.prevew_img,
                        width: 256,
                        height: 256,
                        style: {},
                      }}
                    ></ImageOptimize>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )
            ) : ValueImagesrc2 !== null || ValueImagesrcExterna2 !== null ? (
              <div className={styles.prevew}>
                {isImagenExterna && ValueImagesrcExterna2 != null ? (
                  <ImageOptimize
                    Values={{
                      src: ValueImagesrcExterna2,
                      alt: "sticker imagen 2",
                      title: "Sticker",
                      classValue: styles.prevew_img,
                      width: 256,
                      height: 256,
                      style: {},
                    }}
                  ></ImageOptimize>
                ) : ValueImagesrc2 != null ? (
                  <ImageOptimize
                    Values={{
                      src: URL.createObjectURL(ValueImagesrc2),
                      alt: "sticker imagen 2",
                      title: "Sticker",
                      classValue: styles.prevew_img,
                      width: 256,
                      height: 256,
                      style: {},
                    }}
                  ></ImageOptimize>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
