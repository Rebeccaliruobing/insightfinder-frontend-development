
const calculateRGBByAnomaly = (ratio, max, min, count) => {
  if (min >= 0) {
    min = 0;
  }
  const range = max - min;
  const gcolorMax = 205;
  let val = !ratio ? 0 : ratio;
  let rcolor = 0;
  let gcolor = 0;
  const bcolor = 0;
  if (val === 0) {
    rcolor = Math.floor(255 * val);
    gcolor = gcolorMax;
  } else if (val <= 1) {
    // if (val < 0) val = 0;
    val = 1;
    rcolor = Math.floor(255 * val);
    gcolor = gcolorMax;
  } else {
    // if (val > 10) val = 10;
    rcolor = 255;
    if(range==0){
      gcolor = 0;
    }else{
      gcolor = Math.floor(gcolorMax - (((val - min) / range) * gcolorMax));
    }
  }
  return `${rcolor},${gcolor},${bcolor}`;
};

export default calculateRGBByAnomaly;
