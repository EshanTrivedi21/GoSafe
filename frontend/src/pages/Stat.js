import React from "react";

const Stat = () => {
  return (
    <div className="flex flex-row justify-center gap-20">
      {/* {image} */}
      <div className="flex justify-center items-start flex-col">
        <img
          src="https://picsum.photos/200/300"
          alt="image"
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "10px",
            // border: "5px solid hwb(141deg 19% 0% / 87%)",
          }}
        />
        <p className="text-white">RQI analysis :- </p>
        <p className="text-white text-sm">Road Conditions = </p><span className="text-red">Severe</span>
      </div>
      {/* info */}
      <div>
        <div className="flex flex-col items-start text-white">
          <h1 className="text-4xl font-semibold">Kalyan</h1>
          <p>Sector 44 tandel apartment road Kalyan 400768</p>
          <br />
          <p>
            Reported By user{" "}
            <span className="text-text font-bold underline">BHAVNA WAGH</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stat;
