import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useSearch } from "../../hooks/UseSearch"
import slugify from "slugify"

import './styles.scss'
import { ArrowLeft } from "phosphor-react"

export function Header() {
    const {setSearchOption, searchValue, setSearchValue, setSearch, searchOption} = useSearch()


    const navigate = useNavigate()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/search-result/${slugify(searchValue)}`, 
        {replace: true})
        setSearchValue('')
    }
   

    return(
        <>
        <header id="Header">
            <div className="logo-container">
                <a onClick={() => navigate('/')} href="#home">
                    <div onClick={() => setSearchOption('character')}>
                        <strong className="marvel">MARVEL</strong>
                        <strong className="studio">STUDIOS</strong>
                    </div>
                </a>
                <form action="submit" onSubmit={onSubmit}>
                    <input
                    className="input-search"
                    type="text"
                    placeholder="Pesquisar"
                    onChange={({target}) => setSearchValue(target.value)}
                    value={searchValue}
                    />
                    <button className="button-search" type="submit" onClick={() => setSearch(searchValue)}
                    disabled={searchValue.length === 0}
                    >
                        Search
                    </button>
                </form>
            </div>

        <nav>
        <ul>
            <li onClick={() => setSearchOption('character')} ><a className={searchOption === 'character' ? 'active': ''} href="#Characters" onClick={() => navigate('/')}>Characters</a></li>
            <li onClick={() => setSearchOption('comics')}><a className={searchOption === 'comics' ? 'active': ''}  href="#Comics" onClick={() => navigate('/comics')}>Comics</a></li>
            <li onClick={() => setSearchOption('series')}><a className={searchOption === 'series' ? 'active': ''}href="#Stories" onClick={() => navigate('/series')}>Series</a></li>
        </ul>
        </nav>
        <button className="back-button" type="button" onClick={() => window.history.go(-1)}>
            <ArrowLeft size={32} />
        </button>
        </header>

        
        </>
    )

}