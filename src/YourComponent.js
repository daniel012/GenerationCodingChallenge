import React, { Component } from 'react';
import {Map,  Marker, GoogleApiWrapper,InfoWindow} from 'google-maps-react';
import Geocode from "react-geocode";
import data from './store_directory.json';
//import data from './store_directoryWithPoints.json';
import Place from './components/Place';
import { Alert } from 'react-alert'

/*
* Use this component as a launching-pad to build your functionality.
*
*/


class ShowList extends React.Component {

  constructor(props) {
  super(props);
  


  }



  

  
  render() {
    return (
      <div>
        <h4> My Favorite Stores <i class="fa fa-check"  ></i></h4>
        
        <div class="container">
          {this.props.namesa.map((friend, index) => {
            return <Place keyPlace={friend.name}
                          keyaddress={friend.address}
                          delEvent={this.props.deleteList.bind(this,index)}
                          Idtemp={index}
                          isHovering={friend.isHovering}
                          handleMouseHover={this.props.handleMouseHover.bind(this,index)}
                          handleMouseLeave={this.props.handleMouseLeave.bind(this,index)}
                          handlechangeMark={this.props.handlechangeMark.bind(this,index)}
                          handleIsVisible={friend.isVisible.state}
                          >{friend.name}</Place>
          })}
        </div>
      </div>
    )
  }
}







class YourComponent extends Component {

  constructor(props) {
  super(props);


    this.keyprop=4
    this.state = {
      markedStoresList: [],
      render: false,
      center:{
        zoom:10,
        point:{
          lat:19.4326,
          lng:-99.1332
        }
      },
      selectIndex: -1 

    }

    this.mapClicked = this.mapClicked.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handlechangeMark = this.handlechangeMark.bind(this);

    Geocode.setApiKey("AIzaSyBN6ekFoEfngO6IWjYeWrZeHtSs_6fCLBk");
    Geocode.enableDebug();




        data.map(item => (

          Geocode.fromAddress(item.Address).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            
            const point = {"lat":lat,"lng":lng};

            item["point"]= point;
            item["isVisible"]=true;
            

            },
            error => {
            console.error(error);
            })

          ))

        //console.log(data)

    }


    componentDidMount() {
      setTimeout(function() { 
      this.setState({render: true}) 
      }.bind(this), 5000)
    }

    mapClicked(mapProps, map, clickEvent) {

      var flag = false;

      this.state.markedStoresList.map((item)=>{
        if(item.name === mapProps.name)
        {
           alert("this address is already saved")
          flag=true;
        }
         

      });

      if (!flag) 
        {            
            this.setState((state) => ({
            markedStoresList: state.markedStoresList.concat([{"name":mapProps.name,"address":mapProps.address,"isHovering":false,"isVisible":{"markKey":mapProps.keyData,"state":true}}])
            }))          
        };



    }


   deleteList = (index,e) =>
   {

      if (this.state.selectIndex == index)
        {
            const place = Object.assign([],this.state.markedStoresList);
            place.map((item)=>{
              item.isVisible.state =true;
            })

            this.setState({markedStoresList:place});

            data.map((item)=>{
              item.isVisible=true;
            })

        }
        else if(index < this.state.selectIndex){
          this.setState({selectIndex:(this.state.selectIndex-1)})
        }

      const place = Object.assign([],this.state.markedStoresList);
      place.splice(index,1);
      this.setState({markedStoresList: place});



   }


   handleMouseHover(index,e) {
   
    this.toggleHoverState(true,index);
  }

  handleMouseLeave(index,e) {
   

    this.toggleHoverState(false,index);
  }


  toggleHoverState(state, index) {

 

    const place = Object.assign([],this.state.markedStoresList);
    place[index].isHovering = state;
    this.setState({markedStoresList: place});
    
  }


  handlechangeMark(index)
  {
    

    var dataIndex = this.state.markedStoresList[index].isVisible.markKey;


    if (this.state.selectIndex == index)
    {
        const place = Object.assign([],this.state.markedStoresList);
        place.map((item)=>{
          item.isVisible.state =true;
        })

        this.setState({markedStoresList:place});
        this.setState({selectIndex:-1});

        data.map((item)=>{
          item.isVisible=true;
        })

    }
    else
    {
        const place = Object.assign([],this.state.markedStoresList);
        place.map((item)=>{
          item.isVisible.state =false;
        })

        data.map((item)=>{
          item.isVisible=false;
        })

        place[index].isVisible.state=true;
        data[dataIndex].isVisible=true;

        this.setState({markedStoresList:place});
        this.setState({selectIndex:index});
    }    

  }

  render() {

    return (
      <div style={divStyle} >
        <div class="container">
          <h3>Generation code solution</h3>
          <p >Here is all the stores around you, please select the store that you want to add into the "My Favorite Stores" list </p>
          <div class="row">
          <div  class="col-xs-12 col-sm-6">
            <ShowList namesa={this.state.markedStoresList}
                      deleteList={this.deleteList}
                      handleMouseHover={this.handleMouseHover}
                      handleMouseLeave={this.handleMouseLeave}
                      handlechangeMark={this.handlechangeMark} />
          </div>

          <div class="col-xs-12 col-sm-6">
           <div class="container">
            <div class="row">
              
            </div>
            <div class="row">
            <Map google={this.props.google} 
                 style={mapStyle}
                 zoom={this.state.center.zoom}
                 keyRe={this.keyprop}
                 initialCenter={this.state.center.point}
                onReady={this.initMap}>
     
            {data.map((item,index) => (


              
                item.isVisible &&
                <Marker 
                  onClick={this.mapClicked}
                  key={index}
                  keyData={index}
                  title={item.Name}
                  name={item.Name}
                  address={item.Address}
                  position={item.point}/>
              

            ))}

            </Map>
            </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    );
  }



}

var keyre= 4;

var divStyle = {

  borderTop:'2px solid red',
  padding: "20px",
  height: "100%",
  position: "absolute",
  width: "90%",
};

var divMapContainer = {
  position: "relative",
  height: "250px",
  width: "80%",
  float: "left",
  top:"20px"
}

var divListContainer = {
  position: "relative",
  width: "20%",
  height: "250px",
  left: "0%",
  float: "left",
}

var mapStyle = {
  position: 'relative',
  height: "300px",
  width: "100%"
}



export default GoogleApiWrapper({
  apiKey: ("AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A")
})(YourComponent)