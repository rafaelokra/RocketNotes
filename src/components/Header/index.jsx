import { RiShutDownLine } from 'react-icons/ri';
import { Container, Profile, Logout  } from './styles';
import { useAuth } from "../../hooks/auth";
import { api } from "../../Services/api"
import  AvatarPlaceholder from "../../assets/avatar_placeholder.svg";

export function Header() {
  const { signOut, user } = useAuth();

  const avatarUrl = user.avatar  ? `${api.defaults.baseURL}/files/${user.avatar}` :  AvatarPlaceholder;

  return (
    <Container>

      <Profile to='/profile'>
        <img
          src={avatarUrl}
          alt={user.name}
        />

        <div>
          <span>Bem-Vindo</span>
          <strong>{user.name}</strong>
        </div>

      </Profile>
      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  )
}