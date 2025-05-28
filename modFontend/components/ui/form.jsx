"use client"

import React ,{ useRef, ReactNode } from "react";



const Form = ({children, action, classname, onsubmit}) => {
    const refs = useRef<HTMLFormElement>(null)
    return ( 
        <form
            className={classname}
            onSubmit={onsubmit}
            refs
            action={async (formData) => {
                await action(formData)
                refs.current?.reset()
            }}
        >{children}
        </form>
    );
}
 
export default Form;