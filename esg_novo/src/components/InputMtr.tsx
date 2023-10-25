import React, { ReactNode } from 'react';

interface InputMtrprops {
 children: ReactNode;
 newState: (state: string) => void;
 label: string;
 isNumber?: boolean;
 initialValue?: string;
 isInvisible?: boolean;
 isSelect?: boolean;
 value: string;
}

function InputMtr(props: InputMtrprops) {
 const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const newValue = event.currentTarget.value;
  props.newState(newValue);
 };

 const containerStyle = props.isInvisible ? { display: 'none' } : { display: 'block' };

 return (
  <div className="flex flex-col justify-between items-start" style={containerStyle}>
   <label style={containerStyle}>{props.label}</label>
   {props.isSelect ? (
    <select
     value={props.value}
     onChange={handleChange}
     className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
    >
     {props.children}
    </select>
   ) : (
    <input
     type={props.isNumber ? 'number' : 'date'}
     value={props.value}
     onChange={handleChange}
     className="border-gray-400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none"
    />
   )}
  </div>
 );
}

export default InputMtr;