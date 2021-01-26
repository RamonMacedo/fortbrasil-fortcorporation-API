export default interface IUpdateUserDTO {
  id_user: string;
  name: string;
  email: string;
  password: string;
  old_password?: string;
  avatar?: string;
}
