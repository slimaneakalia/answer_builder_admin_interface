/* 
	* @author{Slimane AKALIA} slimaneakalia@gmail.com, Linkedin.com/in/slimaneakalia
*/
import React from "react";
import Button from "_shared/Components/Button";

const AddItemButton = props => {
  const { children, onClick } = props;
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Button className="btn btn-success" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default AddItemButton;
