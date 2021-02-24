import React from "react";
import {GraphQLClient, gql } from 'graphql-request'
import './form-new-client.css'

const endpoint = "https://test-task.expane.pro/api/graphql";
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const mutation =gql`
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
    const firstName = document.getElementById('clientFirstName')
    const lastName = document.getElementById('clientLastName')
    const phone = document.getElementById('clientPhone')
    const avatar = document.getElementById('clientPhoto')

    function newClientHandler(event: any){
        event.preventDefault();

        const variables = {
            firstName: (firstName as HTMLInputElement).value,
            lastName: (lastName as HTMLInputElement).value,
            phone: (phone as HTMLInputElement).value,
            avatarUrl: (avatar as HTMLInputElement).value,
        }

        const data = graphQLClient.request(mutation, variables)
        console.log(data)
        console.log("Success")
    }

    return (
        <>
            <form className={'client__form'}>
                <div className="client__form--group">
                    <label htmlFor={'clientFirstName'} className={'client__form--label'}>
                        First Name
                    </label>
                    <input id={'clientFirstName'} type="text"/>
                </div>
                <div className="client__form--group">
                    <label htmlFor={'clientLastName'} className={'client__form--label'}>
                        Last Name
                    </label>
                    <input id={'clientLastName'} type="text"/>
                </div>
                <div className="client__form--group">
                    <label htmlFor={'clientPhone'} className={'client__form--label'}>
                        Phone number
                    </label>
                    <input id={'clientPhone'} type="text"/>
                </div>
                <div className="client__form--group">
                    <label htmlFor={'clienPhoto'} className={'client__form--label'}>
                        Upload photo
                    </label>
                    <input id={'clienPhoto'} type="text"/>
                </div>
                <button onClick={(event => newClientHandler(event))} className="btn waves-effect waves-light" type="button" name="action">Add customer</button>
            </form>
        </>
    )
}
export default AddClientForm