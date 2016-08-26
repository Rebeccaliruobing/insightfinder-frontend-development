import React from 'react';
import HeatMap from './graph/HeatMap';

const HeatMapCard = ({ duration, itemSize, data, link, title }) => (
    (
        <div className="ui card">
            <div className="image" style={{ backgroudColor: '#FFF' }}>
                <a target="_blank" href={link}>
                    {data ?
                        <HeatMap duration={duration} itemSize={itemSize} data={data}/> :
                        'No model found for this period'}
                </a>
            </div>
            <div className="content">
                <div className="meta" style={{ textAlign: 'center' }}>
                    <span className="date">{title}</span>
                </div>
            </div>
        </div>
    )
);

export default HeatMapCard;
