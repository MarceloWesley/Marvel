import {CharactersList} from '../pages/CharactersList/index'
import { CharacterBio } from '../pages/CharacterBio';

import React, { FC } from 'react';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Comics } from '../pages/Comics';
import { ComicInfo } from '../pages/ComicsInfo';
import { Series} from '../pages/Series';
import { SeriesInfo } from '../pages/SeriesInfo';
import { CharacterSingleSerie } from '../pages/CharacterSingleSerie';
import { CharactersingleSerieInfo } from '../pages/CharacterSingleSerieInfo';
import { CharacterSingleComics } from '../pages/CharacterSingleComics';
import { CharacterSingleComicsInfo } from '../pages/CharacterSingleComicsInfo';
import { SearchResults } from '../pages/SearchResults';



export const MainRoutes: FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<CharactersList/>} />
          <Route path="/comics" element={<Comics/>} />
          <Route path="/series" element={<Series/>} />
          <Route path="search-result/:charName" element={<SearchResults/>} />
          <Route path="characterBio/:charId" element={<CharacterBio/>} />
          <Route path="comics/comicInfo/:comicId" element={<ComicInfo/>} />
          <Route path="series/seriesInfo/:seriesId" element={<SeriesInfo/>} />
          <Route path="characterBio/:charId/characterSingleSerie/:charName" element={<CharacterSingleSerie/>} />
          <Route path="characterBio/:charId/characterSingleSerie/:charName/CharactersingleSerieInfo/:serieId" element={<CharactersingleSerieInfo/>} />
          <Route path="characterBio/:charId/characterSingleComics/:charName" element={<CharacterSingleComics/>} />
          <Route path="characterBio/:charId/characterSingleComics/:charName/characterSingleComicsInfo/:comicsId" element={<CharacterSingleComicsInfo/>} />
        </Routes>
      </Router>
  );
};