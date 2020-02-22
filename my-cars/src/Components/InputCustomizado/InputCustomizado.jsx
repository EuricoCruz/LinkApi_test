import React from "react";
import InputMask from 'react-input-mask'

export default function InputCustomizado(props) {
    return (
      <div className="div-do-input-customizado">
        <label className="label">{props.label}</label>
        <InputMask {...props} />
      </div>
    );
}
