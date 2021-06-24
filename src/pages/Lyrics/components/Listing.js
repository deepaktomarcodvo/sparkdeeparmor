import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { getPageNumber, getRecordByPage, deleteRecord, vote, addNewLyrics, editLyrics } from '../../../utility'
import Paginate from './Paginator';
import { Button, Row, Col } from 'reactstrap';
import Table from './Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Popup from './Popup';
import LyricsForm from './LyricsForm';

const Listing = (props) => {
  const { searchText } = props
  const [lyricsList, setLyrices] = useState([]);
  const [sorting, setSortField] = useState({ sortBy: 'song_name', sortDirection: 'ASC' });
  const [pageNo, setPage] = useState(1);
  const [openPopup, setPopup] = useState(false);
  const [editRow, setEditRow] = useState();
  const [recordPerPage, setRecordPerPage] = useState(25);
  const [totalPage, setTotalPage] = useState(1);

  const closePopup = () => {
    setPopup(false);
    setEditRow(undefined);
  }
  const filterRecord = (pNo, field, direction) => {
    const pno = pNo || pageNo;
    let { sortBy, sortDirection } = sorting
    sortBy = field || sortBy;
    sortDirection = direction || sortDirection;
    const { record, totalCount } = getRecordByPage(pno, recordPerPage, sortBy, sortDirection, searchText);
    setTotalPage(getPageNumber(totalCount, recordPerPage));
    setLyrices(record);
  }

  const handlerAddSong = () => {
    setPopup(!openPopup);
  }

  const addNewRecord = (value) => {
    const { id } = value;
    if (id) {
      editLyrics(value);
    } else {
      addNewLyrics(value);
    }
    filterRecord();
    setPopup(!openPopup);
    setEditRow(undefined);
  }

  const handlerPagechange = (pageNo) => {
    setPage(pageNo);
    filterRecord(pageNo);
  }

  useEffect(() => {
    filterRecord();
  }, [searchText, recordPerPage]);

  useEffect(() => {
    filterRecord();
  }, []);

  const sortHandler = (field, direction) => {
    setPage(1);
    setSortField({ sortBy: field, sortDirection: direction })
    filterRecord(null, field, direction)
  }

  const edit = async (row) => {
    await setEditRow(row);
    setPopup(true);
  }

  const deleteRow = (row) => {
    const action = confirm("Do you want to delete?");
    if (action == true) {
      deleteRecord(row.id);
      filterRecord();
    }
  }

  const actionHandler = (row) => {
    return <div>
      <FontAwesomeIcon
        icon={faEdit}
        className="mr-2 cur-pointer"
        onClick={() => edit(row)}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="cur-pointer"
        onClick={() => deleteRow(row)}
      />
    </div>
  }

  const voteTo = (row, type) => {
    if (type) {
      if (row.upvote === 1) {
        return false
      }
    }
    else {
      if (row.downvote === -1) {
        return false
      }
    }
    vote(row.id, type);
    filterRecord();
  }

  const voteButton = (row) => {
    const { upvote, downvote } = row;
    return <div>
      {row.upvote} {' '}
      <FontAwesomeIcon
        icon={faThumbsUp}
        className={`mr-2 cur-pointer ${upvote === 1 ? 'text-secondary' : 'text-primary'}`}
        onClick={() => voteTo(row, true)}
      />
      {' '}
      {row.downvote}
      {' '}
      <FontAwesomeIcon
        icon={faThumbsDown}
        className={`cur-pointer ${downvote === -1 ? 'text-secondary' : 'text-primary'}`}
        onClick={() => voteTo(row, false)}
      />
    </div>
  };

  const collumns = [
    { title: 'Song Name', field: 'song_name', width:"20%"},
    { title: 'Album Name', field: 'album_name', width:"20%" },
    { title: 'Lyric', field: 'lyric_text', width:"40%" },
    { title: 'Vote', cellRender: voteButton, width:"10%" },
    { title: 'Action', cellRender: actionHandler, width:"10%" }
  ];

  const renderTable = () => {
    return <>
      <Table data={lyricsList} collumns={collumns} sortHandler={sortHandler} />
    </>
  }

  const handleChangeItemPerPage = (event) => {
    setRecordPerPage(parseInt(event.target.value));
  }

  const renderItemPerPage = () => {
    return <div><span>Show {' '}<select value={recordPerPage} onChange={handleChangeItemPerPage}>
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>{' '}entries</span></div>
  }

  const renderPaginate = () => {
    if (totalPage > 1) {
      return <Paginate handlerPagechange={handlerPagechange} totalPage={totalPage} recordPerPage={recordPerPage} pageNo={pageNo} />
    }
    return null;
  }
  return (
    <div>
      <Button color="primary" className="action-button add-btn" onClick={handlerAddSong}>
        <FontAwesomeIcon icon={faPlus} /> Add Song
      </Button>
      {renderTable()}
      <Row className="m-2 mt-4 mb-4">
        <Col>
          {renderItemPerPage()}
        </Col>
        <Col xs="auto">
          {renderPaginate()}
        </Col>
      </Row>
      <Popup open={openPopup} closePopup={closePopup}>
        <h5 className="mb-3">Add new lyrics</h5>
        {openPopup && <LyricsForm submit={addNewRecord} editRow={editRow} />}
      </Popup>
    </div>
  );
};

Listing.propTypes = {
  searchText: PropTypes.string.isRequired
};

export default Listing;

