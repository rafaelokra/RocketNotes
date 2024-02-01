import { FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { api } from '../../Services/api';

import { Container, Brand, Menu, Search, Content, NewNote } from './style'

import { Note } from '../../components/Note';
import { Header } from '../../components/Header';
import { Input} from '../../components/Input';
import { Section} from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';

export function Home() {
  const [search, setSearch] = useState("");
  const [tags,setTags] = useState([]);
  const [tagsSelected,setTagsSelected] = useState([]);
  const [ notes, setNotes] = useState([]);

  function handleTagSelected(tagName){
    if(tagName === "all") {
      return setTagsSelected([])
    }
    const alreadySelected = tagsSelected.includes(tagName);

    if ( alreadySelected) {
      const filteredTags =tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    } else{
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }
useEffect(() => {
  async function fetchTags(){
    const response = await api.get("/tags");
    setTags(response.data);
  }
    fetchTags();
},[]);

useEffect(() => {
  async function fetchNotes(){
    const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
    setNotes(response.data);
  }

  fetchNotes();
},[tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header></Header>

      <Menu>
          <li>
            <ButtonText 
              title="Todos" 
              onClick={()=>handleTagSelected("all")}
               $isactive ={tagsSelected.length === 0}
                            
            />
        </li>
        {
           tags &&  tags.map(tag => (
          <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={()=>handleTagSelected(tag.name)}
                $isactive ={tagsSelected.includes(tag.name)}
              />
           </li>
          ))
        }
       
       
      </Menu>

      <Search>
        <Input 
          placeholder='Pesquisar pelo titulo'
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
          />
      </Search>

      <Content>
        <Section title='Minhas notas'>

            {
              notes.map(note => (
              <Note 
              key={String(note.id)}
               data={note}
              
            />
            ))
          }

        </Section>
      </Content>

      <NewNote to='/New'>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}