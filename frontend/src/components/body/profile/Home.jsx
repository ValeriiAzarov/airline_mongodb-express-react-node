import React from 'react';
import image from "../../../images/folder.svg";

const Home = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img className="w-50" src={image} alt=""/>
    </div>
  );
};

export default Home;
