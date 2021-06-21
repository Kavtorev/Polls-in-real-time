import Slider, { Settings } from "react-slick";
import styled from "styled-components";

export const settings = (slidesToShow: number = 1): Settings => ({
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: Math.min(slidesToShow, 4),
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false,
      },
    },
  ],
});

export const UsersSlider = styled(Slider)`
  height: 40px;

  .slick-arrow::before,
  .slick-dots li.slick-active button::before {
    color: var(--primary-button-backgroundColor);
  }

  .slick-dots li button::before {
    color: var(--inactive-dark-color);
  }

  .slick-track {
    margin: var(----top-bottom-margin) 0;
    .slick-slide.slick-active {
      width: 60px !important;
    }
  }

  .slick-slide,
  .slick-initialized + div {
    display: flex;
    /* justify-content: center;  */
    width: 100px;
  }
`;
