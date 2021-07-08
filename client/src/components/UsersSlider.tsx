import Slider, { Settings } from "react-slick";
import styled from "styled-components";

export const settings = (numberOfElements: number = 1): Settings => ({
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: Math.min(numberOfElements, 8),
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

  .slick-slide {
    width: auto !important;
    margin: 0 0.2em;
  }

  .slick-track {
    margin: 0 !important;
  }
`;
