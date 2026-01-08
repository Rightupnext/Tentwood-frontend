import React, { useState } from "react";
import HotelCard from "./HotelCard";

const PackagesList = ({ hotels }) => {
  
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <HotelCard hotel={hotels} />
    </div>
  );
};

export default PackagesList;
