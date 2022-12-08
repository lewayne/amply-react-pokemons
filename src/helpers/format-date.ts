const formatDate = (date: Date = new Date()): string => {
  // date : Date = new Date()
  const d1 = new Date();
  return `${d1.getDate()}/${d1.getMonth() + 1}/${d1.getFullYear()}`;
};

export default formatDate;