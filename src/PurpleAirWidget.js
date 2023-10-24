import React, { useEffect } from 'react';

const PurpleAirWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.purpleair.com/pa.widget.js?key=IOJ5DCB5BQRHIXCP&module=AQI&conversion=C0&average=10&layer=standard&container=PurpleAirWidget_18499_module_AQI_conversion_C0_average_10_layer_standard';
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
            document.body.removeChild(script);
            }
        };
        }, []);
    

  return (
    <div id='PurpleAirWidget_18499_module_AQI_conversion_C0_average_10_layer_standard'>
      <div className="loading-container">
        Loading PurpleAir Widget...<space></space>
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default PurpleAirWidget;
