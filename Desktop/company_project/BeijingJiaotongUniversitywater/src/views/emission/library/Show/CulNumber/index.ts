// 风力发电 新建非并网
//1） 化石燃料相关数据
export const fossilFuelUnitType = {
  '1': 'L',
  '2': 'Kg',
  '3': 'm3',
};
export const fossilTypeArr = [
  {
    label: '柴油',
    value: 'L',
    emissionFactor: '2.662',
    emissionFactorUnit: 'kgCO₂/kg',
    fossilFuelType: '1',
  },
  {
    label: '燃料油',
    value: 'Kg',
    emissionFactor: '3.235',
    emissionFactorUnit: 'kgCO₂/L',
    fossilFuelType: '2',
  },
  {
    label: '天然气',
    value: 'm3',
    emissionFactor: '2.184',
    emissionFactorUnit: 'kgCO₂/m3',
    fossilFuelType: '3',
  },
];
