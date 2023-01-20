import React from "react";

const Stat = () => {
  return (
    <>
      <div className="flex flex-row justify-around items-center gap-5 ">
        <img src={require("../assets/randomPothole.jpg")} alt="" style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          border: "2px solid #fff",
        }}/>
        <h1 style={{
          color: "#fff",
          fontSize: "1.5rem",
        }}>Thakur Village, Kandivali</h1>
        <button className="bg-[#165C3F] text-white px-10 py-1 rounded-md border-white border-2 text-md tracking-widest"> Assign </button>
        <h1 style={{
          color: "#fff",
          fontSize: "1.2rem",
        }}>by Eshan Trivedi</h1>
      </div>
    </>
  );
};

export default Stat;
