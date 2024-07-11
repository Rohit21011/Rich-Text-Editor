
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Auth0Provider
    domain="dev-icgyvvherrtitv2m.us.auth0.com"
    clientId="lI1JVdcaDZdXy1YzspU0VuuzhypHwFDu"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
    

)
