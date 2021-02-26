import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './modal-client-setting.css'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

interface iProps {
    item: any,
    updateClientInfo: any
}

const Modal:(props: iProps) => JSX.Element = (props: iProps ) => {
    const [showPanel, togglePanel] = useState(false);
    const data = props.item
    const modal = [];
    const phonePattern = /^(([+]{0,1}\d{3})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/
    const { register, handleSubmit, errors } = useForm();

    const onUpdate = (newdata: any) => {
        const variables = {
            id:data.id,
            phone: newdata.clientPhone,
            avatarUrl: newdata.clienPhoto
        }
        props.updateClientInfo(variables)
    }

    modal.push(
        <div key={data.id} className="modal client__modal" style={showPanel ? display : hide}>
            <div className="modal-content">
                <h1 className={'mb-12 text-2xl'}>Client: <span className={'font-bold text-blue-600'}>{ data.firstName } { data.lastName }</span></h1>

                <form onSubmit={handleSubmit(onUpdate)} className={'modal__form'}>
                    <h3 className={'text-xl'}>Change client data form</h3>
                    <div className="modal__form--group">
                        <label htmlFor={'clientPhone'} className={'modal__form--label'}>
                            Phone number
                        </label>
                        <input name={'clientPhone'} defaultValue={data.phone} ref={register({ required: true, pattern: phonePattern } )}/>
                    </div>
                    {errors.clientPhone && <span className={'text-red-600'}>This field is required</span>}
                    <div className="modal__form--group mb-12">
                        <label htmlFor={'clienPhoto'} className={'client__form--label'}>
                            Link to client foto
                        </label>
                        <input defaultValue={data.avatarUrl} name={'clienPhoto'} ref={register}/>
                    </div>
                    <input className="btn waves-effect waves-light" type="submit" value={'Save changes'} name="action" />
                </form>
            </div>
            <div className="modal-footer">
                <button type={'button'} className="waves-effect waves-light btn green" onClick={() => togglePanel(!showPanel)}>Close</button>
            </div>
        </div>
    );

    return (
        <>
            <button type={'button'} className="waves-effect waves-teal btn-floating btn-small secondary-content orange" onClick={() => togglePanel(!showPanel)}>
                <i className="material-icons">manage_accounts</i>
            </button>
            {modal}
        </>
    );
}
export default Modal