import React from 'react';
import './Global.scss'
import { CharactersProvider} from './hooks/Usecharacters'
import { ComicsProvider } from './hooks/UseComics';
import { SeriesProvider } from './hooks/UseSeries';
import { MainRoutes } from './routes/routes';
import {SearchContextProvider} from './hooks/UseSearch'

 export function App() {
 return(
   <CharactersProvider>
     <ComicsProvider>
       <SeriesProvider>
         <SearchContextProvider>
          <MainRoutes/>
         </SearchContextProvider>
       </SeriesProvider>
     </ComicsProvider>
   </CharactersProvider>
 )
}


