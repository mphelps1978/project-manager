import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';


import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies: { // This is the type policy for the cache  to make sure that the cache only stores the data that we want
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        typePolicies: { // This is the type policy for the cache  to make sure that the cache only stores the data that we want
          Query: {
            fields: {
              projects: {
                merge(existing, incoming) {
                  return incoming
                }
              },
            }
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: process.env.REACT_APP_ENV === 'dev' ? 'http://camelot.phelpsweb.lab:5000/graphql' : 'http://localhost:5000/graphql',
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project/>} />
              <Route path ='*' element={<NotFound/>}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App;
