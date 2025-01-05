export interface Match {
  id:number;
  localTeam: {
    icon: string;
    name: string;
    score?: string;
    pauldarrak:boolean;
  };
  visitorTeam: {
    icon: string;
    name: string;
    score?: string;
    pauldarrak:boolean;
  };
  fecha:string;
  hora:string;
  fieldName: string;
  location: string;
}
