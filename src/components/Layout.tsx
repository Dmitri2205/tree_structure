import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Aside } from "./modules/Aside";
import { elementsSlice } from "../store/reducers/ElementsSlice";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { Header } from "./modules/Header";
import { Properties } from "./modules/Properties";

const Layout = () => {
  const { selectedProperties, elements } = useAppSelector(
    (state) => state.elementsReducer
  ); //селектор элементов
  const { updateData } = elementsSlice.actions;
  const dispatch = useAppDispatch();

  const { edited, category, path } = selectedProperties;

  useEffect(() => {
    let elementIndex = 0;
    let sectionIndex = 0;
    let sectionChildIndex = 0;

    if (edited) {
      for (let element of elements) {
        if (element.name === category) {
          elementIndex = elements.indexOf(element);
        }
        let founded = elements[elementIndex].children.find(
          (child: any, i: number) => {
            if (child.name === path) {
              sectionIndex = i;
              return child;
            }
          }
        );
        founded.children.forEach((child: any, index: number) => {
          Object.values(child).forEach((element: any, c: number) => {
            if (element === selectedProperties.child.name) {
              sectionChildIndex = index;
              return;
            }
          });
        });
      }
      dispatch(
        updateData({
          elementIndex,
          sectionIndex,
          sectionChildIndex,
          value: { selectedProperties },
        })
      );
    }
  }, [edited]);

  return (
    <Container className="w-100 p-0">
      <Header>
        <Aside />
      </Header>
      <Properties />
    </Container>
  );
};

export default Layout;
