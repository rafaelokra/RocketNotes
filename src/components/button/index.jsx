import { Container } from './style';

export function Button({ title, loading = false, ...rest }) {

    return(
    <Container
     type='Button'
     disabled={loading}
     {...rest}
     >
       { loading ? 'Carregando...' : title }
    </Container>
    );
}