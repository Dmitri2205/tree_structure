import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { elementsSlice } from "../../store/reducers/ElementsSlice";
import usePrev from "@hooks/usePrev";

export const Properties = () => {

    const {setElements,handlePropChange} = elementsSlice.actions;
    const {selectedProperties,elements} = useAppSelector((state)=>state.elementsReducer)
    
    const [properties,setProperties] = useState<any>(null);
    const [showModal,setShowModal] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const calculateSelected = (): void => {
        let p = Object.entries(selectedProperties.child)[1]; 
        let values = Object.entries(p)[1];
        const result = Object.entries(values)[1][1];
        setProperties(result)
    }
      const prev: object = usePrev(selectedProperties.child);

    useEffect(()=>{
        if(Object.keys(selectedProperties.child).length > 0 && prev !== selectedProperties.child ) {
            calculateSelected();
        }
    },[selectedProperties.child,properties])


    const spanReset = (e: any,childIndex:number,property: string,tabName: string) => {
        let value = e.target.value;
        let parent = e.target.parentElement;
        const children = parent.children;
        const span = document.createElement("span");
        const newValue = `${property}: ${value} `;
        span.innerText = newValue;
        span.onclick = (e) => editPropertiesHandler(property,e.currentTarget,childIndex,tabName)
        parent.replaceChild(span, children[childIndex])
        dispatch(handlePropChange({property,value,childIndex,tabName}))
        calculateSelected();
        
    }

    const editPropertiesHandler = (property: string,target:any,childIndex: number,tabName: string) => {
        const propValue = target.innerText.toString().split(":")[1];
        const parent = target.parentElement;
        let children = parent.children;
        let input = document.createElement("input");
        input.type = "text";
        input.value = propValue; 
        input.onblur = (e:any) => spanReset(e,childIndex,property,tabName)
        parent.replaceChild(input,children[childIndex])
    }

    const createTabs = () => {
        const tabs = Object.entries(properties);
        const result: Array<ReactNode> = [];
        tabs.forEach((tabPair:any,t: number)=>{
            if(typeof tabPair[1] === "object") {
                result.push(
                    <Tab eventKey={t-1} title={`${tabPair[0]}`} key={`tab${t-1}`}>
                        <div id={`properties-list${t-1}`} className="d-flex flex-column ms-3" key={`properties${t-1}`}>
                            {
                            Object.entries(tabPair[1]).map((property,i)=>{
                                return(
                                    <span onClick={e=>editPropertiesHandler(property[0],e.currentTarget,i,tabPair[0])} key={`property${i-1}`}>{`${property[0]}: ${property[1]}`}</span>
                                )
                            })
                            }
                        </div>
                    </Tab>
                )
            }
        })
        return result;
    }

    const loadHandler = (): void => {
        const element = document.createElement("a");
        const textFile = new Blob([JSON.stringify(elements)], {type: 'application/json'});
        element.href = URL.createObjectURL(textFile);
        element.download = "data.json";
        document.body.appendChild(element); 
        element.click();
    }

    const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File = e.target.files[0];
        const fr: FileReader = new FileReader();
        fr.onload = (e: any)=>{
            const value = e.target.result;
            dispatch(setElements(JSON.parse(value)))
            setShowModal(false);
        }
        fr.readAsText(file);
    }


    return(
        <div className="position-relative">
            <h4 className="mt-2 ms-2">{selectedProperties.child.name}</h4>
            <Tabs
                defaultActiveKey="0"
                id="tabs"
                className="mb-3"
                unmountOnExit={true}
                mountOnEnter={true}
            >
                {
                    properties ?
                    createTabs()
                    :
                    null
                }
            </Tabs>
                {
                    Object.keys(selectedProperties.child).length > 0 ?
                    <Button onClick={e=>setShowModal(true)} className="position-absolute bottom-0 end-0">Files</Button>
                    :
                    null
                }

            <Modal show={showModal}>
            <Modal.Header closeButton onClick={e=>setShowModal(false)}>
                <Modal.Title>Files loading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Upload or save file</Modal.Body>
            <Modal.Footer>
                <label style={{position:"relative",border:"1px solid black",borderRadius:"8px",padding:"6px"}}>
                    Upload file
                <input type="file" className="visually-hidden position-absolute w-100 h-100 top-0 start-0" onChange={(e)=>fileUploadHandler(e)}/>
                </label>
                <Button variant="primary" onClick={e=>loadHandler()}>
                Save file
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}