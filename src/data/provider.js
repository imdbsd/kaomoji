import kaomoji from './kaomoji.json';

const { data } = kaomoji;
const pinned = JSON.parse(localStorage.getItem('pin'));

const getAllData = () => data;

const getAllPinned = () => JSON.parse(localStorage.getItem('pin'));

const getCategory = key => {  
  return data.find(({ category }) => category === key);
}

const getPinnedCategory = key => {
  console.log({pinned})
  return pinned.find(({ category }) => category === key);
}

const subCategory = (parentKey, subKey) => {
  const parentCategory = getCategory(parentKey);
  return parentCategory.sub.find(({ category }) => category === subKey);
}

const getDatas = (parentKey, subKey) => {
  const parentCategory = getCategory(parentKey);
  console.log({parentCategory})
  if(parentCategory === undefined){
    return [];
  }
  return parentCategory.sub.find(({ category }) => category === subKey);
}

const getPinnedDatas = (parentKey, subKey) => {
  const parentCategory = getPinnedCategory(parentKey);
  console.log({parentCategory})
  if(parentCategory === undefined){
    return [];
  }
  return parentCategory.sub.find(({ category }) => category === subKey);
}

export {
  getCategory,
  subCategory,
  getDatas,
  getAllData,
  getAllPinned,
  getPinnedDatas
}
