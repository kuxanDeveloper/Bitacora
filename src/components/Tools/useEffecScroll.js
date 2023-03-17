import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

export const useEffecScroll = ()=> {


    useEffect(() => {
        setTimeout(() => {
          scroll.scrollToTop();
        }, 0);
      }, []);

}