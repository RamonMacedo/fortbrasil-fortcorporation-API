export default interface ICreateEstablishmentDTO {
  estab_name: string;
  fantasy_name?: string;
  description?: string;
  cnpj: string;
  zipcode?: string;
  address: string;
  state: string;
  city: string;
}
