import PropTypes from 'prop-types';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Bilete } from './Bilete.jsx'


export const Bileterekke = ({ deltakarar, poeng, activeDeltakar }) => {

    const [animationParent] = useAutoAnimate({ duration: 2000 })

    return (
        <div className="bilderekke" ref={animationParent}>
            {
                deltakarar
                    .sort((d1, d2) => poeng[d1] - poeng[d2])
                    .map((deltakar) => {
                        return <Bilete key={deltakar} id={deltakar} poeng={poeng[deltakar]}
                                       aktiv={activeDeltakar === deltakar}/>
                    })
            }
        </div>
    )
}

Bileterekke.propTypes = {
    deltakarar: PropTypes.array,
    poeng: PropTypes.object,
    activeDeltakar: PropTypes.string,
}