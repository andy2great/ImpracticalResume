import { useState, useRef } from 'react';
import { Grid, AppBar, Toolbar, Avatar } from "@material-ui/core";
import { ImpracticalHeaderButton } from './button/button.component';

import logo from '../../../ressources/logo.png';
import './impractical-header.style.css';


export const ImpracticalHeader = () => {
    const ballRef = useRef() as any;
    const [gameBall, setGameBall] = useState({posX: 0, posY: 0});
    const [inGame, setInGame] = useState(false);
    const [inGameTime, setInGameTime] = useState({ts: 0, time: 0});
    const [inGameHighscore, setInGameHighscore] = useState({hasStarted: false, time: 0});

    const adjustGame = () =>{
        setInGame(!inGame);

        console.log(inGameTime)
        if (inGameTime.time > inGameHighscore.time) {
            setInGameHighscore({hasStarted: true, time: inGameTime.time});
        }

        setInGameTime({
            time: 0,
            ts: 0,
        });
    }

    const setNewTransition = (e: any) => {
        setGameBall({
            posX: Math.floor((Math.random() * window.innerWidth - 200) + 100),
            posY: Math.floor((Math.random() * window.innerHeight - 200) + 100),
        });

        if (inGame && (e.timeStamp - inGameTime.ts) > 1000) {
            setInGameTime({
                time: inGameTime.time + 1,
                ts: e.timeStamp,
            })
        }
    }

    return (
        <div>
            <AppBar color="default">
                <div className="header-animation" ></div>
                <Grid item >
                    <Toolbar>
                        <div
                            style={inGame ?
                                ({
                                    position: 'absolute',
                                    transform: `translate(${gameBall.posX}px, ${gameBall.posY}px)`,
                                    transition: '1000ms'
                                }) :
                                ({})
                            }
                            onTransitionEnd={setNewTransition}
                        >
                            <Avatar
                                draggable="false" 
                                ref={ballRef}
                                alt="Remy Sharp" 
                                src={logo} 
                                className={inGame ? 'game-logo' : 'logo'}
                                onClick={adjustGame}
                            />
                        </div>
                        <ImpracticalHeaderButton name='Resume'></ImpracticalHeaderButton>
                        <ImpracticalHeaderButton name='Researches'></ImpracticalHeaderButton>
                        <ImpracticalHeaderButton name='Plans'></ImpracticalHeaderButton>
                        <ImpracticalHeaderButton name='Fully impractical'></ImpracticalHeaderButton>
                        <div
                            className="game-timers"
                        >
                            {inGame ?
                                (<div
                                    className="game-time"
                                >
                                    Timer : {inGameTime.time} sec
                                </div>) :
                                (<>
                                    {inGameHighscore.hasStarted &&
                                        (<div
                                            className="game-highscore"
                                        >
                                            {`HIGHSCORE : ${inGameHighscore.time} sec`.split('').map((char, i) => {
                                                const property = {"--i" : i} as any 
                                                return (<span key={i} style={property}>{char}</span>) 
                                            })}
                                        </div>)
                                    }
                                </>)
                            }
                        </div>
                    </Toolbar>
                </Grid>
            </AppBar>
        </div>
    )
}