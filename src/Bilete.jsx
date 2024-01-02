import PropTypes from 'prop-types';

import delt1 from './assets/delt1.png';
import delt3 from './assets/delt2.png';
import delt2 from './assets/delt3.png';
import delt4 from './assets/delt4.png';
import delt5 from './assets/delt5.png'
import segl from './assets/segl.png'

const getBileteById = (id) => {
    switch (id) {
        case 'delt1':
            return delt1;
        case 'delt3':
            return delt3;
        case 'delt2':
            return delt2;
        case 'delt4':
            return delt4;
        case 'delt5':
            return delt5;
        default:
            return delt4;
    }
}

export const Bilete = ({id, poeng, aktiv}) => {
    const bileteUrl = getBileteById(id);
    return (
        <div className="bilete-div">
            <img className="bilete" src={bileteUrl} />
            <img className="segl" src={segl} />
            <div className={`poeng ${aktiv ? 'aktiv' : ''}`}>{poeng}</div>
        </div>
    );
};

Bilete.propTypes = {
    id: PropTypes.string,
    poeng: PropTypes.number,
    aktiv: PropTypes.bool,
}