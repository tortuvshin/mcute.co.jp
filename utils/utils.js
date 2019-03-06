
module.exports = {
    splitAnswer(answer) {
        var result = [];
        for(let i=0,len=answer.length;i<len;i+=4){
            result.push(answer.slice(i,i+4));
        }
        return result;
    }
}