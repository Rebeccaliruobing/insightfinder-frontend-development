
// The anomaly score is normalized to under 100.
const calculateRGBByAnomalyScore = (val, waterline = 10) => {
  const gcolorMax = 205;
  const bcolor = 0;
  let rcolor = 0;
  let gcolor = 0;

  if (!val) return '#70d696';

  if (val <= 1) {
    if (val < 0) {
      val = 0;
    }
    if (val > 0) {
      val = 1;
    }
    rcolor = Math.floor(255 * val);
    gcolor = gcolorMax;
  } else {
    if (val > waterline) {
      val = Math.floor(val / waterline);
    }
    rcolor = 255;
    gcolor = Math.floor(gcolorMax - (((val - 1) / 9) * gcolorMax));
  }

  return `rgb(${rcolor},${gcolor},${bcolor})`;
};

export default calculateRGBByAnomalyScore;
