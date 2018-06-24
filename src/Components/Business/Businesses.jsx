import React, { Component } from 'react';
import request from 'superagent';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import ItemBusiness from './ItemBusiness';
import BASE_URL from '../../helpers/url';

/**
 * All businesses
 */
class Businesses extends Component {
  /**
   * constructor that takes
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      isLoading: false
    };
  }

  /**
   * @returns {func} get business
   */
  componentDidMount() {
    this.getBusinesses();
  }

  /**
   * @returns {obj} all businesses
   */
  getBusinesses = async () => {
    this.setState({ isLoading: true });
    const url = `${BASE_URL}/api/v2/businesses/?limit=30`;
    await request
      .get(url)
      .set('Content-Type', 'application/json')
      .then((response) => {
        if (response.status === 200 && this.refs.refBusiness) {
          this.setState({
            businesses: response.body.businesses,
            isLoading: false
          });
        }
      })
      .catch((err) => {
        this.setState({ errors: err, isLoading: false });
      });
  }

  /**
   * @return {jsx} html to be rendered
   */
  render() {
    const { businesses, isLoading } = this.state;
    const business = businesses.map((_business) => <ItemBusiness business={_business} key={_business.id}/>);
    return (
      <div className="container">
        <div className="row bucket" ref="refBusiness">
          <h2>Registered Businesses</h2>
          <hr className="my-4"/>

          <Masonry >
            { business }
          </Masonry>

          {
            <div className="spinners-loader">
              <SyncLoader
                color={'#123abc'}
                loading={isLoading}
              />
            </div>
          }

          {
            !isLoading &&
            <div className="no-content fade-in" style={{ display: businesses.length === 0 ? 'block' : 'none' }}>
              <p className="lead">No business registered. Follow link to register a business</p>
              <Link className="btn btn-primary btn-lg" to="/businesses/new">Register business</Link>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default Businesses;
