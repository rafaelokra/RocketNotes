import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'

import { useAuth } from "../../hooks/auth";

import { api } from "../../Services/api"

import  AvatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Avatar } from "./style";

export function Profile() {
  const { user, updateProfile } = useAuth();

const [name, setName] = useState(user.name);
const [email, setEmail] = useState(user.email);
const [passwordOld, setPasswordOld] = useState();
const [passwordNew, setPasswordNew] = useState();

const avatarUrl = user.avatar  ? `${api.defaults.baseURL}/files/${user.avatar}` : AvatarPlaceholder;

const [ avatar, setAvatar] = useState(avatarUrl);
const [ avatarFile, setAvatarFile] = useState(null);

async function handleUpdate(){
  const user = {
    name,
    email,
    password: passwordNew,
    old_password: passwordOld,
  }
  await updateProfile({ user, avatarFile });
}

function handleChangeAvatar(event) {
  // Cria um novo input de arquivo para o usuário escolher a imag

  const file = event.target.files[0];
  setAvatarFile(file);

  const imagePreview =URL.createObjectURL(file);
  setAvatar(imagePreview);


}
  


  return (
    <Container>
      <header>
        <a href="/">
          <FiArrowLeft />
        </a>
      </header>

      <Form>
        <Avatar>
          <img
            src={avatar}
            alt="Foto do usuário"
          />
          <label htmlFor="avatar">
            <FiCamera />

            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova atual"
          type="password"
          icon={FiLock}
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar"  onClick={ handleUpdate} />
      </Form>
    </Container>
  )
}