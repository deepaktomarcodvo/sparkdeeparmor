import axios from 'axios';

export const getLyrics = async () => {
  let resObj;
  try {
    // eslint-disable-next-line no-undef
    await axios.get(`${process.env.REACT_APP_REST_ENDPOINT}vi/songs`)
      .then((response) => {
        // handle success
        resObj = response;
      })
      .catch((error) => {
        resObj = error;
      })
  }
  catch (error) {
    resObj = error;
  }
  return resObj
}