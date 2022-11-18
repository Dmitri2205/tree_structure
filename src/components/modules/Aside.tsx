import React, {
  JSXElementConstructor,
  MouseEventHandler,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { useAppSelector } from "@hooks/hooks";
import { elementsSlice } from "../../store/reducers/ElementsSlice";
import { Container, Button, Offcanvas, ListGroup, ListGroupItem } from 'react-bootstrap';

export const Aside = () => {
  const { setElements } = elementsSlice.actions; //сеттер элементов
  const { elements } = useAppSelector((state) => state.elementsReducer); //селектор элементов
  const [treeShown, setTreeShown] = useState<boolean>(false);

  const clickHandler = (type: string | undefined = undefined): any => {
    setTreeShown(!treeShown);
  };

  const renderTreeStructure = useMemo((): Array<any> => {
    let structure = [];

    const renderChildren = (
      children: Array<any>,
      parentName: string = undefined
    ) => {
      return (
        <ListGroup key={`${parentName}`} onClick={treeClickHandler} style={{border:"3px solid cyan"}}>
        <h3>{parentName}</h3>
        {children.map((child: any, i: number) => {
          const { children } = child;
          return (
            <ListGroup.Item key={`child-${i}_of_${parentName}`}>
                {children !== undefined ? (
                  renderChildren(child.children, child.name)
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
        <ListGroup>
        <h4>{name}</h4>
        {
          propsArray.map((pair: Array<any>, i: number) => {
            const pairHasChildren: boolean = pair[1].hasOwnProperty("children");
            console.log(
              `Pare: ${pair} \n TypeOf Pair 0 :${typeof pair[0]} \n TypeOf Pair 1 :${typeof pair[1]}`
              );
              console.log(Object.keys(pair[1]).length)
              return (
                <ListGroup.Item className="mr-0" key={`params${i}ofChild${name}`}>
                {
                  !pairHasChildren && Array.isArray(pair[1]) ? 
                  renderChildren(Object.entries(pair[1]), pair[0])
                  
                  : !pairHasChildren && typeof pair[1] !== "string" ?
                  renderProperties(pair[1], pair[0])
                  
                  : 
                  <span>{`${pair[0]} : ${pair[1]} `}</span>
                }
                </ListGroup.Item>
                );
              })
            }
              </ListGroup>
              )
            };
            //
            
            for (let element of elements) {
              const { children, name } = element;
              if (children) {
                const childList = renderChildren(children, name);
                structure.push(childList);
              }
            }
    return structure;
  }, [elements]);

  const treeClickHandler = (e: any): void => {
    console.log(e);
  }

  return (
    <Container>
      <Button variant="primary" onClick={(e: any) => clickHandler()}>
        Launch
      </Button>

      <Offcanvas show={treeShown} onHide={(e: any) => clickHandler("close")}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Structure tree</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{renderTreeStructure}</Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};
