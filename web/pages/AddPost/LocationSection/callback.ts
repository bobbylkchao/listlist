export const addressCallback = (value: string, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    address: value ? value : null,
  }));
};

export const latLngCallback = (lat: number | null, long: number | null, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    lat: lat,
    long: long
  }));
};

export const regionCityCallback = (city: string, region: string, params: {callback: (res: any) => void}) => {
  if(region && city){
    params.callback((previousData:any) => ({
      ...previousData,
      city: city,
      region: region
    }));
  }
};

export const exactAddressCallback = (value: boolean, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    exactLocation: value,
  }));
};
