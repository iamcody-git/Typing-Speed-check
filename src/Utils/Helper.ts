export const formatPercentage = (percentage:number)=>{
    return percentage.toFixed(0) + '%'


}

export const caculatedAccuracyPercentage = (errors: number, totalTyped: number): number => {
    if (totalTyped === 0) return 100;  
    return Math.max(0, ((totalTyped - errors) / totalTyped) * 100);  
  };
  