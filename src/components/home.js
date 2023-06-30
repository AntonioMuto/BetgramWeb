import './home.css';
import React, { useEffect, useState, useRef } from 'react';
import FootballMatch from '../models/FootballMatch';
import Team from '../models/team';

export function Home() {
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('2023-02-12');
    const dateInputRef = useRef(null); 

    // Funzione per gestire il cambiamento della data selezionata
    const handleDateChangeAndSearch = (event) => {
        const selectedDate = dateInputRef.current.value;
      setSelectedDate(selectedDate);
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true); // Imposta isLoading su true prima del recupero dei dati
            console.log(selectedDate);
          const response = await fetch(`https://betgram.tech/api/search/match/${selectedDate}`);
          const data = await response.json();
          console.log(data);
  
          const footballMatches = await Promise.all(data.response.map(async (match) => {
            // Recupero dei dati del teamHome
            const teamHomeResponse = await fetch(`https://betgram.tech/api/search/team/${match.teamhome}`);
            const teamHomeData = await teamHomeResponse.json();
            const teamHome = teamHomeData.response.map((team) => {
              return new Team(
                team.id,
                team.name,
                team.logo,
                team.winner,
                team.lega,
                team.timestamp
              );
            });
  
            // Recupero dei dati del teamAway
            const teamAwayResponse = await fetch(`https://betgram.tech/api/search/team/${match.teamaway}`);
            const teamAwayData = await teamAwayResponse.json();
            const teamAway = teamAwayData.response.map((team) => {
              return new Team(
                team.id,
                team.name,
                team.logo,
                team.winner,
                team.lega,
                team.timestamp
              );
            });
  
            return new FootballMatch(
              match.id,
              match.lega,
              match.round,
              match.date,
              teamHome[0],
              teamAway[0],
              match.goalhome,
              match.goalaway,
              match.homeht,
              match.awayht,
              match.homeft,
              match.awayft,
              match.venue,
              match.status
            );
          }));
  
          setMatches(footballMatches);
        } catch (error) {
          console.error('Errore durante il recupero dei dati:', error);
        } finally {
          setIsLoading(false); // Imposta isLoading su false quando il recupero dei dati è completato
        }
      };
     
    if (selectedDate) {
        fetchData();
      }
    }, [selectedDate]);
  
    return (
        <div className='home-div'>
          <div className='matchDay'>
            {isLoading ? (
              <div className='loading'>
                <h1>Caricamento match...</h1>
                <div className="loading-spinner"></div>
              </div> 
            ) : (
              <table>
                <tr className='date-row'>
                  <th><input type="date" ref={dateInputRef} /></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th><button onClick={handleDateChangeAndSearch}> search </button></th>
                </tr>
                {matches.length === 0 ? (
                  <tr>
                    <th></th>
                    <th>NESSUN RISULTATO</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                ) : (
                  matches.map(match => (
                    <tr key={match.id}>
                      <th><img src={match.teamHome.logo} alt="" width={40} height={40} /></th>
                      <th>{match.teamHome.name}</th>
                      <th>{match.homeFT} - {match.awayFT}</th>
                      <th>{match.teamAway.name}</th>
                      <th><img src={match.teamAway.logo} alt="" width={40} height={40} /></th>
                    </tr>
                  ))
                )}
              </table>
            )}
          </div>
        </div>
      );
  }

export default Home;