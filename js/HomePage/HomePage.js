import React from 'react';
import Slider from 'react-slick';
import './HomePage.scss';
import Section from './Section';

// Header

// Promotional content (videos and pics)
// Space for sponsors
// Bio paragraph with background pic(s)
// Press and social media cards (CMS)

// Footer

export default () => (
  <div>
    <h1>HomePage</h1>
    <Section>
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    </Section>
  </div>
);
