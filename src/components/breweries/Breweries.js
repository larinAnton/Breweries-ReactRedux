import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../common/TextInput';
import {Link} from 'react-router';

class Breweries extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      breweries: props.breweries,
      filter:{name:"",city:""}
    };
    this.filterBreweries = this.filterBreweries.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.updateFilterState = this.updateFilterState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({breweries: Object.assign([],nextProps.breweries)});
    }
  }

  filterBreweries(){
    debugger;
    let bres = this.state.breweries;
    if(this.state.filter.name){
      bres = bres.filter(x=>x.name.indexOf(this.state.filter.name)!==-1)
    }
    if(this.state.filter.city){
      bres = bres.filter(x=>x.city.indexOf(this.state.filter.city)!==-1)
    }
    if(!this.state.filter.name && !this.state.filter.city){
      bres = this.props.breweries;
    }
    this.setState({breweries: bres})
  }

  onNameChange(event){
    this.setState({filterName: event.target.value});
  }

  onCityChange(event){
    this.setState({filterCity: event.target.value});
  }

  updateFilterState(event) {
    const field = event.target.name;
    let filter = this.state.filter;
    filter[field] = event.target.value;
    return this.setState({filter: filter});
  }


  render() {
    return (
      <div>
        <h1>Breweries</h1>
        <div>
          <TextInput label="Name" onChange={this.updateFilterState} name="name" placeholder="Name"/>
          <TextInput label="City" onChange={this.updateFilterState} name="city" placeholder="City"/>
          <input type="submit" value="Apply" onClick={this.filterBreweries} className="btn btn-primary"/>
        </div>
        <hr/>
        <table className="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
          </tr>
          </thead>
          <tbody>
          {this.state.breweries.map((brewery) => {
            return (
              <tr>
                <th><Link to={'/brewery/'+brewery.id}>{brewery.name}</Link></th>
                <th>{brewery.city}</th>
                <th>{brewery.phone}</th>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

Breweries.propTypes = {
  breweries: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    breweries: state.breweries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breweries);
