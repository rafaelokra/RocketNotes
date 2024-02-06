import { Container, Links, Content } from './style'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api}  from '../../Services/api'
import { Tag } from '../../components/Tag'
import { Header } from '../../components/Header'
import { Button } from '../../components/button/index'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

   async function handleRemove(){
   const confirm = window.confirm("Deseja realmente remover a nota?");

   if (confirm) {
    await api.delete(`/notes/${params.id}`);
    navigate(-1);
   }
  }
    
  

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  },[]);

 
 

  return (
    <Container>
      <Header />
    {
      data &&
      <main>
        <Content>
          <ButtonText
           title="Excluir nota"
           onClick={handleRemove}
           />

          <h1>
           {data.title}
          </h1>

          <p>
            {data.description}
          </p>

        { 
           data.links &&
          <Section title="Links úteis">
              <Links>
              {
                data.links.map(links =>(
                  <li key={String(links.id)}>
                      <a href={links.url} target='_blank'>
                        {links.url}
                      </a>
                  </li> 
                ))     
              }  
              </Links>
            </Section>
        }
        {
           data.tags &&
          <Section title="Marcadores">
            {
               data.tags.map(tags =>(
                <Tag 
                   key={String(tags.id)}
                  title={tags.name}

                />
               )) 
            }    
          </Section>
        }
          <Button 
            title="Voltar"
            onClick={handleBack}
           />
        </Content>
      </main>
    }  
    </Container>
  )
};