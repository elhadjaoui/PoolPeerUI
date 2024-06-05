import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppProvider from "./context/context.jsx";
import { BrowserRouter,HashRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
		<AppProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AppProvider>
)
