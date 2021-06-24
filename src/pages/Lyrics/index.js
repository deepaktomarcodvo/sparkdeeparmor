import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Listing from './components/Listing';
import { getLyrics } from '../../api';
import { storeRecord } from '../../utility';

const recordPerPage = 10;

const Lyrics = () => {
  const [searchText, setSearch] = useState('');

  const getData = async () => {
    const { data } = await getLyrics();
    storeRecord(JSON.stringify(data));
  }

  useEffect(() => {
    getData();
  }, []);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div className="timeline px-3">
      <div className="d-flex justify-content-between mt-4">
        <div>
          <p className="mb-0 mt-10">Lyrics</p>
        </div>
        {/* <div>{renderAddNewFeed()}</div> */}
      </div>
      <div className="pt-4">
        <input
          name="searchInput"
          value={searchText}
          onChange={searchHandler}
          label="Search"
          placeholder="Search..."
        />

        <Row className="mt-4">
          <Col className="pl-0">
            <Listing recordPerPage={recordPerPage} searchText={searchText} />
          </Col>
        </Row>
      </div>
    </div >
  );
};

export default Lyrics;
