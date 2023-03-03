/*
* These functions will be executed once, whenever you would run createRFQ function
* To create a new RFQ
*/

export function numberOfPKGs(item_list: any): number {
  let item_quantity = 0;
  item_list.map((q: any) => item_quantity += parseInt(q.Quantity));

  return item_quantity;
}

export function DimensionalWeight(item_list: any, constant: number): number {
  let item_calc = 0;

  item_list.forEach((num: any) => {
    item_calc += (num.Length * num.Width * num.Height) / constant;
  })

  return item_calc;
}

export function netWeight(item_list: any): number {
  let item_net_weight = 0;
  item_list.map((net: any) => item_net_weight += parseInt(net.Net_Weight));

  return item_net_weight;
}

export function grossWeight(item_list: any): number {
  let item_gross_weight = 0;
  item_list.map((gross: any) => item_gross_weight += parseInt(gross.Gross_Weight));

  return item_gross_weight;
}

export function compareWeights(gross: number, dimensional: number) {
  if (gross > dimensional) {
    return gross;
  }
  return dimensional;
}
