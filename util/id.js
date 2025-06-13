exports.createUniqueID = (idArr) => {
  const length = 8;
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    id += randomNum;
  }
  return !idArr.includes(id) ? id : createUniqueID(idArr);
};
