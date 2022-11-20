import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/hooks";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { elementsSlice } from "../../store/reducers/ElementsSlice";

export const Properties = () => {

    const {setElements} = elementsSlice.actions;
    const {selectedProperties,elements} = useAppSelector((state)=>state.elementsReducer)
    const [properties,setProperties] = useState<any>(null);
    const [showModal,setShowModal] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const calculateSelected = (): void => {
        let p = Object.entries(selectedProperties)[1]; 
        let values = Object.entries(p)[1];
        const result = Object.entries(values)[1][1];
        setProperties(result)
    }

    useEffect(()=>{
        if(Object.keys(selectedProperties).length > 0) calculateSelected()
    },[selectedProperties,calculateSelected])


    const createTabs = () => {
        const tabs = Object.entries(properties);
        const result: Array<ReactNode> = [];
        tabs.forEach((tabPair:any,i: number)=>{
            if(typeof tabPair[1] === "object") {
                result.push(
                    <Tab eventKey={i-1} title={`${tabPair[0]}`} key={`tab${i-1}`}>
                        <div className="d-flex flex-column ms-3">
                            {
                                Object.entries(tabPair[1]).map((property,i)=>{
                                    return(
                                        <span key={`prop${i}`}>{`${property[0]}:${property[1]}`}</span>
                                    )
                                })
                            }
                        </div>
                    </Tab>
                )
            }
        })
        console.log(result);
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
        const file = e.target.files[0];
        const fr: FileReader = new FileReader();
        fr.onload = (e: any)=>{
            const value = e.target.result;
            console.log()
            dispatch(setElements(JSON.parse(value)))
        }
        fr.readAsText(file);
    }


    return(
        <div className="position-relative">
            <h4 className="mt-2 ms-2">{selectedProperties.name}</h4>
            <Tabs
                defaultActiveKey="1"
                id="tabs"
                className="mb-3"
            >
                {
                    properties ?
                    createTabs()
                    :
                    null
                }
            </Tabs>
                {
                    Object.keys(selectedProperties).length > 0 ?
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
                Load file
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}