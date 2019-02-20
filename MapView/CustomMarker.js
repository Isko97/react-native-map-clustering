import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Icon } from "react-native-vector-icons/FontAwesome";

export default class CustomMarker extends Component {
  shouldComponentUpdate(nextProps) {
    return !(this.props.geometry === nextProps.geometry
      && this.props.pointCount === nextProps.pointCount);
  }

  getIconScale(pc){
        if(pc < 10){
            return 35
        }else if(pc >= 10 && pc < 50){
            return 0.875*pc+16.25
        }else{
            return 70
        }
    }

  render() {
    if (this.props.pointCount > 0) {
      return (
        <Marker
          coordinate={{
            longitude: this.props.geometry.coordinates[0],
            latitude: this.props.geometry.coordinates[1],
          }}
          onPress={this.props.pointCount > 0 && this.props.onClusterPress}
        >
          <View style={this.props.clusterStyle}>
            <Text style={this.props.clusterTextStyle}>
              {this.props.pointCount}
            </Text>
          </View>


          <Marker coordinate={{
              longitude: this.props.geometry.coordinates[0],
              latitude: this.props.geometry.coordinates[1],
            }}
            onPress={() => this.props.onClusterPress(this.props.pointCount, this.props.children)}>
              <Icon name="child" size={this.getIconScale(this.props.pointCount)} color={this.props.clusterTextColor} />
          </Marker>

        </Marker>
      );
    }
    return this.props.marker;
  }
}
