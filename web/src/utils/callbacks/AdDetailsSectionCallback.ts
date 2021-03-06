// callback from current form elements to main form hook state
export const categoryCallback = (res: any, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    categoryID: parseInt(res.three.id ?? res.two.id ?? res.one.id),
  }));
};

export const adTitleCallback = (value: string, params: {callback: (res: any) => void}) => {
  if(value){
    params.callback((previousData:any) => ({
      ...previousData,
      title: value,
    }));
  }
};

export const adTypeCallback = (value: number, params: {callback: (res: any) => void}) => {
  if(value){
    params.callback((previousData:any) => ({
      ...previousData,
      adtype: value,
    }));
  }
};

export const forSaleByCallback = (value: number, params: {callback: (res: any) => void}) => {
  if(value){
    params.callback((previousData:any) => ({
      ...previousData,
      forsaleby: value,
    }));
  }
};

export const adDescriptionCallback = (value: string, params: {callback: (res: any) => void}) => {
  if(value){
    params.callback((previousData:any) => ({
      ...previousData,
      description: value,
    }));
  }
};

export const fulfillmentCallback = (value: any, params: {callback: (res: any) => void}) => {
  if(value){
    params.callback((previousData:any) => ({
      ...previousData,
      fulfillment: value.length === 0 ? null : value,
    }));
  }
};

export const cashlessCallback = (value: null | number, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    cashless_pay: value,
  }));
};

export const conditionCallback = (value: null | number, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    condition: value,
  }));
};

export const tagsCallback = (value: null | any[], params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    tags: !value || value.length===0 ? null : value,
  }));
};
