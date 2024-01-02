import { useEffect, useState } from 'react'
import omit from 'lodash/omit'
import useKeyPress from '@custom-react-hooks/use-key-press'
import './App.css'
import { Bileterekke } from './Bileterekke.jsx';
import { useKeyDown } from './useKeyDown.js';

const deltakarar = ['delt1', 'delt2', 'delt3', 'delt4', 'delt5']

const oppgavePoengPresatt = [
    { oppgave: 1, delt1: 4, delt2: 3, delt3: 2, delt4: 1, delt5: 5 },
    { oppgave: 2, delt1: 5, delt2: 3, delt3: 1, delt4: 4, delt5: 2 },
    { oppgave: 3, delt1: 1, delt2: 5, delt3: 3, delt4: 4, delt5: 2 },
]

const stegListe = [
    { type: 'presentasjon' },
    { type: 'oppgave', oppgave: 1 },
    { type: 'oppgave', oppgave: 2 },
    { type: 'sum', oppgaver: [1, 2] },
    { type: 'oppgave', oppgave: 3 },
    { type: 'sum', oppgaver: [1, 2, 3] },
    { type: 'oppgave', oppgave: 4, live: true },
    { type: 'sum', oppgaver: [1, 2, 3, 4] },
]

const sumPoengResultat = (op1, op2) => {
    return Object.keys(op1).reduce((acc, d) => {
        return {
            ...acc,
            [d]: op1[d] + (Number.isFinite(op2[d]) ? op2[d] : 0),
        }
    }, {})
}

const sumOppgaver = (oppgavePoeng, oppgaverTilSum) => {
    return oppgaverTilSum.reduce((acc, oppgavenr) => {
        const poengDenne = omit(oppgavePoeng.find(op => op.oppgave === oppgavenr), 'oppgave');
        const sum = sumPoengResultat(poengDenne, acc)
        return sum
    }, {})
}

const getPoengForSteg = (steg, oppgavePoeng) => {

    switch (steg.type) {
        case 'presentasjon':
            return deltakarar.reduce((acc, d) => {
                return {
                    ...acc,
                    [d]: 0,
                }
            }, { type: steg.type })
        case 'oppgave':
            return deltakarar.reduce((acc, d) => {
                const poengAktuellOppgave = oppgavePoeng.find(op => op.oppgave === steg.oppgave)
                const deltakerPoeng = poengAktuellOppgave ? poengAktuellOppgave[d] : 0
                return {
                    ...acc,
                    [d]: deltakerPoeng,
                }
            }, { type: steg.type, oppgave: steg.oppgave })
        case 'sum':
            return {
                type: steg.type,
                oppgaver: steg.oppgaver,
                ...sumOppgaver(oppgavePoeng, steg.oppgaver)
            }
    }
}

const calcInitialOppgavePoeng = (oppgavePoengInitial, stegListeInitial, dListe) => {
    return stegListeInitial
        .filter(steg => steg.type === 'oppgave')
        .map(steg => {
            const presattPoeng = oppgavePoengInitial.find(op => op.oppgave === steg.oppgave)
            return presattPoeng ? presattPoeng : dListe.reduce((acc, d) => ({
                ...acc,
                [d]: 0
            }), { oppgave: steg.oppgave })
        })
}

function App() {
    const [stegnr, setStegnr] = useState(0)

    // TODO: useReducer for oppgavePoeng?
    const [oppgavePoeng, setOppgavePoeng] = useState(calcInitialOppgavePoeng(oppgavePoengPresatt, stegListe, deltakarar))
    const [activeDeltakar, setActiveDeltakar] = useState(undefined);
    const isPressedAdd = useKeyPress('+')
    const isPressedSubtract = useKeyPress('-')
    const isPressed1 = useKeyPress('1')
    const isPressed2 = useKeyPress('2')
    const isPressed3 = useKeyPress('3')
    const isPressed4 = useKeyPress('4')
    const isPressed5 = useKeyPress('5')
    const isPressedEnter = useKeyPress('Enter')

    // useKeyDown(['+', '1'])
    useKeyDown('n', () => nesteSteg())
    useKeyDown('p', () => forrigeSteg())

    const steg = stegListe[stegnr]

    const forrigeSteg = () => {
        if (stegnr > 0) {
            setStegnr(stegnr - 1)
        }
    }
    const nesteSteg = () => {
        if (stegListe[stegnr + 1] !== undefined)
            setStegnr(stegnr + 1);
    }

    const addPoeng = (deltakarId) => {
        adjustPoeng(deltakarId, 1);
    }
    const removePoeng = (deltakarId) => {
        adjustPoeng(deltakarId, -1);
    }

    const adjustPoeng = (deltakarId, endring) => {
        if (steg.live === true && Number.isFinite(steg.oppgave)) {
            setOppgavePoeng(prev => {
                return prev.map(op => {
                    if (op.oppgave === steg.oppgave) {
                        return {
                            ...op,
                            [deltakarId]: op[deltakarId] + endring,
                        }
                    }
                    return op;

                });
            })
        }
    }


    useEffect(() => {
        if (!steg?.live) return;
        const handlePoeng = id => {
            setActiveDeltakar(id)
            if (isPressedAdd) addPoeng(id)
            else if (isPressedSubtract) removePoeng(id)
        }
        if (isPressed1) {
            handlePoeng('delt1')
            return;
        } else if (isPressed2) {
            handlePoeng('delt2')
        } else if (isPressed3) {
            handlePoeng('delt3')
        } else if (isPressed4) {
            handlePoeng('delt4')
        } else if (isPressed5) {
            handlePoeng('delt5')
        } else {
            setActiveDeltakar(undefined)
        }
    }, [steg.live, isPressedEnter, isPressed1, isPressed2, isPressed3, isPressed4, isPressed5, isPressedAdd, isPressedSubtract]);

    return (
        <>
            <h1 className="tittel">Kongen befaler</h1>
            <div className="header">

            </div>
            <Bileterekke deltakarar={deltakarar} stegData={steg} poeng={getPoengForSteg(steg, oppgavePoeng)}
                         activeDeltakar={activeDeltakar}/>
            <div className="stegPresentasjon">
                <div className="neste" onClick={forrigeSteg}>&lt;</div>
                <div>{steg.type.toLocaleUpperCase()}</div>
                <div>{steg.oppgave || steg.oppgaver?.join(' – ')}</div>
                <div className="neste" onClick={nesteSteg}>&gt;</div>
            </div>
            <div className="footer">
                Image by <a
                href="https://pixabay.com/users/nachrichten_muc-25398/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=660078">Stephan</a> from <a
                href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=660078">Pixabay</a>
            </div>
        </>
    )
}

export default App
