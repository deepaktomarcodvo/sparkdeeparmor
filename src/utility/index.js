export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const getPageNumber = (totalCount, perPage) => {
  const no = totalCount / perPage;
  return Math.ceil(no);
}
export const storeRecord = (data) => {
  localStorage.setItem('lyrics', data);
}

export const getTotalRecordCount = () => {
  const data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    return data.length;
  }
  return 0;
}

export const addNewLyrics = (newRecord) => {
  let data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    const newId = data.length;
    newRecord.id = newId;
    data.push(newRecord)
    storeRecord(JSON.stringify(data));
    return true
  }
  return false
}

export const editLyrics = (record) => {
  let data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    const { id } = record;
    const index = data.findIndex(item => id === item.id)
    if (index) {
      data[index] = record;
      storeRecord(JSON.stringify(data));
    }
    return true
  }
  return false
}

export const getRecordByPage = (pageNo, size, field, direction, searchText) => {
  let data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    if (searchText !== "") {
      data = data.filter(item => item.song_name.toLowerCase().includes(searchText.toLowerCase())  ||
      item.album_name.toLowerCase().includes(searchText.toLowerCase()) || item.lyric_text.toLowerCase().includes(searchText.toLowerCase())      );
    }
    data = data.sort((a, b) => {
      const textA = a[field].toUpperCase();
      const textB = b[field].toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    if (direction !== "ASC") {
      data = data.reverse();
    }
    const record = data.slice((pageNo - 1) * size, size * pageNo)
    return { record, totalCount: data.length };
  }
}

export const deleteRecord = (id) => {
  const data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    const index = data.findIndex(item => id === item.id)
    if (index) {
      data.splice(index, 1);
      storeRecord(JSON.stringify(data));
      return true;
    }
  }
  return false;
}

export const vote = (id, type) => {
  const data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    const index = data.findIndex(item => id === item.id)
    if (index) {
      if (type) {
        data[index].upvote = data[index].upvote + 1;
        data[index].downvote = 0;
      } else {
        data[index].downvote = data[index].downvote - 1;
        data[index].upvote = 0;
      }
      storeRecord(JSON.stringify(data));
      return true;
    }
  }
  return false;
}

export const isSongExist = (songName) => {
  let data = JSON.parse(localStorage.getItem('lyrics'));
  if (data) {
    if (songName !== "") {
      data = data.filter(item => item.song_name.toLowerCase() === songName.toLowerCase());
      if(data.length){
        return true;
      }
    }
  }
  return false;
}