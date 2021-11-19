export const uploadImagesCallback = (value: any, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    uploadImages: value,
  }));
};

export const youtubeCallback = (value: null | string, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    youtube: value === "" ? null : value,
  }));
};

export const websitelinkCallback = (value: null | string, params: {callback: (res: any) => void}) => {
  params.callback((previousData:any) => ({
    ...previousData,
    websitelink: value === "" ? null : value,
  }));
};
