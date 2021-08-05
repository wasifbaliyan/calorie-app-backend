function calculate(weight, fat, level,name){
    let bmr = 21.6 * ( weight- (fat/100 *weight)) + 370;
    let tdee = bmr*level;
    let total = tdee * 30;
    let loose2PerDay = (total - 14000) / 30;
    let loose4PerDay = (total - 28000) / 30;
    let gain2PerDay = (total + 14000) / 30;
    let gain4PerDay = (total + 28000) / 30;
    
    return {bmr, tdee,loose2PerDay,loose4PerDay,gain2PerDay,gain4PerDay,name};
}


module.exports = calculate;