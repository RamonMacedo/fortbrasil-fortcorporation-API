export default interface IUpdateEstablishmentDTO {
  id_establishment: string;
  estab_name: string;
  fantasy_name?: string;
  description?: string;
  cnpj: string;
  zipcode?: string;
  address: string;
  state: string;
  city: string;
  avatar?: string;
}
