import React from "react";
import { request, GraphQLClient, gql } from 'graphql-request'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Modal from "../modal-client-setting/modal-client-setting";
import './client-list.css'

const endpoint = "https://test-task.expane.pro/api/graphql";
const queryClient = new QueryClient()
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const query =gql`
    {
        getClients {
          id, 
          firstName,
          lastName,
          phone,
          avatarUrl
        }
    }`
const mutation =gql`
    mutation (
        $id: ID!
        $phone: String!,
        $avatarUrl: String!
    ){ 
        updateClient (
            id: $id,
            phone: $phone, 
            avatarUrl: $avatarUrl
        ){
            id,
            phone, 
            avatarUrl
        }
    }`

interface fetchTypes {
    isLoading: any,
    error: any,
    data: any
}

const ClientList:React.FC = () => {

    const clients : fetchTypes = useQuery('client', async () => {
        return await request(endpoint, query).then((res)=>{
            try {
                return res.getClients
            } catch (e) {
                console.log('Error', e)
            }
        })
    })

    const updateClientInfo: any = (data: fetchTypes) => {
        new M.Toast({html: 'Changes complete', inDuration: 3000, classes: 'blue'})
        setTimeout(() => {
            window.location.href = '/client-list-expane'
        }, 3500)
        return graphQLClient.request(mutation, data)
    }

    //todo for future delete client
    // const deleteClientHandler = (id : string) => {
    //     console.log(id)
    // }

    return (
        <QueryClientProvider client={queryClient}>
            <ul className={'client__list collection'}>
            {
                (clients.isLoading) ? <p>Loading ... </p> : Object.values(clients.data).map((item: any, index) => {
                    return (
                        <li key={item.id} className="collection-item client__item">
                            <img src={item.avatarUrl} alt={item.lastName} className="circle" />
                            <div className="client__item--info">
                                <span className="title">{item.firstName + ' ' + item.lastName}</span>
                                <p>Phone: {item.phone}</p>
                            </div>
                            <Modal
                                /*deleteClientHandler={ deleteClientHandler }*/
                                updateClientInfo = { updateClientInfo }
                                key={(index + item.id)}
                                item={ item }
                            />
                        </li>

                    )
                })
            }
            </ul>
        </QueryClientProvider>
    )
}

export default function Wraped(){
    return(<QueryClientProvider client={queryClient}>
            <ClientList />
        </QueryClientProvider>
    );
}