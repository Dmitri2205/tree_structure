import React,{useEffect} from "react";
import { Container } from "react-bootstrap";
import { Aside } from "./modules/Aside";
import { elementsSlice } from "../store/reducers/ElementsSlice";
import { useAppSelector,useAppDispatch } from "@hooks/hooks";
import { Header } from "./modules/Header";
import { Properties } from "./modules/Properties";

const Layout = () => {

  const { selectedProperties,elements } = useAppSelector((state) => state.elementsReducer); //селектор элементов
  const {updateData} = elementsSlice.actions; 
  const dispatch = useAppDispatch();

  const {edited,path} = selectedProperties;

  useEffect(()=>{
    let sectionIndex = 0;
    let sectionChildIndex = 0;
    let childIndex = 0;
    // console.log(selectedProperties.child.name)
    
    if(edited){
      for(let element of elements){
        let filtered = element.children.filter((child: any,i: number)=>{
          if(child.name === path){
            sectionIndex = i;
            return child;
          }
        })
        filtered.forEach((child: any,index: number)=>{
          child.children.forEach((element: any,c: number)=>{
            if(element.name === selectedProperties.child.name) {
              sectionChildIndex = index;
              childIndex = c;
              return element
            };
          });
        });
      }
      dispatch(updateData({sectionIndex,sectionChildIndex,childIndex,value:{selectedProperties}}))
    }
  },[edited])
  
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
