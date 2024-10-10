// 금액 세 자리마다 , 추가함

const formatCost = (cost: number | string) => {
  const str = String(cost);
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatCost;
