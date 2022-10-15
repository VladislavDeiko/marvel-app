import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spiner'

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

const SingleComicPageLayout = lazy(() => import('../pages/singlePageLayout/SingleComicPageLayout'));
const SingleCharPageLayout = lazy(() => import('../pages/singlePageLayout/SingleCharPageLayout'));
const SinglePage = lazy(() => import('../pages/SinglePage'));





const App = () => {
    return (
      <Router>
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                  <Routes>
                      <Route path="/" element={<MainPage/>}/>
                      <Route path="/comics" element={<ComicsPage/>}/>
                      <Route path="/comics/:id" element={<SinglePage Component={SingleComicPageLayout} dataType={`comic`}/>}/>
                      <Route path="/chars/:id" element={<SinglePage Component={SingleCharPageLayout} dataType={`char`}/>}/>
                      <Route path="*" element={<Page404/>}/>
                  </Routes>
                </Suspense>
            </main>
        </div>
      </Router>  
    )
}

export default App;