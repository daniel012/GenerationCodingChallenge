import React from 'react';

const place = (props) =>{

  return (<div class="row">
            <div style={props.handleIsVisible ? nameDivVisible : nameDivVisibleUnselect}>{props.keyPlace}</div>
            <div style={iconStyle}>
            	<i class="fa fa-trash" style={{ paddingRight: "5px"}} onClick={props.delEvent}></i>
              <i class="fa fa-search"   onMouseOver={props.handleMouseHover}
                                        onMouseLeave={props.handleMouseLeave}
                                        onClick={props.handlechangeMark} ></i>
              {
                props.isHovering &&
            	  <div style={divNewComments} ><div>{props.keyaddress}</div></div>
              }
            </div>
            
          </div>)

}


var nameDivVisible = {
  
  width: "80%",
  float:"left",
  borderBottom:"solid 1px #80808099"
};

var nameDivVisibleUnselect = {
  
  width: "80%",
  float:"left",
  borderBottom:"1px solid white",
  backgroundColor:"#e6e3e333",
  color:"#c2bcbc"
};


var iconStyle = {
  height: "100%",
  width: "20%",
  float:"right",
  paddingTop:"10px",
  cursor: "pointer"
};

var divNewComments = {
  position: "absolute",
  width: "150px",
  zIndex: 90,
  backgroundColor: "white",
  border: "solid 1px #0000004d",
  fontSize: "9px",
  padding: "4px",
  marginLeft: "-60px"
}

export default place;