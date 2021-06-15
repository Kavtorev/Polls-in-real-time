import Slider, { Settings } from "react-slick";
import styled from "styled-components";

export const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        arrows: false,
      },
    },
  ],
};

export const UsersSlider = styled(Slider)`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-backgroundColor);

  .slick-arrow::before,
  .slick-dots li.slick-active button::before {
    color: var(--primary-button-backgroundColor);
  }

  .slick-dots li button::before {
    color: var(--inactive-dark-color);
  }

  .slick-slide,
  .slick-initialized + div {
    display: flex;
    justify-content: center;
    width: 100px;
  }
`;
