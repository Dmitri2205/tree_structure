import React,{useEffect} from "react";
import { Container } from "react-bootstrap";
import { Aside } from "./modules/Aside";
import { elementsSlice } from "../store/reducers/ElementsSlice";
import { useAppSelector,useAppDispatch } from "@hooks/hooks";
import { Header } from "./modules/Header";
import { Properties } from "./modules/Properties";

const Layout = () => {

  const { selectedProperties,elements } = useAppSelector((state) => state.elementsReducer); //селектор элементов
  const {setElements} = elementsSlice.actions; 
  const dispatch = useAppDispatch();

  const {path} = selectedProperties;

  // useEffect(()=>{
    
  //   if(path.length > 0){
  //     let sectionIndex = 0;
  //     let sectionChildIndex = 0;
  //     let childIndex = 0;
  //     for(let element of elements){
  //       let filtered = element.children.filter((child: any,i: number)=>{
  //         if(child.name === path){
  //           sectionIndex = i;
  //           return child;
  //         }
  //       })
  //       const finded = filtered.find((child: any,c: number)=>{
  //         child.children.forEach((element: any,index: number)=>{
  //           if(element.name === selectedProperties.child.name) {
  //             sectionChildIndex = index;
  //             childIndex = c;
  //             return {element}
  //           };
  //         });
  //       });
  //       console.log(elements[sectionIndex].children[sectionChildIndex].children[childIndex])
  //     }
  //   }
  // },[path])
  
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
