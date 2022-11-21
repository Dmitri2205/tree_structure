import React,{useEffect} from "react";
import { Container } from "react-bootstrap";
import { Aside } from "./modules/Aside";
import { elementsSlice } from "../store/reducers/ElementsSlice";
import { useAppSelector,useAppDispatch } from "@hooks/hooks";
import { Header } from "./modules/Header";
import { Properties } from "./modules/Properties";
import usePrev from "../hooks/usePrev"

const Layout = () => {

  const { selectedProperties,elements } = useAppSelector((state) => state.elementsReducer); //селектор элементов
  const {setElements} = elementsSlice.actions; 
  const dispatch = useAppDispatch();

  const prev: object = usePrev(selectedProperties);

  useEffect(()=>{
    const current = JSON.stringify(selectedProperties);
    const previous = JSON.stringify(prev);
    if(previous && previous !== current){
        const entries = Object.entries(elements);
        for(let entrie of entries){
          if(entrie[1].hasOwnProperty("children") && entrie[1].children.length > 0){
            entrie[1].children.forEach((child: object,i: number)=>{
              console.log(child)
            })
          }
        }
        }
  },[selectedProperties])
  
  return (
    <Container className="w-100 p-0">
      <Header>
        <Aside />
      </Header>
      <Properties/>
    </Container>
  );
};

export default Layout;
