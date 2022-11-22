import React, {
  ReactNode,
  useMemo,
  useState
} from "react";
import { useAppSelector,useAppDispatch } from "@hooks/hooks";
import { elementsSlice } from "../../store/reducers/ElementsSlice";
import { Container, Button, Offcanvas, ListGroup, ListGroupItem, Accordion } from 'react-bootstrap';
import {AsideContainer} from "@styles/aside.styles"

export const Aside = () => {
  const dispatch = useAppDispatch();
  const { setSelectedProperties } = elementsSlice.actions; //сеттер элементов
  const { elements } = useAppSelector((state) => state.elementsReducer); //селектор элементов
  const [treeShown, setTreeShown] = useState<boolean>(false);
  
  const clickHandler = (type: string | undefined = undefined): any => {
    setTreeShown(!treeShown);
  };

  const treeClickHandler = (e: any,child: object): void => {
    e.stopPropagation();
    const  categoryParams: Array<string> = e.currentTarget.parentNode.id.split(":")
    const [Category,path] = categoryParams;
    console.log(Category + "for" + path)
    dispatch(setSelectedProperties({child,category:{Category,path}}));
}

  const renderTreeStructure = (): Array<ReactNode> => {
    let structure: Array<any> = [];

    let categoryName = "";

    const renderChildren = (
      children: Array<any>,
      parentName: string = undefined,
      start: boolean
    ) => {
      if(start){ 
        categoryName = parentName; 
      }
      return (
        <ListGroup key={`${parentName}`} style={{border:"none"}} id={`${categoryName}:${parentName}`}>
        <h3>{parentName}</h3>
        {children.map((child: any, i: number) => {
          const { children } = child;
          return (
            <ListGroup.Item 
                  key={`child-${i}_of_${parentName}`} 
                  style={{paddingRight:"0",border:"none"}} 
                  onClick={(e) => treeClickHandler(e,child)}
            >
                {children !== undefined ? (
                  renderChildren(child.children, child.name,null)
                ) : (
                  renderProperties(child, child.name)
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    };

    const renderProperties = (child: any, name: string) => {
      const { properties } = child;
      const propsArray: Array<any> = Object.entries(properties ? properties : child);

      return (
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{name}</Accordion.Header>
          <Accordion.Body style={{padding:"0"}}>
           
        <ListGroup style={{textAlign:"left"}}>
        {
          propsArray.map((pair: Array<any>, i: number) => {
            const pairHasChildren: boolean = pair[1].hasOwnProperty("children");
            return (
              <ListGroup.Item key={`params${i}ofChild${name}`} style={{padding:"0",border:"none"}}>
                {
                  !pairHasChildren && Array.isArray(pair[1]) ? 
                  renderChildren(Object.entries(pair[1]), pair[0],null)
                  // TODO плохо определяется тип у слотов при number
                  : !pairHasChildren && typeof pair[1] !== "string" ?
                  renderProperties(pair[1], pair[0])

                  : 
                  <span style={{padding:"8px 0 8px 8px"}}>{`${pair[0]} : ${pair[1]} `}</span>
                }
                </ListGroup.Item>
                );
              })
            }
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
              )
            };
            
            for (let element of elements) {
              const { children, name } = element;
              if (children) {
                const childList = renderChildren(children, name,true);
                structure.push(childList);
              }
            }
    return structure;
  };


  return (
    <AsideContainer>
    <Container>
      <Button variant="primary" onClick={(e: any) => clickHandler()}>open</Button>

      <Offcanvas show={treeShown} onHide={(e: any) => clickHandler("close")}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Structure tree</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{renderTreeStructure()}</Offcanvas.Body>
      </Offcanvas>
    </Container>
    </AsideContainer>
  );
};
