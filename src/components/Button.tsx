import React from "react";


const Button: React.FC<{ onClick: qdsfgdfsw }> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        console.log("click");
      }}
      className="fr-btn"
    >
      Label bouton
    </button>
  );
};

export default Button;
