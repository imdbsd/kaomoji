import React, { Fragment } from 'react';
import Header from '../../components/Header';
import FourZeroFour from '../../styles/404';

const Page404 = props => (
  <Fragment>
    <Header />
    <section className="section" style={{ margin: '25px auto' }}>
      <div className="column">
        <FourZeroFour>
          <p className="emoji">¯\_(ツ)_/¯</p>
          <p className="emoji__text">OOpps 404</p>
        </FourZeroFour>
      </div>
    </section>
  </Fragment>
);

export default Page404;
