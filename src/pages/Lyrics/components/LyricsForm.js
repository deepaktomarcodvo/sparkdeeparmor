import React, { useEffect, useState } from 'react'
import { isSongExist } from '../../../utility';
import PropTypes from "prop-types";

const inti = {
  song_name: '',
  album_name: '',
  lyric_text: '',
  upvote: 0,
  downvote: 0,
  isError: {
    song_name: '',
    album_name: '',
    lyric_text: ''
  },
  isValid: false
}

const formValid = ({ isError, ...rest }) => {
  let isValid = false;

  Object.values(isError).forEach(val => {
    if (val.length > 0) {
      isValid = false
    } else {
      isValid = true
    }
  });

  Object.values(rest).forEach(val => {
    if (val === null || val === '') {
      isValid = false
    } else {
      isValid = true
    }
  });
  console.log(isValid)
  return isValid;
};

const LyricsForm = ({ submit, editRow }) => {

  const [valuse, setValue] = useState(inti);
  useEffect(() => {
    if (editRow) {
      const newVal = { ...inti, ...editRow };
      setValue(newVal);
    }
  }, [editRow])

  const onSubmit = e => {
    e.preventDefault();
    if (formValid(valuse)) {
      const newRec = { ...valuse };
      delete newRec.isError;
      submit(newRec);
    } else {
      console.log("Form is invalid!");
    }
  }

  const formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...valuse.isError };

    switch (name) {
      case "song_name":
        isError.song_name =
          value.length < 4 ? "Song name required" : "";
        break;
      case "album_name":
        isError.album_name =
          value.length < 4 ? "Album name required" : "";
        break;
      case "lyric_text":
        isError.lyric_text =
          value.length < 6 ? "Lyrics required" : "";
        break;
      default:
        break;
    }
    if (name === "song_name") {
      if (isSongExist(value)) {
        isError.song_name = "Song already exist"
      }
    }
    let isValid = true;
    Object.values(isError).forEach(val => {
      if (val.length > 0) {
        isValid = false
      }
    });
    // const isValid = formValid(valuse);
    const tempValue = { ...valuse }
    tempValue[name] = value
    tempValue.isError = isError
    tempValue.isValid = isValid
    setValue(tempValue)
  };

  const { isError, song_name, album_name, lyric_text, id, isValid } = valuse;
  const btnLabel = id ? "Update Lyrics" : "Add Lyrics";
  // console.log(song_name)
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label>Song Name</label>
        <input
          type="text"
          className={isError.song_name.length > 0 ? "is-invalid form-control" : "form-control"}
          name="song_name"
          onChange={formValChange}
          value={song_name}
        />
        {isError.song_name.length > 0 && (
          <span className="invalid-feedback">{isError.song_name}</span>
        )}
      </div>

      <div className="form-group">
        <label>Album Name</label>
        <input
          type="text"
          className={isError.album_name.length > 0 ? "is-invalid form-control" : "form-control"}
          name="album_name"
          onChange={formValChange}
          value={album_name}
        />
        {isError.album_name.length > 0 && (
          <span className="invalid-feedback">{isError.album_name}</span>
        )}
      </div>

      <div className="form-group">
        <label>Lyric</label>
        <textarea
          className={isError.lyric_text.length > 0 ? "is-invalid form-control" : "form-control"}
          name="lyric_text"
          onChange={formValChange}
          rows={2}
          value={lyric_text}
        />
        {isError.lyric_text.length > 0 && (
          <span className="invalid-feedback">{isError.lyric_text}</span>
        )}
      </div>

      <button disabled={!isValid} type="submit" className="btn btn-block btn-primary">{btnLabel}</button>
    </form>
  );
}

LyricsForm.propTypes = {
  submit: PropTypes.func.isRequired,
  editRow: PropTypes.object
};

export default LyricsForm;
