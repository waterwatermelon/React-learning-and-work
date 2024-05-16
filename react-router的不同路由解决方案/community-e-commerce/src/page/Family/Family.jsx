import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout.jsx';


class Family extends Component {

  render() {
    return (
      <MainLayout>
        <div>
           <h2>My family</h2>
        </div>
      </MainLayout>
    );
  }
}

export default Family;