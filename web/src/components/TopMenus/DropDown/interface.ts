export interface DropDownInterface{
  name: string;
  categories:{
    id: number;
    name: string;
    items:{
      id:number;
      name:string;
    }[]
  }[];
}

export interface NavDropDownItemInterface{
  id: number;
  name: string;
  subitems:{id:number, name:string}[];
}
