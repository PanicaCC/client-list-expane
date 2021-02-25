import React from "react";
import { useForm } from "react-hook-form";
import './modal-client-setting.css'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

class Modal extends React.Component<{ item: any, /*deleteClientHandler: any*/ }, { [key: string]: any}> {
    constructor(props: any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            toggle: false
        }
    }

    toggle(event: any) {
        event.preventDefault()
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    render() {
        const data = this.props.item
        const modal = [];
        const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        const { register, handleSubmit, errors } = useForm();

        const onUpdate = (data: any) => {
            const variables = {
                firstName: data.clientFirstName,
                lastName: data.clientLastName,
                phone: data.clientPhone,
                avatarUrl: data.clienPhoto
            }
            console.log('variables', variables)
            return variables
        }

        modal.push(
            <div key={data.id} className="modal client__modal" style={this.state.toggle ? display : hide}>
                <div className="modal-content">
                    <h2>Info about client</h2>
                    <p>Client ID: { data.id }</p>
                    <p>{ data.firstName } { data.lastName }</p>

                    <form onSubmit={handleSubmit(onUpdate)} className={'client__form'}>
                        <div className="client__form--group">
                            <label htmlFor={'clientPhone'} className={'client__form--label'}>
                                Phone number
                            </label>
                            <input name={'clientPhone'} ref={register({ required: true, pattern: phonePattern } )}/>
                        </div>
                        {errors.clientPhone && <span className={'text-red-600'}>This field is required</span>}

                        <div className="client__form--group mb-12">
                            <label htmlFor={'clienPhoto'} className={'client__form--label'}>
                                Link to client foto
                            </label>
                            <input name={'clienPhoto'} ref={register}/>
                        </div>
                        <input className="btn waves-effect waves-light" type="submit" value={'Add customer'} name="action" />
                    </form>
                </div>
                <div className="modal-footer">
                    {/* todo emty action type in grapql - leave for future */}
                    {/*<button type={"button"} className="waves-effect waves-light btn red client__modal--delete" onClick={ () => this.props.deleteClientHandler(data.id)}>*/}
                    {/*    Delete client*/}
                    {/*</button>*/}
                    <a className="waves-effect waves-light btn green " onClick={this.toggle}>Close</a>
                </div>
            </div>
        );

        return (
            <>
                <a className="waves-effect waves-teal btn-floating btn-small secondary-content orange" onClick={this.toggle}>
                    <i className="material-icons">manage_accounts</i>
                </a>
                {modal}
            </>
        );
    }
}

export default Modal