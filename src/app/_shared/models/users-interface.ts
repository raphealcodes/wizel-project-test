export interface UserDTO {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  address:  Address;
  phone:    string;
  website:  string;
  company:  Company;
}

export interface Address {
  street:  string;
  suite:   string;
  city:    string;
  zipcode: string;
  geo:     Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name:        string;
  catchPhrase: string;
  bs:          string;
}


export const geoData: Geo = {
  lat: '927944',
  lng: '2989484'
}

export const addressData: Address = {
  street:  '24 maryland street',
  suite:   '274 Nto',
  city:    'Ikeja',
  zipcode: '3847849',
  geo: geoData
}

export const companyData: Company = {
  name: 'Google Inc.',
  catchPhrase: 'we can do it',
  bs: 'do it like that'
}

export const  UserData: UserDTO[] = [{
  id: 1,
  name:     'Rapheal',
  username: 'Big Raph',
  email:    'string@example .com',
  address:  addressData,
  phone:    '0979894835',
  website:  'google.com',
  company:  companyData
}];




