import React from "react";
import {GraphQLClient, gql } from 'graphql-request'
import { useForm } from "react-hook-form";
import './form-new-client.css'

const endpoint: string = "https://test-task.expane.pro/api/graphql";
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const mutation: string =gql`
    mutation (
        $firstName: String!,
        $lastName: String!,
        $phone: String!,
        $avatarUrl: String!
    ){ 
        addClient(
            firstName: $firstName, 
            lastName: $lastName, 
            phone: $phone, 
            avatarUrl: $avatarUrl
        ){
            firstName, 
            lastName, 
            phone, 
            avatarUrl
        }
    }`

const AddClientForm:React.FC = () => {
    const phonePattern: RegExp = /^(([+]{0,1}\d{3})|\d?)[\s-]?[0-9]{2}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/
    const defoultAvatar: string = 'data:image/png;base64,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'
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data: any, event: any) => {
        return {
            createCustomer: createCustomer(data),
            clearField: clearField(event)
        }
    }

    const createCustomer = (data: any ) => {
        const variables = {
            firstName: data.clientFirstName,
            lastName: data.clientLastName,
            phone: data.clientPhone,
            avatarUrl: (data.clienPhoto) ? data.clienPhoto : defoultAvatar
        }
        //console.log('variables', variables)
        return graphQLClient.request(mutation, variables)
    }

    const clearField = (e: any): void => {
        new M.Toast({html: 'New client has been successfully created!', inDuration: 3000, classes: 'blue'})
        e.target.reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={'client__form'}>
                <div className="client__form--group">
                    <label htmlFor={'clientFirstName'} className={'client__form--label'}>
                        First Name
                    </label>
                    <input name={'clientFirstName'} ref={register({ required: true })}/>
                </div>
                {errors.clientFirstName && <span className={'text-red-600'}>This field is required</span>}
                <div className="client__form--group">
                    <label htmlFor={'clientLastName'} className={'client__form--label'}>
                        Last Name
                    </label>
                    <input name={'clientLastName'} ref={register({ required: true })}/>
                </div>
                {errors.clientLastName && <span className={'text-red-600'}>This field is required</span>}
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
        </>
    )
}
export default AddClientForm