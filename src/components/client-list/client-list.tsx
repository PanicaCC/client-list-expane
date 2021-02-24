import React from "react";
import { request, gql } from 'graphql-request'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import './client-list.css'

const queryClient = new QueryClient()
const endpoint = "https://test-task.expane.pro/api/graphql";
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

    return (
        <QueryClientProvider client={queryClient}>
            <ul className={'client__list collection'}>
            {
                (clients.isLoading) ? <p>Loading ... </p> : Object.values(clients.data).map((item: any) => {
                    return (
                        <li key={item.id} className="collection-item client__item">
                            <img src={item.avatarUrl} alt={item.lastName} className="circle" />
                            <div className="client__item--info">
                                <span className="title">{item.firstName + ' ' + item.lastName}</span>
                                <p>Phone: {item.phone}</p>
                            </div>
                            <a href="/" className="secondary-content">
                                <i className="material-icons">manage_accounts</i>
                            </a>
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
            <ClientList/>
        </QueryClientProvider>
    );
}