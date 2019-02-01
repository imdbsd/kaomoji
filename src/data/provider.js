import kaomoji from './kaomoji.json';

const { data } = kaomoji;

const getAllData = () => data;

const getAllPinned = () => JSON.parse(localStorage.getItem('pin'));

const getCategory = key => {
  return data.find(({ category }) => category === key);
}

const getPinnedCategory = key => {
  return getAllPinned().find(({ category }) => category === key);
}

const subCategory = (parentKey, subKey) => {
  const parentCategory = getCategory(parentKey);
  return parentCategory.sub.find(({ category }) => category === subKey);
}

const getDatas = (parentKey, subKey) => {
  const parentCategory = getCategory(parentKey);
  console.log({ parentCategory })
  if (parentCategory === undefined) {
    return [];
  }
  return parentCategory.sub.find(({ category }) => category === subKey);
}

const getPinnedDatas = (parentKey, subKey) => {
  const parentCategory = getPinnedCategory(parentKey);
  console.log({ parentCategory })
  if (parentCategory === undefined) {
    return [];
  }
  const subCategory = parentCategory.sub.find(({ category }) => category === subKey);
  if(subCategory === undefined){
    return [];
  }
  return subCategory;
}

const getPinnedEmoji = (parentKey, subKey, index) => {
  const { emojis } = getPinnedDatas(parentKey, subKey);
  if(!emojis){
    return null;
  }
  return emojis[index];
}

const storePinned = (parentCategory, subCategory, emoji) => {
  return new Promise((resolve, reject) => {
    const { localStorage } = window;
    let pinned = localStorage.getItem('pin');
    if (!pinned) {
      pinned = [];
    }
    else {
      pinned = JSON.parse(pinned);
    }
    const parentCategoryIndex = pinned.findIndex(pin => pin.category === parentCategory);
    if (parentCategoryIndex === -1) {
      pinned.push({
        category: parentCategory,
        sub: [
          {
            category: subCategory,
            emojis: [
              emoji
            ]
          }
        ]
      })
    }
    else {
      const subCategoryIndex = pinned[parentCategoryIndex].sub.findIndex(pin => pin.category === subCategory);
      if (subCategoryIndex === -1) {
        pinned[parentCategoryIndex].sub.push({
          category: subCategory,
          emojis: [
            emoji
          ]
        })
      }
      else {
        const emojiIndex = pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.findIndex(pin => pin.emoji === emoji.emoji);
        if (emojiIndex === -1) {
          pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.push({
            ...emoji
          })
        }
        else {
          return resolve({ success: true })
        }
      }
    }
    localStorage.setItem('pin', JSON.stringify(pinned));
    resolve({
      success: true
    })
  })
}

const getEmoji = (parentCategory, subCategory, index) => {
  const parentCategoryIndex = data.findIndex(pin => pin.category === parentCategory);
  if (parentCategory === -1) {
    return null;
  }
  const subCategoryIndex = data[parentCategoryIndex].sub.findIndex(pin => pin.category === subCategory);
  if (subCategoryIndex === -1) {
    return null;
  }
  const emoji = data[parentCategoryIndex].sub[subCategoryIndex].emojis[index];
  if (!emoji) {
    return null;
  }
  return emoji;
}

const removePinned = (parentCategory, subCategory, emoji) => {
  return new Promise((resolve, reject) => {
    const { localStorage } = window;
    let pinned = localStorage.getItem('pin');
    if (!pinned) {
      return resolve({ success: false });
    }
    else {
      pinned = JSON.parse(pinned);
    }
    const parentCategoryIndex = pinned.findIndex(pin => pin.category === parentCategory);
    const subCategoryIndex = pinned[parentCategoryIndex].sub.findIndex(pin => pin.category === subCategory);
    const emojiIndex = pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.findIndex(pin => pin.emoji === emoji.emoji);
    if (emojiIndex === -1) {
      return resolve({ success: false });
    }
    if (emojiIndex === 1) {
      pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.shift();
    }
    else if (emojiIndex === pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.length - 1) {
      pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.pop();
    }
    else {
      const frontArr = pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.slice(0, emojiIndex);
      const backArr = pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.slice(emojiIndex + 1);
      pinned[parentCategoryIndex].sub[subCategoryIndex].emojis = [...frontArr, ...backArr];
    }
    localStorage.setItem('pin', JSON.stringify(pinned));
    return resolve({
      success: true,
      emojis: pinned[parentCategoryIndex].sub[subCategoryIndex].emojis
    })
  })
}

export {
  getCategory,
  subCategory,
  getDatas,
  getAllData,
  getAllPinned,
  getPinnedDatas,
  getPinnedEmoji,
  getEmoji,
  storePinned,
  removePinned
}
